import assert from 'assert'
import mqtt from 'mqtt'
import { startServer, startClient, closeClients, waitUntil, withTimeout } from './tools/helper.mjs'


//本檔固定port: 8210(nodejs用), 8220(web用, ws), 不與其他測試檔重複
const PORT = 8210
const PORT_WEB = PORT + 10


//spec: 本套件為以MQTT溝通前後端並映射函數之RPC套件(CLAUDE.md), 使用者端取得伺服器端函數之映射並可呼叫
describe('api-roundtrip: 連線與函數映射之往返', function() {

    let srv = null
    let slog = null

    before(async function() {
        let r = await startServer(PORT, {
            //filterFuncs: 依token過濾可用函數, 對應opt.filterFuncs之jsdoc
            filterFuncs: function(token, funcs) {
                return Promise.resolve(funcs.filter(function(v) {
                    return v.indexOf('Hide') < 0
                }))
            },
        })
        srv = r.srv
        slog = r.log
    })

    after(async function() {
        await closeClients()
        await srv.close()
    })

    it('new WComorMqttServer回傳之Promise resolve為{ port, portWeb, close }', function() {
        //spec: jsdoc @returns, 兩個port皆開始監聽後resolve為伺服器控制物件
        assert.strictEqual(srv.port, PORT)
        assert.strictEqual(srv.portWeb, PORT_WEB)
        assert.strictEqual(typeof srv.close, 'function')
    })

    it('使用者端取得映射函數(含巢狀名稱group.mul), 且filterFuncs過濾之addHide不被映射', async function() {
        //spec: 使用者端resolve為映射伺服器端可用函數之物件; opt.filterFuncs過濾可用funcs
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-a')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        assert.deepStrictEqual(Object.keys(wo).sort(), ['add', 'echo', 'group'])
        assert.strictEqual(typeof wo.group.mul, 'function')
        assert.strictEqual(wo.addHide, undefined)
        assert.strictEqual(c.log.count('open'), 1)
    })

    it('呼叫映射函數取得伺服器端回傳值, 含巢狀名稱', async function() {
        //spec: 各函數輸入為單一物件, 回傳為Promise, 以resolve回傳結果
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-a')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        assert.strictEqual(await withTimeout(wo.add({ p1: 2, p2: 3 }), 10000, 'add'), 5)
        assert.strictEqual(await withTimeout(wo.group.mul({ p1: 4, p2: 5 }), 10000, 'group.mul'), 20)
        assert.deepStrictEqual(await withTimeout(wo.echo({ a: [1, 2], b: '中文' }), 10000, 'echo'), { a: [1, 2], b: '中文' })
    })

    it('同時多筆呼叫各自取得對應之回傳值, 不互相串線', async function() {
        //spec: 每次呼叫以獨立_id對應其回傳
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-a')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        let ps = []
        for (let i = 0; i < 30; i++) {
            ps.push(wo.add({ p1: i, p2: 1000 }))
        }
        let rs = await withTimeout(Promise.all(ps), 20000, '30 parallel calls')
        assert.deepStrictEqual(rs, Array.from({ length: 30 }, function(_, i) {
            return i + 1000
        }))
    })

    it('伺服器端authenticate收到使用者端之token', async function() {
        //spec: opt.authenticate函數會傳入使用者端連線之token參數
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-check')
        await withTimeout(c.pm, 15000, 'client funcs')
        assert.ok(slog.datas('token').includes('tok-check'))
    })

    it('經web port(WebSocket)連線同樣可取得映射並呼叫, 驗證aedes-server-factory與aedes 1.x相容', async function() {
        //spec: opt.portWeb提供給web服務之port, 經由websocket提供給瀏覽器端通訊
        let c = startClient(`ws://localhost:${PORT_WEB}`, 'tok-ws')
        let wo = await withTimeout(c.pm, 15000, 'ws client funcs')
        assert.strictEqual(await withTimeout(wo.add({ p1: 7, p2: 8 }), 10000, 'add via ws'), 15)
    })

    it('以不存在之函數名稱呼叫, 伺服器回傳{ err: "can not find: ..." }', async function() {
        //spec: 伺服器端無該函數時回傳err; 以原始MQTT連線驗證(映射物件無法呼叫不存在之函數)
        let c = await mqtt.connectAsync(`mqtt://localhost:${PORT}`, { clientId: 'raw-rpc-1', username: 'tok-raw', reconnectPeriod: 0 })
        c.on('error', function() {})
        let topic = 'topic|raw-rpc-1'
        await c.subscribeAsync(topic, { qos: 1 })
        let pm = new Promise(function(resolve) {
            c.on('message', function(t, m) {
                let d = JSON.parse(m.toString('utf8'))

                //訂閱同一topic亦會收到自己發佈之請求, 只取含output之回覆
                if (d.output !== undefined) {
                    resolve(d)
                }

            })
        })
        await c.publishAsync(topic, JSON.stringify({ token: 'tok-raw', _id: 'id-1', func: 'nope', input: null }), { qos: 1 })
        let res = await withTimeout(pm, 10000, 'rpc reply')
        assert.strictEqual(res._id, 'id-1')
        assert.deepStrictEqual(res.output, { err: 'can not find: nope' })
        await c.endAsync()
    })

    it('使用者端斷線後onClientChange回報使用者端數量減少(clientDisconnect事件)', async function() {
        //spec: opt.onClientChange(clients, opt)於使用者端數量變動時觸發; 連線時+1, 斷線時-1
        let before = slog.datas('clients').slice(-1)[0] || 0
        let c = await mqtt.connectAsync(`mqtt://localhost:${PORT}`, { clientId: 'raw-count-1', username: 'tok-raw', reconnectPeriod: 0 })
        c.on('error', function() {})
        await waitUntil(function() {
            return slog.datas('clients').slice(-1)[0] === before + 1
        }, 'clients +1 after connect')
        assert.strictEqual(slog.datas('clients').slice(-1)[0], before + 1)
        await c.endAsync()
        await waitUntil(function() {
            return slog.datas('clients').slice(-1)[0] === before
        }, 'clients -1 after disconnect')
        assert.strictEqual(slog.datas('clients').slice(-1)[0], before)
    })

})
