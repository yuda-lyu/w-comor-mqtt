import mqtt from 'mqtt'
import get from 'lodash/get'
import each from 'lodash/each'
import keys from 'lodash/keys'
import genPm from 'wsemi/src/genPm.mjs'
import genID from 'wsemi/src/genID.mjs'
import j2o from 'wsemi/src/j2o.mjs'
import isfun from 'wsemi/src/isfun.mjs'
import arrhas from 'wsemi/src/arrhas.mjs'


/**
 * 建立MQTT使用者(Node.js與Browser)端物件
 *
 * @param {Object} opt 輸入設定參數物件
 * @param {String} [opt.url='mqtt://localhost:8080'] 輸入MQTT伺服器網址，預設為'mqtt://localhost:8080'，若由瀏覽器Browser連線，則需連MQTT Web伺服器
 * @param {String} [opt.token='*'] 輸入使用者認證用token，預設為'*'
 * @param {Function} opt.open 輸入監聽open函數
 * @param {Function} opt.close 輸入監聽close函數
 * @param {Function} opt.error 輸入監聽error函數
 * @param {Function} opt.reconn 輸入監聽reconn函數
 * @returns {Promise} 回傳Promise，resolve為映射伺服器端可用函數之物件，各函數輸入皆為單一物件，各函數回傳皆為Promise，用resolve與reject處理回傳結果
 * @example
 *
 * import MqClient from 'w-comor-mqtt/dist/mq-client.umd.js'
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
 * //MqClient
 * new MqClient(opt)
 *     .then(function(wo) {
 *         console.log('client: funcs: ', wo)
 *
 *         function core(ps) {
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
function MqClient(opt) {
    let pm = genPm()
    let id = '' //全域儲存當前client id
    let msgs = {} //訊息佇列
    let wo = {} //回傳操作物件
    let isuc = 0 //已連線成功次數


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
        let client = mqtt.connect(opt.url, {
            clientId: 'abc123456789',
            username: opt.token, //用username傳使用者token供伺服器驗證
            //password: topicUQid, //用password傳輸topicUQid
            // keepalive: 1,
            // clean: false,
            // reconnectPeriod: 1000
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
            //console.log('connect')

            //check
            if (id === idc) {

                if (isfun(opt.open)) {
                    opt.open()
                }

                //subscribe
                subscribe(topicUQid)
                    .then(function() {
                        return execFunction('getFuncs', null)
                    })
                    .catch(function(err) {
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
            let optt = {
                qos: 2, // 0, 1, or 2
                retain: false //false不保留，true則將此訊息保留，除了發送給當前訂閱者之外，當有新訂閱者時，則將最後為1的訊息發給該新訂閱者
            }
            //mqtt: client.publish(topic, message, [options], [callback])
            //http://www.steves-internet-guide.com/using-node-mqtt-client/
            if (client.connected) {
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

            //add msgs
            msgs[_id] = null

            //pub
            pub(msg)

            //等待結果回傳
            let t = setInterval(function() {
                if (msgs[_id] !== null) {
                    let output = get(msgs[_id], 'output')
                    delete msgs[_id]
                    pmm.resolve(output)
                    clearInterval(t)
                }
            }, 1000)

            return pmm
        }


        //message
        client.on('message', function (topicUQid, message) {
            //console.log('message', topicUQid, message)

            //check
            if (id === idc) {

                //data
                let data = j2o(message.toString('utf8'))

                //get sys funcs
                if (get(data, 'output.sys') === 'sys' && get(data, 'output.funcs')) {

                    //funcs
                    let funcs = data['output']['funcs']

                    //bind funcs
                    for (let i = 0; i < funcs.length; i++) {

                        //func
                        let func = funcs[i]

                        //add func
                        woc[func] = async function(input) {
                            return execFunction(func, input)
                        }

                    }

                    //resolve
                    pmc.resolve(woc)

                }

                //get result
                if (get(data, '_id') && get(data, 'output')) {
                    msgs[data._id] = data
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

            if (isfun(opt.close)) {
                opt.close()
            }

            //強制停止
            client.end()

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

            //func_old, func_new
            let func_old = keys(wo)
            let func_new = keys(woc)

            //rebind wo func
            each(func_new, function(k) {
                wo[k] = woc[k]
            })

            //delete wo func
            each(func_old, function(k) {
                if (!arrhas(func_new, k)) {
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


export default MqClient
