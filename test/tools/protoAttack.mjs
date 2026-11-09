import mqtt from 'mqtt'
import { withTimeout } from './helper.mjs'


/**
 * 與Object.prototype同名之字串, 對應aedes GHSA-52qw-whmv-87c5(1.1.3修補)之探測集:
 * 以此類字串為topic或clientId, 舊版(0.x)會使broker因未捕捉例外而崩潰
 */
export const PROTO_NAMES = [
    '__proto__',
    'constructor',
    'toString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'toLocaleString',
    'propertyIsEnumerable',
    '__defineGetter__',
    '__defineSetter__',
    '__lookupGetter__',
    '__lookupSetter__',
]


//connect, 不自動重連以免殘留計時器
async function connect(url, clientId) {
    let c = await withTimeout(
        mqtt.connectAsync(url, {
            clientId,
            username: '*',
            reconnectPeriod: 0,
            connectTimeout: 5000,
        }),
        10000,
        `connect clientId[${clientId}]`
    )

    //被broker關閉時socket可能報錯, 無error監聽者會成為未捕捉例外, 此處僅吞掉使用者端自身之socket錯誤
    c.on('error', function() {})

    return c
}


//waitEvent, 等待emitter之下一個ev事件(不同於events.once, error事件不會使其reject)
function waitEvent(em, ev) {
    return new Promise(function(resolve) {
        em.once(ev, function(...args) {
            resolve(args)
        })
    })
}


/**
 * 對指定broker以name作為clientId與topic進行: 連線, 同clientId再連線(接管), 訂閱, 發佈, 取消訂閱, 未訂閱即取消訂閱
 * 回傳各步驟觀察值, 供測試依spec斷言; 本函數不斷言
 *
 * @param {String} url broker網址, 例如'mqtt://localhost:8250'
 * @param {String} name 與Object.prototype同名之字串
 * @param {String} suffix 供第三個使用者端clientId用之後綴, 避免與其他案例重複
 * @returns {Promise} resolve為觀察值物件
 */
export async function probeName(url, name, suffix) {
    let r = {}

    //c1連線, 之後c2以同clientId連線, c1應被broker關閉(MQTT-3.1.4-2)
    let c1 = await connect(url, name)
    r.c1Connected = c1.connected
    let closed1 = waitEvent(c1, 'close')
    let c2 = await connect(url, name)
    await withTimeout(closed1, 10000, `c1 close after takeover[${name}]`)
    r.c1ClosedByTakeover = true
    r.c2Connected = c2.connected

    //c2訂閱name為topic, qos1, 回傳granted qos為1表示接受(128為拒絕)
    let granted = await withTimeout(c2.subscribeAsync(name, { qos: 1 }), 10000, `subscribe[${name}]`)
    r.grantedQos = granted.map(function(v) {
        return v.qos
    })

    //c2發佈至name, 應收到自己訂閱之訊息
    let pmMsg = waitEvent(c2, 'message')
    await withTimeout(c2.publishAsync(name, `payload-${name}`, { qos: 1 }), 10000, `publish[${name}]`)
    let [topic, payload] = await withTimeout(pmMsg, 10000, `message[${name}]`)
    r.msgTopic = topic
    r.msgPayload = payload.toString('utf8')

    //取消已訂閱之name
    await withTimeout(c2.unsubscribeAsync(name), 10000, `unsubscribe[${name}]`)
    r.unsubscribed = true

    //c3從未訂閱name即取消訂閱
    let c3 = await connect(url, `probe-${suffix}`)
    await withTimeout(c3.unsubscribeAsync(name), 10000, `unsubscribe never subscribed[${name}]`)
    r.unsubscribedNeverSubscribed = true

    await Promise.all([c2.endAsync(), c3.endAsync()])
    return r
}
