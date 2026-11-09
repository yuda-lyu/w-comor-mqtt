import WComorMqttServer from '../../src/WComorMqttServer.mjs'
import WComorMqttClient from '../../src/WComorMqttClient.mjs'


//載入時取得真實之計時器, 供防懸置上限與輪詢使用; 測試以node:test之mock.timers模擬被測物之計時器時, 這些仍為真實計時器
const realSetTimeout = globalThis.setTimeout
const realClearTimeout = globalThis.clearTimeout


/**
 * 事件記錄器, 供測試以事件同步(等第N個事件), 不以固定延時同步
 * wait(type, n)於記錄中該type事件數>=n時resolve, 逾時(防懸置上限, 非同步手段)則reject
 */
export function createEventLog() {
    let list = []
    let waiters = []

    function count(type) {
        return list.filter(function(v) {
            return v.type === type
        }).length
    }

    function flush() {
        waiters = waiters.filter(function(w) {
            if (count(w.type) >= w.n) {
                realClearTimeout(w.timer)
                w.resolve()
                return false
            }
            return true
        })
    }

    function push(type, data) {
        list.push({ type, data })
        flush()
    }

    function wait(type, n = 1, ms = 30000) {
        return new Promise(function(resolve, reject) {
            let w = { type, n, resolve }
            w.timer = realSetTimeout(function() {
                waiters = waiters.filter(function(v) {
                    return v !== w
                })
                reject(new Error(`timeout waiting event[${type}] x${n}, got ${count(type)}`))
            }, ms)
            waiters.push(w)
            flush()
        })
    }

    function datas(type) {
        return list.filter(function(v) {
            return v.type === type
        }).map(function(v) {
            return v.data
        })
    }

    return { push, wait, count, datas, list }
}


/**
 * 等待條件成立, 條件為被測物可觀察之狀態(例如函數映射已重新綁定), 輪詢間隔僅影響偵測延遲, 不是斷言之一部分
 */
export async function waitUntil(fn, label, ms = 30000) {
    let t = Date.now()
    while (!fn()) {
        if (Date.now() - t > ms) {
            throw new Error(`timeout waiting until: ${label}`)
        }
        await new Promise(function(resolve) {
            realSetTimeout(resolve, 20)
        })
    }
}


/**
 * 防懸置上限, 逾時視為失敗
 */
export function withTimeout(pm, ms, label) {
    let timer = null
    let pmt = new Promise(function(resolve, reject) {
        timer = realSetTimeout(function() {
            reject(new Error(`timeout: ${label}`))
        }, ms)
    })
    return Promise.race([pm, pmt]).finally(function() {
        realClearTimeout(timer)
    })
}


/**
 * 測試用之伺服器端函數
 */
export function makeFuncs() {
    return {
        'add': function({ p1, p2 }) {
            return Promise.resolve(p1 + p2)
        },
        'group.mul': function({ p1, p2 }) {
            return Promise.resolve(p1 * p2)
        },
        'echo': function(input) {
            return Promise.resolve(input)
        },
        'addHide': function({ p1, p2 }) {
            return Promise.resolve(p1 + p2)
        },
    }
}


/**
 * 啟動伺服器, 回傳{ srv, log }, log記錄onClientChange之使用者端數量(type='clients')與authenticate收到之token(type='token')
 * port與portWeb(port+10)由各測試檔寫死且互不相同, 不隨機
 */
export async function startServer(port, extra = {}) {
    let log = createEventLog()

    //extra.verify(token)回傳true/false決定是否通過驗證, 預設全過
    let { verify, ...rest } = extra

    let srv = await new WComorMqttServer({
        port,
        portWeb: port + 10,
        funcs: makeFuncs(),
        authenticate: function(token) {
            log.push('token', token)
            return Promise.resolve(verify ? verify(token) : true)
        },
        onClientChange: function(clients) {
            log.push('clients', clients.length)
        },
        ...rest,
    })
    return { srv, log }
}


//已啟動之使用者端, 供closeClients統一關閉
let startedClients = []


/**
 * 啟動使用者端, 回傳{ pm, log, opt }, pm為WComorMqttClient回傳之Promise(帶close函數), log記錄open/close/error/reconn事件
 * 啟動之使用者端會被記錄, 測試檔須於after呼叫closeClients關閉, 否則其斷線重連計時器會殘留至行程結束
 */
export function startClient(url, token) {
    let log = createEventLog()
    let opt = {
        url,
        token,
        open: function() {
            log.push('open')
        },
        close: function() {
            log.push('close')
        },
        error: function(err) {
            log.push('error', err)
        },
        reconn: function() {
            log.push('reconn')
        },
    }
    let pm = new WComorMqttClient(opt)
    startedClients.push(pm)
    return { pm, log, opt }
}


/**
 * 關閉全部由startClient啟動之使用者端
 */
export async function closeClients() {
    let pms = startedClients
    startedClients = []
    await Promise.all(pms.map(function(pm) {
        return pm.close()
    }))
}
