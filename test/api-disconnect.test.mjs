import assert from 'assert'
import { mock } from 'node:test'
import { startServer, startClient, closeClients, createEventLog, makeFuncs, waitUntil, withTimeout } from './tools/helper.mjs'


//本檔固定port: 8350/8360(案例1), 8351/8361(案例2), 不與其他測試檔重複


//flush, 讓已排入之事件與微任務執行完畢(不是等待時間)
function flush() {
    return new Promise(function(resolve) {
        setImmediate(resolve)
    })
}


//spec(src/WComorMqttClient.mjs jsdoc): 使用者端斷線期間之呼叫不排隊等待, 立即以'W_COMOR_DISCONNECTED'失敗; 已送出而等待回覆時斷線, 該呼叫亦以此失敗
describe('api-disconnect: 斷線時之呼叫', function() {

    let crashes = []

    function onCrash(err) {
        crashes.push(`${err && err.name}: ${err && err.message}`)
    }

    before(function() {
        process.on('uncaughtException', onCrash)
        process.on('unhandledRejection', onCrash)
    })

    after(async function() {
        process.removeListener('uncaughtException', onCrash)
        process.removeListener('unhandledRejection', onCrash)
        await closeClients()
    })

    it('斷線期間之呼叫立即reject(不排隊), 該呼叫不被送出; 重連後恢復並可呼叫', async function() {
        const PORT = 8350
        let executed = 0
        let funcs = makeFuncs()
        funcs.add = function({ p1, p2 }) {
            executed++
            return Promise.resolve(p1 + p2)
        }
        let s1 = await startServer(PORT, { funcs })
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-disc-1')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        assert.strictEqual(await withTimeout(wo.add({ p1: 1, p2: 2 }), 10000, 'add before'), 3)
        assert.strictEqual(executed, 1)
        let oldAdd = wo.add

        //伺服器停機, 使用者端離線
        await s1.srv.close()
        await c.log.wait('close', 1)

        //spec: 斷線期間之呼叫立即失敗(同一個macrotask內即已reject, 不等待重連或逾時), 訊息可辨識
        let pmCall = wo.add({ p1: 100, p2: 200 })
        let st = await Promise.race([pmCall.then(function() {
            return 'resolved'
        }, function(err) {
            return err
        }), flush().then(function() {
            return 'pending'
        })])
        assert.ok(st instanceof Error, `應已reject, 實為${st}`)
        assert.strictEqual(st.code, 'W_COMOR_DISCONNECTED')
        assert.match(st.message, /disconnected/)

        //重啟, 使用者端重連, 映射重綁
        let s2 = await startServer(PORT, { funcs })
        await c.log.wait('open', 2)
        await waitUntil(function() {
            return wo.add !== oldAdd
        }, 'wo.add rebound after reconnect', 30000)
        assert.strictEqual(await withTimeout(wo.add({ p1: 10, p2: 20 }), 10000, 'add after'), 30)

        //spec: 斷線期間之呼叫未排隊, 重連後不會被補送(伺服器端函數共執行2次: 斷線前1次, 重連後1次)
        assert.strictEqual(executed, 2)

        await closeClients()
        await s2.srv.close()
    })

    it('等待回覆中伺服器停機: 該呼叫以W_COMOR_DISCONNECTED reject; 伺服器端函數之後才完成亦不產生未處理之錯誤', async function() {
        const PORT = 8351
        let gate = null
        let entered = createEventLog()
        let funcs = makeFuncs()
        funcs.hold = function() {
            entered.push('enter')
            return new Promise(function(resolve) {
                gate = resolve
            })
        }
        let s = await startServer(PORT, { funcs })
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-disc-2')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')

        //先掛上結果接收, 連線中斷時該呼叫即reject
        let pmCall = wo.hold({}).then(function() {
            return 'resolved'
        }, function(err) {
            return err
        })
        await entered.wait('enter', 1)

        //spec: 已送出而等待回覆時連線中斷, 該呼叫失敗
        await s.srv.close()
        let err = await withTimeout(pmCall, 10000, 'pending call')
        assert.ok(err instanceof Error, `應已reject, 實為${err}`)
        assert.strictEqual(err.code, 'W_COMOR_DISCONNECTED')

        //伺服器已關閉, 其函數之後才完成: 回覆無對象, 不得造成未捕捉例外或未處理之rejection, 亦不輸出publish錯誤
        let spyLog = mock.method(console, 'log')
        try {
            gate('late')
            await flush()
            await flush()
            let published = spyLog.mock.calls.filter(function(c) {
                return c.arguments[0] === 'publish: error:'
            })
            assert.strictEqual(published.length, 0)
        }
        finally {
            spyLog.mock.restore()
        }
        assert.deepStrictEqual(crashes, [])

        await closeClients()
    })

})
