import assert from 'assert'
import { mock } from 'node:test'
import { startServer, startClient, closeClients, createEventLog, makeFuncs, withTimeout } from './tools/helper.mjs'


//本檔固定port: 8310/8320(案例1), 8311/8321(案例2), 8312/8322(案例3), 8313/8323(案例4), 8314/8324(案例5), 不與其他測試檔重複


//flush, 讓已排入之事件與微任務執行完畢(不是等待時間)
function flush() {
    return new Promise(function(resolve) {
        setImmediate(resolve)
    })
}


//載入時之真實計時器
const origSetTimeout = globalThis.setTimeout
const origClearTimeout = globalThis.clearTimeout


//restoreTimers, 還原計時器; node:test之mock於多次啟用與還原後, 實測globalThis.setTimeout不會回到原函數(會殘留包裝而影響同行程之後續測試),
//故除呼叫reset外, 明確指回載入時之真實計時器
function restoreTimers() {
    mock.restoreAll()
    mock.timers.reset()
    globalThis.setTimeout = origSetTimeout
    globalThis.clearTimeout = origClearTimeout
}


//withMockTimers, 於模擬計時器(只模擬setTimeout)下執行fn, 結束時必還原
async function withMockTimers(fn) {
    mock.timers.enable({ apis: ['setTimeout'] })
    try {
        return await fn(spyTimers())
    }
    finally {
        restoreTimers()
    }
}


//spyTimers, 於mock.timers啟用後記錄被測物對setTimeout與clearTimeout之呼叫
function spyTimers() {
    let setSpy = mock.method(globalThis, 'setTimeout')
    let clearSpy = mock.method(globalThis, 'clearTimeout')
    return {

        //被測物排入之斷線重連計時器(延時5000ms)之控制代碼
        reconnTimers: function() {
            return setSpy.mock.calls.filter(function(c) {
                return c.arguments[1] === 5000
            }).map(function(c) {
                return c.result
            })
        },

        //被取消之計時器控制代碼
        cleared: function() {
            return clearSpy.mock.calls.map(function(c) {
                return c.arguments[0]
            })
        },

    }
}


//spec(src/WComorMqttClient.mjs jsdoc): 回傳之Promise帶close函數, 呼叫後停止重連、使等待回覆之呼叫以'W_COMOR_CLOSED'失敗、結束全部連線,
//重複呼叫僅關閉一次, close後不再觸發open/close/error/reconn回調
describe('api-clientclose: 關閉使用者端', function() {

    afterEach(async function() {
        await closeClients()
    })

    it('close結束連線: 伺服器端登錄之使用者端歸零, 重複呼叫為同一個Promise, 之後之呼叫以W_COMOR_CLOSED reject', async function() {
        const PORT = 8310
        let s = await startServer(PORT)
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-close-1')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')
        assert.strictEqual(await withTimeout(wo.add({ p1: 1, p2: 2 }), 10000, 'add before close'), 3)
        assert.deepStrictEqual(s.log.datas('clients'), [1])

        //spec: 重複呼叫close回傳同一個Promise
        let p1 = c.pm.close()
        let p2 = c.pm.close()
        assert.strictEqual(p1, p2)
        await withTimeout(p1, 10000, 'close')

        //spec: 結束全部連線, 伺服器端登錄之使用者端歸零
        await s.log.wait('clients', 2)
        assert.deepStrictEqual(s.log.datas('clients'), [1, 0])

        //spec: close後之呼叫以W_COMOR_CLOSED reject
        await assert.rejects(withTimeout(wo.add({ p1: 1, p2: 2 }), 10000, 'add after close'), { code: 'W_COMOR_CLOSED' })

        //spec: close後不再觸發回調(使用者主動關閉不觸發close/error/reconn)
        await flush()
        assert.strictEqual(c.log.count('open'), 1)
        assert.strictEqual(c.log.count('close'), 0)
        assert.strictEqual(c.log.count('error'), 0)
        assert.strictEqual(c.log.count('reconn'), 0)

        await s.srv.close()
    })

    it('close使等待回覆之呼叫以W_COMOR_CLOSED reject', async function() {
        const PORT = 8311
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
        let c = startClient(`mqtt://localhost:${PORT}`, 'tok-close-2')
        let wo = await withTimeout(c.pm, 15000, 'client funcs')

        //呼叫送達伺服器端函數(等待回覆中), 以事件同步
        //先掛上結果接收, close時該呼叫即reject
        let pmCall = wo.hold({}).then(function() {
            return 'resolved'
        }, function(err) {
            return err
        })
        await entered.wait('enter', 1)

        //spec: close使等待回覆之呼叫失敗
        await withTimeout(c.pm.close(), 10000, 'close')
        let err = await withTimeout(pmCall, 10000, 'pending call')
        assert.ok(err instanceof Error, `應已reject, 實為${err}`)
        assert.strictEqual(err.code, 'W_COMOR_CLOSED')

        //伺服器端函數之後才完成, 不影響已關閉之使用者端
        gate('done')
        await s.srv.close()
    })

    it('close取消斷線重連計時器: 伺服器停機使用者端離線後close, 即使時間經過亦不再觸發reconn與連線', async function() {
        //以node:test之mock.timers取代setTimeout(只影響被測物之計時器; 本檔之防懸置計時器為載入時取得之真實計時器), 以tick推進虛擬時間, 不實際等待
        const PORT = 8312
        await withMockTimers(async function(spy) {

            //伺服器與使用者端皆於模擬計時器下建立(其內部計時器皆為模擬者, 才能被clearTimeout取消, 不會殘留真實計時器使行程延後結束)
            let s = await startServer(PORT)
            let c = startClient(`mqtt://localhost:${PORT}`, 'tok-close-3')
            await withTimeout(c.pm, 15000, 'client funcs')

            //伺服器停機, 使用者端離線(close回調), 此時被測物以setTimeout排入斷線重連
            await s.srv.close()
            await c.log.wait('close', 1)
            assert.strictEqual(c.log.count('reconn'), 0)
            let timers = spy.reconnTimers()
            assert.ok(timers.length >= 1, '離線後應已排入斷線重連計時器')

            //spec: close停止重連, 重連計時器被取消(釋放, 不只是失效)
            await withTimeout(c.pm.close(), 10000, 'close')
            for (let t of timers) {
                assert.ok(spy.cleared().includes(t), '重連計時器應被clearTimeout取消')
            }

            //虛擬時間經過一分鐘, 重連計時器若未取消會於tick內同步觸發reconn回調
            mock.timers.tick(60000)
            await flush()
            assert.strictEqual(c.log.count('reconn'), 0)
            assert.strictEqual(c.log.count('open'), 1)

        })
    })

    it('伺服器不存在時close同樣停止重連(連線尚未成功之使用者端)', async function() {
        const PORT = 8313
        await withMockTimers(async function(spy) {

            //伺服器不存在, 連線被拒, 被測物離線後排入斷線重連
            let c = startClient(`mqtt://localhost:${PORT}`, 'tok-close-4')
            await c.log.wait('close', 1)
            assert.strictEqual(c.log.count('open'), 0)
            assert.strictEqual(c.log.count('reconn'), 0)
            let timers = spy.reconnTimers()
            assert.ok(timers.length >= 1, '離線後應已排入斷線重連計時器')

            await withTimeout(c.pm.close(), 10000, 'close')
            for (let t of timers) {
                assert.ok(spy.cleared().includes(t), '重連計時器應被clearTimeout取消')
            }
            mock.timers.tick(60000)
            await flush()
            assert.strictEqual(c.log.count('reconn'), 0)

            //連線未成功, 映射Promise維持未決(close不使其reject, 以免未處理之rejection)
            let st = await Promise.race([c.pm.then(function() {
                return 'resolved'
            }, function() {
                return 'rejected'
            }), flush().then(function() {
                return 'pending'
            })])
            assert.strictEqual(st, 'pending')

        })
    })

    it('驗證被拒之使用者端可close, 伺服器端不登錄', async function() {
        //spec: 驗證不通過之使用者端(Promise未決)仍可經其close關閉
        const PORT = 8314
        let s = await startServer(PORT, {
            verify: function() {
                return false
            },
        })
        let c = startClient(`mqtt://localhost:${PORT}`, 'bad')
        await c.log.wait('error', 1)
        await withTimeout(c.pm.close(), 10000, 'close')
        assert.strictEqual(s.log.count('clients'), 0)
        await s.srv.close()
    })

})
