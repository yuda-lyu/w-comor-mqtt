import mqtt from 'mqtt'
import get from 'lodash-es/get.js'
import set from 'lodash-es/set.js'
import each from 'lodash-es/each.js'
import keys from 'lodash-es/keys.js'
import genPm from 'wsemi/src/genPm.mjs'
import genID from 'wsemi/src/genID.mjs'
import evem from 'wsemi/src/evem.mjs'
import j2o from 'wsemi/src/j2o.mjs'
import isfun from 'wsemi/src/isfun.mjs'
import arrHas from 'wsemi/src/arrHas.mjs'


/**
 * 建立MQTT使用者(Node.js與Browser)端物件
 *
 * @param {Object} opt 輸入設定參數物件
 * @param {String} [opt.url='mqtt://localhost:8080'] 輸入MQTT伺服器網址，預設為'mqtt://localhost:8080'，若由瀏覽器Browser連線，則需連MQTT WebSocket伺服器
 * @param {String} [opt.token='*'] 輸入使用者認證用token，預設為'*'
 * @param {Function} opt.open 輸入監聽open函數
 * @param {Function} opt.close 輸入監聽close函數
 * @param {Function} opt.error 輸入監聽error函數
 * @param {Function} opt.reconn 輸入監聽reconn函數
 * @returns {Promise} 回傳Promise，resolve為映射伺服器端可用函數之物件，各函數輸入皆為單一物件，各函數回傳皆為Promise，用resolve與reject處理回傳結果。呼叫之reject之err為Error物件，err.code可辨識原因：伺服器端函數拒絕或拋錯時為'W_COMOR_REMOTE_ERROR'(err.message為其訊息，另有err.remoteName、err.remoteCode)，使用者端斷線期間呼叫或等待回覆時斷線為'W_COMOR_DISCONNECTED'(不排隊，立即失敗)，已close為'W_COMOR_CLOSED'，輸入無法序列化為'W_COMOR_INVALID_INPUT'。此Promise另帶close函數(async)，呼叫後停止重連、使等待回覆之呼叫以'W_COMOR_CLOSED'失敗、結束全部連線，重複呼叫僅關閉一次，close後不再觸發open/close/error/reconn回調；請先保留此Promise之參考再接.then
 * @example
 *
 * import WComorMqttClient from 'w-comor-mqtt/dist/w-comor-mqtt-client.umd.js'
 *
 * //opt
 * let opt = {
 *     url: 'mqtt://localhost:8080',
 *     token: '*',
 *     open: function() {
 *         console.log('client: open')
 *     },
 *     close: function() {
 *         console.log('client: close')
 *     },
 *     error: function(err) {
 *         console.log('client: error:', err)
 *     },
 *     reconn: function() {
 *         console.log('client: reconn')
 *     },
 * }
 *
 * //WComorMqttClient, 保留Promise之參考則可呼叫client.close()關閉使用者端
 * let client = new WComorMqttClient(opt)
 * client
 *     .then(function(wo) {
 *         console.log('client: funcs: ', wo)
 *
 *         function core(ps) {
 *             wo.group.plus(ps)
 *                 .then(function(r) {
 *                     console.log('client: plus(' + JSON.stringify(ps) + ')=' + r)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: plus: catch: ', err)
 *                 })
 *             wo.group.div(ps)
 *                 .then(function(r) {
 *                     console.log('client: div(' + JSON.stringify(ps) + ')=' + r)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: div: catch: ', err)
 *                 })
 *             wo.add(ps)
 *                 .then(function(r) {
 *                     console.log(`client: add(${JSON.stringify(ps)})=${r}`)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: add: catch: ', err)
 *                 })
 *             wo.minu(ps)
 *                 .then(function(r) {
 *                     console.log(`client: minu(${JSON.stringify(ps)})=${r}`)
 *                 })
 *                 .catch(function(err) {
 *                     console.log('client: minu: catch: ', err)
 *                 })
 *         }
 *
 *         let i = 100
 *         setInterval(function() {
 *             i += 1
 *             core({
 *                 p1: i,
 *                 p2: 10,
 *             })
 *         }, 1000)
 *
 *     })
 *     .catch(function(err) {
 *         console.log('client: catch', err)
 *     })
 *
 */
function WComorMqttClient(opt) {
    let pm = genPm()
    let id = '' //全域儲存當前client id
    let wo = {} //回傳操作物件
    let isuc = 0 //已連線成功次數
    let closed = false //是否已呼叫close
    let pmClose = null //close之Promise, 重複呼叫close回傳同一個
    let timers = new Set() //斷線重連之計時器
    let clients = new Set() //尚未結束之mqtt連線
    let pendings = new Map() //已送出而等待回覆之呼叫, key為呼叫_id, value為{ idc, reject }


    //ev
    let ev = evem()


    //genErr, 產生可辨識之錯誤, code供程式判斷
    function genErr(code, message) {
        let err = new Error(message)
        err.code = code
        return err
    }


    //failPendings, 使等待回覆之呼叫失敗, 給定idc時只處理該連線之呼叫, 未給則全部
    function failPendings(idc, code, message) {
        pendings.forEach(function(p, _id) {
            if (idc === null || p.idc === idc) {
                pendings.delete(_id)
                ev.removeAllListeners(_id)
                p.reject(genErr(code, message))
            }
        })
    }


    function NewConn() {
        let pmc = genPm()
        let woc = {}


        //idc and save id
        let idc = genID() //產生當前client id
        id = idc //複寫至全域client id


        //default
        if (!opt.url) {
            opt.url = 'mqtt://localhost:8080'
        }
        if (!opt.token) {
            opt.token = '*'
        }


        //topicUQid, 代表使用者唯一身份
        let topicUQid = 'topic|' + genID()


        //create
        let client = null
        try {
            client = mqtt.connect(opt.url, {
                username: opt.token, //用username傳使用者token供伺服器驗證
                //password: topicUQid, //用password傳輸topicUQid
                // keepalive: 1,
                // clean: false,
                // reconnectPeriod: 1000
            })
        }
        catch (err) {

            //reconn
            reconn()

            //reject
            pmc.reject()

            return pmc
        }


        //clients, 記錄尚未結束之連線供close使用, 連線結束後移除
        clients.add(client)
        client.once('end', function() {
            clients.delete(client)
        })


        //subscribe
        function subscribe(topicUQid) {
            let pmm = genPm()

            if (client.connected) {
                client.subscribe(topicUQid, { qos: 2 }, function (err) {
                    if (err) {
                        pmm.reject('subscribe error: no send')
                    }
                    else {
                        pmm.resolve()
                    }
                })
            }
            else {
                pmm.reject('subscribe error: no connect')
            }

            return pmm
        }


        //connect
        client.on('connect', function () {
            // console.log('connect')

            //check, 已呼叫close則結束此連線
            if (closed) {
                client.end(true)
                return
            }

            //check
            if (id === idc) {

                if (isfun(opt.open)) {
                    opt.open()
                }

                //subscribe
                subscribe(topicUQid)
                    .then(function() {
                        // console.log('subscribe then', topicUQid)
                        return execFunction('getFuncs', null)
                    })
                    .catch(function(err) {
                        // console.log('subscribe catch', err)

                        //斷線與關閉已由close, reconn事件通知, 不重複回報
                        if (get(err, 'code') === 'W_COMOR_DISCONNECTED' || get(err, 'code') === 'W_COMOR_CLOSED') {
                            return
                        }

                        if (isfun(opt.error)) {
                            opt.error(err)
                        }
                    })

            }
            else {
                //console.log('old client')

                //強制停止
                client.end()

            }

        })


        //publish, 發佈失敗(含連線中斷)時以cb回報錯誤
        function publish(topicUQid, data, cb) {
            // console.log('publish', topicUQid)
            let optt = {
                qos: 2, // 0, 1, or 2
                retain: false //false不保留，true則將此訊息保留，除了發送給當前訂閱者之外，當有新訂閱者時，則將最後為1的訊息發給該新訂閱者
            }
            // console.log('client.connected', client.connected)
            // console.log('client.publish', topicUQid, data)
            client.publish(topicUQid, JSON.stringify(data), optt, cb)
        }


        //execFunction
        function execFunction(func, input = null) {
            let pmm = genPm()

            //check, 已close
            if (closed) {
                pmm.reject(genErr('W_COMOR_CLOSED', `client is closed, can not call: ${func}`))
                return pmm
            }

            //check, 斷線期間之呼叫不排隊等待, 立即失敗
            if (!client.connected) {
                pmm.reject(genErr('W_COMOR_DISCONNECTED', `client is disconnected, can not call: ${func}`))
                return pmm
            }

            //_id
            let _id = genID()

            //msg
            let msg = {
                token: opt.token,
                _id,
                func,
                input,
            }

            //fail, 結束此次呼叫並以err reject
            function fail(err) {
                pendings.delete(_id)
                ev.removeAllListeners(_id)
                pmm.reject(err)
            }

            //pendings, 連線中斷或close時使其失敗
            pendings.set(_id, { idc, reject: pmm.reject })

            //等待結果回傳
            ev.on(_id, function (r) {

                //delete
                pendings.delete(_id)

                //removeAllListeners
                ev.removeAllListeners(_id)

                //reject, 伺服器端函數拒絕或拋錯時以該錯誤reject
                if (r.reject) {
                    let err = genErr('W_COMOR_REMOTE_ERROR', String(get(r, 'output.err', '')))
                    if (get(r, 'output.name') !== undefined) {
                        err.remoteName = r.output.name
                    }
                    if (get(r, 'output.code') !== undefined) {
                        err.remoteCode = r.output.code
                    }
                    pmm.reject(err)
                    return
                }

                //resolve
                pmm.resolve(r.output)

            })

            //publish
            try {
                publish(topicUQid, msg, function(err) {
                    if (err && pendings.has(_id)) {
                        fail(genErr('W_COMOR_DISCONNECTED', `can not send: ${func}, ${err.message}`))
                    }
                })
            }
            catch (err) {
                //input無法序列化(如BigInt、循環參照)
                fail(genErr('W_COMOR_INVALID_INPUT', `can not send: ${func}, ${err.message}`))
            }

            return pmm
        }


        //message
        client.on('message', function (topicUQid, message) {
            // console.log('client message', topicUQid, message)

            //check, 已呼叫close則不再處理
            if (closed) {
                return
            }

            //check
            if (id === idc) {

                //cm
                let cm = message.toString('utf8')
                // console.log('cm', cm)

                //data
                let data = j2o(cm)
                // console.log('data', data)

                //get sys funcs
                if (get(data, 'output.sys') === 'sys' && get(data, 'output.funcs')) {

                    //funcs
                    let funcs = data['output']['funcs']

                    //bind funcs
                    for (let i = 0; i < funcs.length; i++) {

                        //func
                        let func = funcs[i]

                        //add func
                        let f = function(input) {
                            return execFunction(func, input)
                        }
                        set(woc, func, f)

                    }

                    //resolve
                    pmc.resolve(woc)

                }

                //get result, output可能為0, false, ''或null, 須以是否為undefined判斷
                if (get(data, '_id') && get(data, 'output') !== undefined) {

                    //_id
                    let _id = get(data, '_id')

                    //output
                    let output = get(data, 'output')

                    //reject, 伺服器端函數拒絕或拋錯
                    let reject = get(data, 'reject') === true

                    //emit
                    ev.emit(_id, { output, reject })

                }

            }
            else {
                //console.log('old client')

                //強制停止
                client.end()

            }

        })


        //reconnect
        client.on('reconnect', function () {
            //console.log('reconnect')
        })


        //close, 連線中斷後已送出之呼叫不會再有回覆, 使其失敗
        client.on('close', function() {
            failPendings(idc, 'W_COMOR_DISCONNECTED', 'connection is closed before getting the reply')
        })


        //offline
        client.on('offline', function() {
            //console.log('offline')

            //強制停止
            client.end()

            //使已送出之呼叫失敗
            failPendings(idc, 'W_COMOR_DISCONNECTED', 'connection is offline before getting the reply')

            //check, 已呼叫close則不再通知與重連
            if (closed) {
                return
            }

            if (isfun(opt.close)) {
                opt.close()
            }

            //reconn
            reconn()

        })


        //error
        client.on('error', function (err) {
            //console.log('error')

            //check, 已呼叫close後不再回報
            if (closed) {
                return
            }

            if (isfun(opt.error)) {
                opt.error(err)
            }

        })


        return pmc
    }


    //dealFuncs
    function dealFuncs(woc) {

        //check first
        if (isuc === 0) {

            //isuc
            isuc++

            //save
            wo = woc

            //resolve
            pm.resolve(wo)

        }
        else {
            //other

            //func_old, func_new
            let func_old = keys(wo)
            let func_new = keys(woc)

            //rebind wo funcs
            each(func_new, function(k) {
                wo[k] = woc[k]
            })

            //delete wo funcs
            each(func_old, function(k) {
                if (!arrHas(func_new, k)) {
                    delete wo[k]
                }
            })

        }

    }


    //core
    function core() {

        //check, 已呼叫close則不再連線
        if (closed) {
            return
        }

        //NewConn
        new NewConn()
            .then(function(woc) {
                if (!closed) {
                    dealFuncs(woc)
                }
            })
            .catch(function() { })

    }


    function reconn() {

        //check, 已呼叫close則不再重連
        if (closed) {
            return
        }

        let timer = setTimeout(function() {
            timers.delete(timer)

            //check
            if (closed) {
                return
            }

            if (isfun(opt.reconn)) {
                opt.reconn()
            }
            core()
        }, 5000)
        timers.add(timer)

    }


    //close, 關閉使用者端: 停止重連計時器, 使等待回覆之呼叫失敗, 結束全部連線, 之後不再連線與重連
    function close() {
        if (pmClose === null) {
            pmClose = (async function() {

                //closed
                closed = true

                //停止重連計時器
                timers.forEach(function(timer) {
                    clearTimeout(timer)
                })
                timers.clear()

                //使等待回覆之呼叫失敗
                failPendings(null, 'W_COMOR_CLOSED', 'client is closed before getting the reply')

                //結束全部連線(強制, 同時停止mqtt自身之重連), 待其結束
                await Promise.all(Array.from(clients).map(function(client) {
                    return new Promise(function(resolve) {
                        client.end(true, {}, function() {
                            resolve()
                        })
                    })
                }))

            })()
        }
        return pmClose
    }
    pm.close = close


    core()


    return pm
}


export default WComorMqttClient
