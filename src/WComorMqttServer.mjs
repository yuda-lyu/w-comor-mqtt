import Aedes from 'aedes'
import AedesServerFactory from 'aedes-server-factory'
import net from 'net'
import keys from 'lodash-es/keys.js'
import get from 'lodash-es/get.js'
import genPm from 'wsemi/src/genPm.mjs'
import haskey from 'wsemi/src/haskey.mjs'
import j2o from 'wsemi/src/j2o.mjs'
import isfun from 'wsemi/src/isfun.mjs'
import ispint from 'wsemi/src/ispint.mjs'
import cint from 'wsemi/src/cint.mjs'
import arrHas from 'wsemi/src/arrHas.mjs'


/**
 * 建立MQTT伺服器
 *
 * @param {Object} opt 輸入設定參數物件
 * @param {Integer} [opt.port=8080] 輸入MQTT提供給nodejs服務的port，預設8080
 * @param {Integer} [opt.portWeb=opt.port+10] 輸入MQTT提供給web服務的port，預設為opt.port+10，也就是8090
 * @param {Function} opt.authenticate 輸入使用者身份認證函數，供伺服器端驗證之用，函數會傳入使用者端連線之token參數，回傳為Promise，resolve(true)為驗證通過，resolve(false)為驗證不通過
 * @param {Object} [opt.funcs={}] 輸入伺服器端供使用者端呼叫之函數物件，各key為函數名稱，對應value為函數本體。各函數之輸入需為單一物件，而各函數回傳皆為Promise，可通過resolve與reject回傳結果，預設{}
 * @example
 *
 * import WComorMqttServer from 'w-comor-mqtt/dist/w-comor-mqtt-server.umd.js'
 *
 * function random(min, max) {
 *     return Math.floor(Math.random() * max) + min
 * }
 *
 * let opt = {
 *     port: 8080, //for mqtt nodejs server
 *     portWeb: 8090, //for mqtt web server
 *     authenticate: function(token) {
 *         //使用token驗證使用者身份
 *         return new Promise(function(resolve, reject) {
 *             setTimeout(function() {
 *                 resolve(true)
 *             }, 1000)
 *         })
 *     },
 *     filterFuncs: function(token, funcs) {
 *         //使用token驗證使用者身份與過濾可用funcs
 *         return new Promise(function(resolve, reject) {
 *             funcs = funcs.filter(function(v) {
 *                 return v.indexOf('Hide') < 0
 *             })
 *             resolve(funcs)
 *         })
 *     },
 *     onClientChange: function(clients, opt) {
 *         console.log(`Server[port:${opt.port}][port for web:${opt.portWeb}] now clients: ${clients.length}`)
 *     },
 *     funcs: {
 *         'group.plus': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 * p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'group.div': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 / p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'add': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 + p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'addHide': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 + p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *         'minu': function({ p1, p2 }) {
 *             return new Promise(function(resolve, reject) {
 *                 setTimeout(function() {
 *                     resolve(p1 - p2)
 *                 }, random(100, 3000))
 *             })
 *         },
 *     },
 * }
 *
 * new WComorMqttServer(opt)
 *
 */
function WComorMqttServer(opt) {


    //port
    let port = get(opt, 'port')
    if (!ispint(port)) {
        port = 8080
    }
    port = cint(port)


    //portWeb
    let portWeb = get(opt, 'portWeb')
    if (!ispint(portWeb)) {
        portWeb = port + 10
    }
    portWeb = cint(portWeb)


    //funcs
    let funcs = []
    if (haskey(opt, 'funcs')) {
        funcs = keys(opt['funcs'])
    }


    //authenticate
    function authenticate(token) {
        let pm = genPm()
        if (isfun(opt.authenticate)) {
            opt.authenticate(token)
                .then(function(vd) {
                    pm.resolve(vd)
                })
        }
        else {
            pm.resolve(true)
        }
        return pm
    }


    //aedes
    let aedes = Aedes()


    //client
    let clients = []
    aedes.on('client', function(client) {
        // console.log('aedes client')

        //push
        clients.push(client)
        if (isfun(opt.onClientChange)) {
            opt.onClientChange(clients, opt)
        }

    })


    //clientDisconnected
    aedes.on('clientDisconnected', function(client) {
        // console.log('aedes clientDisconnected')

        //刪除client
        clients = clients.filter(function(c) {
            return c !== client
        })
        if (isfun(opt.onClientChange)) {
            opt.onClientChange(clients, opt)
        }

    })


    //subscribe
    aedes.on('subscribe', function (subscriptions, client) {
        // console.log('aedes subscribe', subscriptions)
    })


    //unsubscribe
    aedes.on('unsubscribe', function (subscriptions, client) {
        // console.log('aedes unsubscribe', subscriptions)
    })


    //publish, 處理全部message
    aedes.on('publish', function(packet, client) {
        // console.log('aedes publish')

        //topic
        let topic = packet.topic

        //pl
        let pl = packet.payload.toString('utf8')

        //check
        // console.log(`pl.indexOf('"output"') >= 0`, pl.indexOf('"output"') >= 0)
        if (pl.indexOf('"output"') >= 0) {
            return
        }

        //check
        // console.log(`topic.indexOf('topic|') >= 0`, topic.indexOf('topic|') >= 0)
        if (topic.indexOf('topic|') >= 0) {
            //console.log('get client publish', pl)

            //topicUQid
            let topicUQid = topic

            //data
            let data = j2o(pl)

            //execFunction
            execFunction(topicUQid, data)
                .catch((err) => {
                    console.log('execFunction catch', err)
                })

        }

    })


    //publish
    function publish(topicUQid, data) {
        // console.log('publish', topicUQid, data)
        let packet = {
            topic: topicUQid,
            payload: JSON.stringify(data),
            qos: 2, // 0, 1, or 2
            retain: false //false不保留，true則將此訊息保留，除了發送給當前訂閱者之外，當有新訂閱者時，則將最後為1的訊息發給該新訂閱者
        }
        aedes.publish(packet, function(err) {
            // console.log('aedes.publish err', topicUQid, err)
            if (err) {
                console.log('publish: error:', err)
            }
        })
    }


    //execFunction
    async function execFunction(topicUQid, data) {
        // console.log('execFunction', topicUQid, data)

        //token
        let token = get(data, 'token', '')

        //vd
        let vd = await authenticate(token)
        // console.log('authenticate', vd, token)

        //check
        if (vd) {

            //func
            let func = get(data, 'func', '')

            //input
            let input = get(data, 'input')

            //getFuncs
            if (func === 'getFuncs') {

                if (isfun(opt.filterFuncs)) {
                    funcs = await opt.filterFuncs(token, funcs)
                    // console.log('filterFuncs', funcs)
                }

                //add output
                data['output'] = { sys: 'sys', funcs }

            }
            //call
            else if (arrHas(funcs, func)) {

                if (isfun(opt['funcs'][func])) {

                    //call func in opt.funcs
                    let output = await opt['funcs'][func](input)

                    //add output
                    data['output'] = output

                }
                else {

                    //add output
                    data['output'] = { err: `${func} is not a function` }

                }

            }
            else {
                //publish no func

                //add output
                data['output'] = { err: `can not find: ${func}` }

            }

        }
        else {
            //publish no authenticate

            //add output
            data['output'] = { err: `can not authenticate token: ${token}` }

        }

        //delete input, 因input可能很大故回傳數據不包含原input
        delete data['input']

        //publish data
        publish(topicUQid, data)

    }


    //setup
    function setup() {

        //authenticate
        aedes.authenticate = async function (client, username, password, callback) {
            //console.log('authenticate', username, password.toString('utf8'))

            //token, from username
            let token = username

            //vd
            let vd = await authenticate(token)

            //callback
            callback(null, vd)

        }

    }
    // server.on('ready', setup)


    //serverNode
    let serverNode = net.createServer(aedes.handle)
    serverNode.listen(port, function () {
        setup()
        console.log(`Server running for node at: mqtt://localhost:${port}`)
    })


    //serverBrowser
    let serverBrowser = AedesServerFactory.createServer(aedes, {
        ws: true, //經由websocket提供給瀏覽器端通訊
    })
    serverBrowser.listen(portWeb, function () {
        console.log(`Server running for browser at: mqtt://localhost:${portWeb}`)
    })

}


export default WComorMqttServer
