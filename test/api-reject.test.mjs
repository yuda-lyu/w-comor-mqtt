import assert from 'assert'
import mqtt from 'mqtt'
import { startServer, startClient, closeClients, withTimeout } from './tools/helper.mjs'


//本檔固定port: 8330(nodejs用), 8340(web用), 不與其他測試檔重複
const PORT = 8330
const URL = `mqtt://localhost:${PORT}`


//spec(src/WComorMqttServer.mjs, src/WComorMqttClient.mjs jsdoc): 各函數回傳為Promise, 可通過resolve與reject回傳結果
//伺服器端函數reject或拋錯時, 使用者端之呼叫以該錯誤reject(err.code為'W_COMOR_REMOTE_ERROR', err.message為其訊息)
describe('api-reject: 伺服器端函數之拒絕與各種回傳值', function() {

    let srv = null
    let calls = {}
    let wo = null

    before(async function() {
        let r = await startServer(PORT, {
            funcs: {
                'rejectErr': function() {
                    let err = new RangeError('range boom')
                    err.code = 'E_RANGE'
                    return Promise.reject(err)
                },
                'rejectStr': function() {
                    return Promise.reject('string boom')
                },
                'rejectObj': function() {
                    return Promise.reject({ a: 1 })
                },
                'throwSync': function() {
                    throw new TypeError('sync boom')
                },
                'resolveErrData': function() {
                    //函數自己之資料含err鍵, 是resolve而非錯誤
                    return Promise.resolve({ err: 'data not error' })
                },
                'echo': function(input) {
                    return Promise.resolve(input)
                },
                'zero': function() {
                    return Promise.resolve(0)
                },
                'no': function() {
                    return Promise.resolve(false)
                },
                'empty': function() {
                    return Promise.resolve('')
                },
                'nul': function() {
                    return Promise.resolve(null)
                },
                'undef': function() {
                    calls.undef = (calls.undef || 0) + 1
                    return Promise.resolve(undefined)
                },
                'big': function() {
                    return Promise.resolve(10n)
                },
            },
        })
        srv = r.srv
        let c = startClient(URL, 'tok-reject')
        wo = await withTimeout(c.pm, 15000, 'client funcs')
    })

    after(async function() {
        await closeClients()
        await srv.close()
    })

    it('函數reject(Error): 使用者端呼叫以該錯誤reject, 含訊息, code, remoteName, remoteCode', async function() {
        //spec: 函數reject時, 呼叫以該錯誤reject
        await assert.rejects(withTimeout(wo.rejectErr({}), 10000, 'rejectErr'), function(err) {
            assert.ok(err instanceof Error)
            assert.strictEqual(err.message, 'range boom')
            assert.strictEqual(err.code, 'W_COMOR_REMOTE_ERROR')
            assert.strictEqual(err.remoteName, 'RangeError')
            assert.strictEqual(err.remoteCode, 'E_RANGE')
            return true
        })
    })

    it('函數reject(字串或物件)與同步拋錯: 皆以reject回傳, 不使使用者端永遠等待', async function() {
        //spec: 函數reject或拋錯時, 呼叫以該錯誤reject
        await assert.rejects(withTimeout(wo.rejectStr({}), 10000, 'rejectStr'), { code: 'W_COMOR_REMOTE_ERROR', message: 'string boom' })
        await assert.rejects(withTimeout(wo.rejectObj({}), 10000, 'rejectObj'), { code: 'W_COMOR_REMOTE_ERROR', message: '{"a":1}' })
        await assert.rejects(withTimeout(wo.throwSync({}), 10000, 'throwSync'), { code: 'W_COMOR_REMOTE_ERROR', message: 'sync boom', remoteName: 'TypeError' })
    })

    it('錯誤不含伺服器端stack', async function() {
        //spec: 傳給使用者端者僅為訊息, 名稱與code, 不含stack(不洩漏伺服器路徑)
        await assert.rejects(withTimeout(wo.rejectErr({}), 10000, 'rejectErr'), function(err) {
            assert.ok(!String(err.message).includes(' at '))
            assert.ok(!('remoteStack' in err))
            return true
        })
    })

    it('函數resolve含err鍵之資料: 仍為resolve(與函數reject可區分)', async function() {
        //spec: reject與resolve為不同路徑, 函數自己回傳之資料不被當作錯誤
        assert.deepStrictEqual(await withTimeout(wo.resolveErrData({}), 10000, 'resolveErrData'), { err: 'data not error' })
    })

    it('函數回傳0, false, 空字串, null: 呼叫皆resolve為該值(不永遠等待)', async function() {
        //spec: 各函數回傳為Promise, 以resolve回傳結果, 回傳值可為任意可JSON序列化之值
        assert.strictEqual(await withTimeout(wo.zero({}), 10000, 'zero'), 0)
        assert.strictEqual(await withTimeout(wo.no({}), 10000, 'no'), false)
        assert.strictEqual(await withTimeout(wo.empty({}), 10000, 'empty'), '')
        assert.strictEqual(await withTimeout(wo.nul({}), 10000, 'nul'), null)
    })

    it('函數回傳undefined: 呼叫resolve為null, 且伺服器端只執行一次(不形成回覆再被當請求之迴圈)', async function() {
        //spec: undefined無法經JSON傳輸, 以null回傳; 伺服器之回覆不得被當作請求再次執行
        assert.strictEqual(await withTimeout(wo.undef({}), 10000, 'undef'), null)
        assert.strictEqual(calls.undef, 1)

        //回覆必含頂層output鍵(伺服器以此辨識自己之回覆), 以原始訂閱驗證
        let c = await mqtt.connectAsync(URL, { clientId: 'raw-undef-1', username: 'tok-raw', reconnectPeriod: 0 })
        c.on('error', function() {})
        let topic = 'topic|raw-undef-1'
        await c.subscribeAsync(topic, { qos: 1 })
        let pm = new Promise(function(resolve) {
            c.on('message', function(t, m) {
                let d = JSON.parse(m.toString('utf8'))
                if (Object.hasOwn(d, 'output')) {
                    resolve(d)
                }
            })
        })
        await c.publishAsync(topic, JSON.stringify({ token: 'tok-raw', _id: 'id-u', func: 'undef', input: null }), { qos: 1 })
        let d = await withTimeout(pm, 10000, 'raw undef reply')
        assert.strictEqual(d.output, null)
        await c.endAsync()
        assert.strictEqual(calls.undef, 2, '每個請求只執行一次')
    })

    it('輸入或輸出含"output"字樣(含鍵名output): 請求不被丟棄, 正常回傳', async function() {
        //spec: 請求之輸入內容不得影響其處理; 伺服器以頂層鍵而非字串比對辨識自己之回覆
        assert.deepStrictEqual(await withTimeout(wo.echo({ output: 1 }), 10000, 'echo output key'), { output: 1 })
        assert.deepStrictEqual(await withTimeout(wo.echo({ a: 'output' }), 10000, 'echo output value'), { a: 'output' })
    })

    it('函數回傳無法序列化之值(BigInt): 呼叫以reject回傳, 不永遠等待', async function() {
        //spec: 函數之結果無法傳輸時須回報錯誤, 不得無聲
        await assert.rejects(withTimeout(wo.big({}), 10000, 'big'), function(err) {
            assert.strictEqual(err.code, 'W_COMOR_REMOTE_ERROR')
            assert.match(err.message, /can not serialize output/)
            return true
        })
    })

    it('輸入無法序列化(BigInt、循環參照): 呼叫以W_COMOR_INVALID_INPUT reject, 不送出, 其後之呼叫不受影響', async function() {
        //spec: 各函數輸入需為可傳輸之值; 無法序列化者以reject回報(README: Input of a call can not be serialized)
        let circular = {}
        circular.self = circular
        await assert.rejects(withTimeout(wo.echo({ a: 10n }), 10000, 'echo bigint'), { code: 'W_COMOR_INVALID_INPUT' })
        await assert.rejects(withTimeout(wo.echo(circular), 10000, 'echo circular'), { code: 'W_COMOR_INVALID_INPUT' })
        assert.deepStrictEqual(await withTimeout(wo.echo({ a: 1 }), 10000, 'echo after invalid'), { a: 1 })
    })

    it('非物件之請求不被處理, 不形成無窮迴圈; 其後之正常請求不受影響', async function() {
        //spec: 請求須為物件; 非物件者不處理(處理後之回覆再被處理會無窮迴圈)
        let c = await mqtt.connectAsync(URL, { clientId: 'raw-arr-1', username: 'tok-raw', reconnectPeriod: 0 })
        c.on('error', function() {})
        let topic = 'topic|raw-arr-1'
        await c.subscribeAsync(topic, { qos: 1 })
        let arrs = 0
        let pm = new Promise(function(resolve) {
            c.on('message', function(t, m) {
                let d = JSON.parse(m.toString('utf8'))
                if (Array.isArray(d)) {
                    arrs++
                }
                else if (Object.hasOwn(d, 'output') && d._id === 'id-ok') {
                    resolve(d)
                }
            })
        })
        await c.publishAsync(topic, '[]', { qos: 1 })
        await c.publishAsync(topic, JSON.stringify({ token: 'tok-raw', _id: 'id-ok', func: 'echo', input: 7 }), { qos: 1 })
        let d = await withTimeout(pm, 10000, 'raw ok reply')
        assert.strictEqual(d.output, 7)

        //同topic之訊息依序送達, 正常請求之回覆到達時, 非物件之訊息只有自己發佈之那一則
        assert.strictEqual(arrs, 1)
        await c.endAsync()
    })

})


describe('api-reject: filterFuncs拒絕時使用者端收到錯誤', function() {

    it('getFuncs時filterFuncs reject: 使用者端opt.error收到W_COMOR_REMOTE_ERROR(不靜默等待)', async function() {
        //spec: 伺服器端處理請求時之拒絕以reject回覆, 使用者端取得函數之流程亦同
        const PORT2 = 8331
        let s = await startServer(PORT2, {
            filterFuncs: function() {
                return Promise.reject(new Error('filter boom'))
            },
        })
        let c = startClient(`mqtt://localhost:${PORT2}`, 'tok-filter')
        await c.log.wait('error', 1)
        let err = c.log.datas('error')[0]
        assert.strictEqual(err.code, 'W_COMOR_REMOTE_ERROR')
        assert.strictEqual(err.message, 'filter boom')
        assert.strictEqual(c.log.count('open'), 1)
        await closeClients()
        await s.srv.close()
    })

})
