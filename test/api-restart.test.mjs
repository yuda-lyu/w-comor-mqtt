import assert from 'assert'
import { startServer, startClient, closeClients, waitUntil, withTimeout } from './tools/helper.mjs'


//本檔固定port: 案例A為8230/8240, 案例B為8231/8241, 不與其他測試檔重複
//各案例結束時以closeClients關閉使用者端(停止其重連計時器), 兩案例仍各用不同port, 互不影響
//
//同步方式: 以使用者端之open/close/reconn/error回調事件為同步點(startClient之log), 不以固定延時等待
//使用者端斷線後固定5秒才重連(src/WComorMqttClient.mjs reconn), 故各案例耗時約5至10秒

describe('api-restart: broker關閉後重啟, 使用者端自動重連並可再呼叫', function() {

    //重連成功後, 映射物件wo之函數會被重新綁定(dealFuncs), 以函數參照改變作為可觀察之完成條件
    async function waitRebind(wo, name, oldFunc) {
        await waitUntil(function() {
            return wo[name] !== oldFunc
        }, `wo.${name} rebound after reconnect`, 30000)
    }

    it('A: 關閉broker後立即重啟, 使用者端偵測斷線後自動重連, 原映射物件可再呼叫', async function() {
        const PORT = 8230

        let s1 = await startServer(PORT)
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-restart-a')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')

        //spec: 重啟前可呼叫
        assert.strictEqual(await withTimeout(wo.add({ p1: 1, p2: 2 }), 10000, 'add before'), 3)
        assert.strictEqual(c.log.count('open'), 1)
        let oldAdd = wo.add

        //關閉broker: close回傳時兩個port已釋放, 使用者端應收到close(offline)事件
        await s1.srv.close()
        await c.log.wait('close', 1)

        //重啟(同一組port), 使用者端於reconn計時後重連
        let s2 = await startServer(PORT)
        await c.log.wait('open', 2)
        await waitRebind(wo, 'add', oldAdd)

        //spec: 重連後以同一映射物件呼叫仍可取得結果
        assert.strictEqual(await withTimeout(wo.add({ p1: 10, p2: 20 }), 10000, 'add after'), 30)
        assert.ok(c.log.count('reconn') >= 1)

        //新伺服器確實是服務者: 其authenticate收到該使用者端之token
        assert.ok(s2.log.datas('token').includes('tok-restart-a'))

        await closeClients()
        await s2.srv.close()
    })

    it('B: broker停機期間使用者端重連失敗仍持續重連, 重啟後恢復並可再呼叫', async function() {
        const PORT = 8231

        let s1 = await startServer(PORT)
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-restart-b')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        assert.strictEqual(await withTimeout(wo.group.mul({ p1: 6, p2: 7 }), 10000, 'mul before'), 42)
        let oldMul = wo.group.mul

        //關閉broker, 待使用者端第1次斷線(close#1)與第1次重連嘗試(reconn#1)失敗之斷線(close#2)後才重啟
        await s1.srv.close()
        await c.log.wait('close', 1)
        await c.log.wait('reconn', 1)
        await c.log.wait('close', 2)
        assert.strictEqual(c.log.count('open'), 1, '停機期間不應有open')

        let s2 = await startServer(PORT)
        await c.log.wait('open', 2)
        await waitUntil(function() {
            return wo.group.mul !== oldMul
        }, 'wo.group.mul rebound after reconnect', 30000)

        assert.strictEqual(await withTimeout(wo.group.mul({ p1: 3, p2: 5 }), 10000, 'mul after'), 15)
        assert.ok(s2.log.datas('token').includes('tok-restart-b'))

        await closeClients()
        await s2.srv.close()
    })

})
