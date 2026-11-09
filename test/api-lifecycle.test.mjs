import assert from 'assert'
import net from 'net'
import mqtt from 'mqtt'
import WComorMqttServer from '../src/WComorMqttServer.mjs'
import { startServer, withTimeout } from './tools/helper.mjs'


//本檔固定port: 8290/8300(案例1,2), 8291/8301(案例3), 8292/8302(案例4), 不與其他測試檔重複
//本檔不使用WComorMqttClient(其無關閉介面), 只用原始mqtt連線並於案例內關閉, 故各案例可重用port


//tryConnect, 嘗試以TCP連線至本機port, resolve為{ ok, code }
function tryConnect(port) {
    return new Promise(function(resolve) {
        let s = net.connect({ port, host: '127.0.0.1' })
        s.once('connect', function() {
            s.destroy()
            resolve({ ok: true })
        })
        s.once('error', function(err) {
            resolve({ ok: false, code: err.code })
        })
    })
}


//occupy, 占用port, 回傳關閉函數
function occupy(port) {
    return new Promise(function(resolve, reject) {
        let s = net.createServer()
        s.once('error', reject)
        s.listen(port, function() {
            resolve(function() {
                return new Promise(function(_resolve) {
                    s.close(_resolve)
                })
            })
        })
    })
}


//spec: src/WComorMqttServer.mjs jsdoc @returns, close為async函數, 會關閉全部使用者端連線與兩個port, 重複呼叫僅關閉一次; 無法監聽則reject
describe('api-lifecycle: broker啟動與關閉', function() {

    it('close會中斷全部使用者端連線並釋放兩個port, 重複呼叫皆resolve', async function() {
        let { srv } = await startServer(8290)

        //啟動後兩個port皆可連線
        assert.strictEqual((await tryConnect(8290)).ok, true)
        assert.strictEqual((await tryConnect(8300)).ok, true)

        //一個使用者端經nodejs port連線, 一個經web port(ws)連線
        let c1 = await mqtt.connectAsync('mqtt://localhost:8290', { clientId: 'lc-node', reconnectPeriod: 0 })
        let c2 = await mqtt.connectAsync('ws://localhost:8300', { clientId: 'lc-web', reconnectPeriod: 0 })
        c1.on('error', function() {})
        c2.on('error', function() {})
        let closed1 = new Promise(function(resolve) {
            c1.once('close', resolve)
        })
        let closed2 = new Promise(function(resolve) {
            c2.once('close', resolve)
        })

        //重複呼叫close, 回傳之Promise皆resolve, 且只關閉一次
        let p1 = srv.close()
        let p2 = srv.close()
        assert.strictEqual(p1, p2)
        await withTimeout(Promise.all([p1, p2]), 15000, 'close')
        await withTimeout(srv.close(), 15000, 'close again')

        //使用者端連線皆被中斷
        await withTimeout(Promise.all([closed1, closed2]), 10000, 'clients closed')
        assert.strictEqual(c1.connected, false)
        assert.strictEqual(c2.connected, false)

        //兩個port皆已釋放
        assert.strictEqual((await tryConnect(8290)).code, 'ECONNREFUSED')
        assert.strictEqual((await tryConnect(8300)).code, 'ECONNREFUSED')
    })

    it('close後可於同一組port再啟動並正常服務(onClientChange自新伺服器起算)', async function() {
        let s1 = await startServer(8290)
        await s1.srv.close()

        let s2 = await startServer(8290)
        let c = await mqtt.connectAsync('mqtt://localhost:8290', { clientId: 'lc-again', reconnectPeriod: 0 })
        c.on('error', function() {})
        await s2.log.wait('clients', 1)
        assert.deepStrictEqual(s2.log.datas('clients'), [1])
        await c.endAsync()
        await s2.log.wait('clients', 2)
        assert.deepStrictEqual(s2.log.datas('clients'), [1, 0])
        await s2.srv.close()
    })

    it('nodejs port被占用: 啟動reject(EADDRINUSE), 原占用者不受影響', async function() {
        let release = await occupy(8291)
        let err = null
        try {
            await new WComorMqttServer({ port: 8291, portWeb: 8301, funcs: {} })
        }
        catch (e) {
            err = e
        }
        assert.ok(err, '應reject')
        assert.strictEqual(err.code, 'EADDRINUSE')

        //web port未被遺留占用
        assert.strictEqual((await tryConnect(8301)).code, 'ECONNREFUSED')

        //原占用者仍在
        assert.strictEqual((await tryConnect(8291)).ok, true)
        await release()
    })

    it('web port被占用: 啟動reject(EADDRINUSE), 已開啟之nodejs port被釋放不殘留', async function() {
        let release = await occupy(8302)
        let err = null
        try {
            await new WComorMqttServer({ port: 8292, portWeb: 8302, funcs: {} })
        }
        catch (e) {
            err = e
        }
        assert.ok(err, '應reject')
        assert.strictEqual(err.code, 'EADDRINUSE')

        //nodejs port已釋放, 且可由新伺服器取得
        assert.strictEqual((await tryConnect(8292)).code, 'ECONNREFUSED')
        await release()
        let s = await new WComorMqttServer({ port: 8292, portWeb: 8302, funcs: {} })
        assert.strictEqual((await tryConnect(8292)).ok, true)
        await s.close()
    })

})
