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
 * @returns {Promise} 回傳Promise，resolve為映射伺服器端可用函數之物件，各函數輸入皆為單一物件，各函數回傳皆為Promise，用resolve與reject處理回傳結果
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
 * //WComorMqttClient
 * new WComorMqttClient(opt)
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


    //ev
    let ev = evem()


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


        //pub
        function pub(data) {
            publish(topicUQid, data)
        }


        //publish
        function publish(topicUQid, data) {
            // console.log('publish', topicUQid)
            let optt = {
                qos: 2, // 0, 1, or 2
                retain: false //false不保留，true則將此訊息保留，除了發送給當前訂閱者之外，當有新訂閱者時，則將最後為1的訊息發給該新訂閱者
            }
            // console.log('client.connected', client.connected)
            if (client.connected) {
                // console.log('client.publish', topicUQid, data)
                client.publish(topicUQid, JSON.stringify(data), optt)
            }
        }


        //execFunction
        function execFunction(func, input = null) {
            let pmm = genPm()

            //_id
            let _id = genID()

            //msg
            let msg = {
                token: opt.token,
                _id: _id,
                func: func,
                input: input,
            }

            //pub
            pub(msg)

            //等待結果回傳
            ev.on(_id, function (output) {

                //resolve
                pmm.resolve(output)

                //removeAllListeners
                ev.removeAllListeners(_id)

            })

            return pmm
        }


        //message
        client.on('message', function (topicUQid, message) {
            // console.log('client message', topicUQid, message)

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

                //get result
                if (get(data, '_id') && get(data, 'output')) {

                    //_id
                    let _id = get(data, '_id')

                    //output
                    let output = get(data, 'output')

                    //emit
                    ev.emit(_id, output)

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


        //offline
        client.on('offline', function() {
            //console.log('offline')

            //強制停止
            client.end()

            if (isfun(opt.close)) {
                opt.close()
            }

            //reconn
            reconn()

        })


        //error
        client.on('error', function (err) {
            //console.log('error')

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

        //NewConn
        new NewConn()
            .then(function(woc) {
                dealFuncs(woc)
            })
            .catch(function() { })

    }


    function reconn() {
        setTimeout(function() {
            if (isfun(opt.reconn)) {
                opt.reconn()
            }
            core()
        }, 5000)
    }


    core()


    return pm
}


export default WComorMqttClient
