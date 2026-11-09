import assert from 'assert'
import mqtt from 'mqtt'
import { startServer, startClient, closeClients, withTimeout } from './tools/helper.mjs'


//本檔固定port: 8270(nodejs用), 8280(web用), 不與其他測試檔重複
const PORT = 8270
const URL = `mqtt://localhost:${PORT}`


//spec: opt.authenticate回傳resolve(true)為驗證通過, resolve(false)為驗證不通過(src/WComorMqttServer.mjs jsdoc)
describe('api-auth: 使用者身份驗證與依token過濾函數', function() {

    let srv = null
    let slog = null

    before(async function() {
        let r = await startServer(PORT, {
            verify: function(token) {
                return token !== 'bad'
            },
        })
        srv = r.srv
        slog = r.log
    })

    after(async function() {
        await closeClients()
        await srv.close()
    })

    it('驗證不通過之token: 使用者端收到"Not authorized"錯誤, 不open, 不取得映射, 伺服器不登錄該使用者端', async function() {
        //spec: resolve(false)為驗證不通過
        //mqtt 5.16行為變更: CONNACK被拒時回報error(code 5)並關閉socket, 不改寫呼叫端之options
        let c = startClient(URL, 'bad')
        await c.log.wait('error', 1)
        let err = c.log.datas('error')[0]
        assert.match(err.message, /not authorized/i)
        assert.strictEqual(err.code, 5)
        assert.strictEqual(c.log.count('open'), 0)
        assert.ok(slog.datas('token').includes('bad'))

        //映射物件未取得(Promise維持未決)
        let st = await Promise.race([c.pm.then(function() {
            return 'resolved'
        }), Promise.resolve('pending')])
        assert.strictEqual(st, 'pending')

        //伺服器端未登錄該使用者端(onClientChange未被觸發)
        assert.strictEqual(slog.count('clients'), 0)
    })

    it('驗證不通過之後, 驗證通過之token仍可正常取得映射並呼叫', async function() {
        //spec: resolve(true)為驗證通過; 單一使用者之驗證失敗不影響伺服器對其他使用者之服務
        let c = startClient(URL, 'good')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        assert.strictEqual(await withTimeout(wo.add({ p1: 1, p2: 1 }), 10000, 'add'), 2)
        assert.strictEqual(c.log.count('error'), 0)
    })

})


//spec: opt.filterFuncs(token, funcs)為「使用token驗證使用者身份與過濾可用funcs」(src/WComorMqttServer.mjs jsdoc),
//過濾結果只對該token有效, 不得影響其他token所見之函數, 亦不得影響其他token之函數呼叫
//修前紅: execFunction於getFuncs時將filterFuncs之結果指派回伺服器共用之funcs變數, 先連線之低權限token會縮減所有後續使用者所見之函數清單,
//亦使高權限token之函數呼叫被回報can not find(修前輸出記於sgud/exp/experience.md)
describe('api-auth: 依token過濾函數, 各token互不影響', function() {

    //guest只可用add, admin可用全部; 另以in-place修改傳入陣列之寫法, 驗證傳入之陣列不是伺服器共用之清單
    function filterFuncs(token, funcs) {
        if (token === 'guest') {
            funcs.length = 0
            funcs.push('add')
        }
        return Promise.resolve(funcs)
    }

    const ALL = ['add', 'addHide', 'echo', 'group']

    it('低權限token先連, 高權限token後連: 兩者所見函數各自正確, 高權限可呼叫其函數', async function() {
        const PORT2 = 8271
        let s = await startServer(PORT2, { filterFuncs })

        let g = startClient(`mqtt://localhost:${PORT2}`, 'guest')
        let wog = await withTimeout(g.pm, 15000, 'guest funcs')
        let a = startClient(`mqtt://localhost:${PORT2}`, 'admin')
        let woa = await withTimeout(a.pm, 15000, 'admin funcs')

        //spec: guest只見add; admin見全部(不被先連線之guest縮減)
        assert.deepStrictEqual(Object.keys(wog), ['add'])
        assert.deepStrictEqual(Object.keys(woa).sort(), ALL)

        //spec: 兩者皆可呼叫自己所見之函數
        assert.strictEqual(await withTimeout(woa.group.mul({ p1: 2, p2: 3 }), 10000, 'admin mul'), 6)
        assert.strictEqual(await withTimeout(woa.addHide({ p1: 2, p2: 3 }), 10000, 'admin addHide'), 5)
        assert.strictEqual(await withTimeout(wog.add({ p1: 2, p2: 3 }), 10000, 'guest add'), 5)

        await closeClients()
        await s.srv.close()
    })

    it('高權限token先連, 低權限token後連: 兩者所見函數各自正確(不互相污染)', async function() {
        const PORT2 = 8272
        let s = await startServer(PORT2, { filterFuncs })

        let a = startClient(`mqtt://localhost:${PORT2}`, 'admin')
        let woa = await withTimeout(a.pm, 15000, 'admin funcs')
        let g = startClient(`mqtt://localhost:${PORT2}`, 'guest')
        let wog = await withTimeout(g.pm, 15000, 'guest funcs')

        assert.deepStrictEqual(Object.keys(woa).sort(), ALL)
        assert.deepStrictEqual(Object.keys(wog), ['add'])

        //spec: guest連線後, 高權限token之函數呼叫仍正常
        assert.strictEqual(await withTimeout(woa.group.mul({ p1: 4, p2: 5 }), 10000, 'admin mul'), 20)

        //spec: guest之後再有admin連線, 所見仍為全部
        let a2 = startClient(`mqtt://localhost:${PORT2}`, 'admin')
        let woa2 = await withTimeout(a2.pm, 15000, 'admin2 funcs')
        assert.deepStrictEqual(Object.keys(woa2).sort(), ALL)

        await closeClients()
        await s.srv.close()
    })

    it('呼叫被該token過濾掉之函數被拒(不必先getFuncs), 過濾結果不影響其他token之呼叫', async function() {
        //spec: 預設拒絕(原則1)——該token不可用之函數, 以原始請求直接呼叫亦回can not find; 可用之token不受影響
        const PORT2 = 8273
        let s = await startServer(PORT2, { filterFuncs })

        async function rawCall(token, func) {
            let clientId = `raw-${token}-${func}`
            let c = await mqtt.connectAsync(`mqtt://localhost:${PORT2}`, { clientId, username: token, reconnectPeriod: 0 })
            c.on('error', function() {})
            let topic = `topic|${clientId}`
            await c.subscribeAsync(topic, { qos: 1 })
            let pm = new Promise(function(resolve) {
                c.on('message', function(t, m) {
                    let d = JSON.parse(m.toString('utf8'))
                    if (d.output !== undefined) {
                        resolve(d.output)
                    }
                })
            })
            await c.publishAsync(topic, JSON.stringify({ token, _id: 'id-1', func, input: { p1: 1, p2: 2 } }), { qos: 1 })
            let output = await withTimeout(pm, 10000, `raw ${token} ${func}`)
            await c.endAsync()
            return output
        }

        //guest呼叫被過濾之函數(此前無任何getFuncs)
        assert.deepStrictEqual(await rawCall('guest', 'addHide'), { err: 'can not find: addHide' })
        assert.deepStrictEqual(await rawCall('guest', 'group.mul'), { err: 'can not find: group.mul' })
        assert.strictEqual(await rawCall('guest', 'add'), 3)

        //guest經getFuncs被過濾後, admin之呼叫不受影響
        assert.strictEqual(await rawCall('admin', 'addHide'), 3)
        assert.strictEqual(await rawCall('admin', 'group.mul'), 2)

        await closeClients()
        await s.srv.close()
    })

})
