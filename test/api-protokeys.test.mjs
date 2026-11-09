import assert from 'assert'
import mqtt from 'mqtt'
import { startServer, startClient, closeClients, withTimeout } from './tools/helper.mjs'
import { PROTO_NAMES, probeName } from './tools/protoAttack.mjs'


//本檔固定port: 8250(nodejs用), 8260(web用), 不與其他測試檔重複
const PORT = 8250
const URL = `mqtt://localhost:${PORT}`


//spec: aedes GHSA-52qw-whmv-87c5(1.1.3修補)——單一封包以constructor/__proto__等為topic或clientId, 不得使broker崩潰(遠端DoS)
//修前紅: 對aedes 0.51.0執行同一探測(test/tools/protoAttack.mjs), 12個名稱皆於CONNECT即產生未捕捉例外(TypeError: this.clients[client.id].close is not a function), 記於sgud/exp/experience.md
describe('api-protokeys: 以Object.prototype同名字串為clientId或topic不使broker崩潰', function() {

    let srv = null
    let crashes = []

    function onCrash(err) {
        crashes.push(`${err && err.name}: ${err && err.message}`)
    }

    before(async function() {
        //記錄行程內之未捕捉例外與未處理之Promise拒絕, broker崩潰於同行程內即表現為此二者
        process.on('uncaughtException', onCrash)
        process.on('unhandledRejection', onCrash)
        let r = await startServer(PORT)
        srv = r.srv
    })

    after(async function() {
        process.removeListener('uncaughtException', onCrash)
        process.removeListener('unhandledRejection', onCrash)
        await closeClients()
        await srv.close()
    })

    let n = 0
    for (let name of PROTO_NAMES) {
        n++
        let idx = n

        it(`clientId與topic皆為"${name}": 連線, 同id接管, 訂閱, 發佈, 取消訂閱皆正常, broker不崩潰`, async function() {
            let r = await probeName(URL, name, `t${idx}`)

            //spec(GHSA-52qw): 以該名稱為clientId可正常連線, 且同clientId再連線時舊連線被關閉(MQTT-3.1.4-2)
            assert.strictEqual(r.c1Connected, true)
            assert.strictEqual(r.c1ClosedByTakeover, true)
            assert.strictEqual(r.c2Connected, true)

            //spec(GHSA-52qw): 以該名稱為topic可訂閱(granted qos=1, 非128拒絕), 發佈後訂閱者收到相同topic與內容
            assert.deepStrictEqual(r.grantedQos, [1])
            assert.strictEqual(r.msgTopic, name)
            assert.strictEqual(r.msgPayload, `payload-${name}`)

            //spec(GHSA-52qw): 取消訂閱已訂閱者, 以及取消從未訂閱者, 皆正常完成(取得unsuback)
            assert.strictEqual(r.unsubscribed, true)
            assert.strictEqual(r.unsubscribedNeverSubscribed, true)

            //broker未因此產生未捕捉例外
            assert.deepStrictEqual(crashes, [])
        })
    }

    it('以__proto__與constructor為函數名稱之RPC請求, 伺服器回傳can not find, 不當作函數執行', async function() {
        //spec: 函數名稱來自網路, 僅白名單(opt.funcs之own key)內者可執行; 白名單外之輸入(含與Object.prototype同名者)被拒收
        let c = await mqtt.connectAsync(URL, { clientId: 'proto-rpc-1', username: 'tok-proto', reconnectPeriod: 0 })
        c.on('error', function() {})
        let topic = 'topic|proto-rpc-1'
        await c.subscribeAsync(topic, { qos: 1 })

        let replies = {}
        let waiters = {}
        c.on('message', function(t, m) {
            let d = JSON.parse(m.toString('utf8'))
            if (d.output !== undefined && waiters[d._id]) {
                replies[d._id] = d
                waiters[d._id]()
            }
        })

        for (let func of ['__proto__', 'constructor', 'toString', 'hasOwnProperty']) {
            let _id = `id-${func}`
            let pm = new Promise(function(resolve) {
                waiters[_id] = resolve
            })
            await c.publishAsync(topic, JSON.stringify({ token: 'tok-proto', _id, func, input: null }), { qos: 1 })
            await withTimeout(pm, 10000, `reply of ${func}`)
            assert.deepStrictEqual(replies[_id].output, { err: `can not find: ${func}` })
        }

        await c.endAsync()
        assert.deepStrictEqual(crashes, [])
    })

    it('探測後broker仍存活: 一般使用者端可取得映射並呼叫函數', async function() {
        //spec: 遠端無法經由此類封包使broker崩潰; 以端到端呼叫證明broker仍服務中
        let c = startClient(URL, 'tok-alive')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        assert.strictEqual(await withTimeout(wo.add({ p1: 40, p2: 2 }), 10000, 'add'), 42)
        assert.deepStrictEqual(crashes, [])
    })

})
