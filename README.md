# w-comor-mqtt
A websocket communicator in nodejs and browser. Mapping functions from nodejs to other end points, like a simple RPC.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-comor-mqtt.svg?style=flat)](https://npmjs.org/package/w-comor-mqtt) 
[![license](https://img.shields.io/npm/l/w-comor-mqtt.svg?style=flat)](https://npmjs.org/package/w-comor-mqtt) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-comor-mqtt/master/dist/w-comor-mqtt-server.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-comor-mqtt)
[![npm download](https://img.shields.io/npm/dt/w-comor-mqtt.svg)](https://npmjs.org/package/w-comor-mqtt) 
[![npm download](https://img.shields.io/npm/dm/w-comor-mqtt.svg)](https://npmjs.org/package/w-comor-mqtt) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-comor-mqtt.svg)](https://www.jsdelivr.com/package/npm/w-comor-mqtt)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-comor-mqtt/global.html).

## Parts
`w-comor-mqtt` includes 2 parts: 
* `w-comor-mqtt-server`: for nodejs server
* `w-comor-mqtt-client`: for nodejs and browser client

## Installation
### Using npm(ES6 module):
> **Note:** `w-comor-mqtt-server` is mainly dependent on `net`, `aedes-server-factory` and `aedes`.

> **Note:** `w-comor-mqtt-client` is mainly dependent on `mqtt`.

```alias
npm i w-comor-mqtt
```
#### Example for `w-comor-mqtt-server`:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-comor-mqtt/blob/master/srv.mjs)]
```alias
import WComorMqttServer from 'w-comor-mqtt/dist/w-comor-mqtt-server.umd.js'

function random(min, max) {
    return Math.floor(Math.random() * max) + min
}

let opt = {
    port: 8080, //for mqtt nodejs server
    portWeb: 8090, //for mqtt web server
    authenticate: function(token) { 
        //authenticate user by token
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(true)
            }, 1000)
        })
    },
    filterFuncs: function(token, funcs) {
        //resolve funcs by authenticating user
        return new Promise(function(resolve, reject) {
            funcs = funcs.filter(function(v) {
                return v.indexOf('Hide') < 0
            })
            resolve(funcs)
        })
    },
    onClientChange: function(clients, opt) {
        console.log(`Server[port:${opt.port}][port for web:${opt.portWeb}] now clients: ${clients.length}`)
    },
    funcs: {
        'group.plus': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 * p2)
                }, random(100, 3000))
            })
        },
        'group.div': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 / p2)
                }, random(100, 3000))
            })
        },
        'add': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 + p2)
                }, random(100, 3000))
            })
        },
        'addHide': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 + p2)
                }, random(100, 3000))
            })
        },
        'minu': function({ p1, p2 }) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(p1 - p2)
                }, random(100, 3000))
            })
        },
    },
}

new WComorMqttServer(opt)
```
#### Example for `w-comor-mqtt-client`:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-comor-mqtt/blob/master/scla.mjs)]
```alias
import WComorMqttClient from 'w-comor-mqtt/dist/w-comor-mqtt-client.umd.js'

//opt
let opt = {
    url: 'mqtt://localhost:8080', //for mqtt nodejs server
    token: '*',
    open: function() {
        console.log('client nodejs: open')
    },
    close: function() {
        console.log('client nodejs: close')
    },
    error: function(err) {
        console.log('client nodejs: error:', err)
    },
    reconn: function() {
        console.log('client nodejs: reconn')
    },
}

//WComorMqttClient
new WComorMqttClient(opt)
    .then(function(wo) {
        console.log('client nodejs: funcs: ', wo)
        
        function core(ps) {
            wo.group.plus(ps)
                .then(function(r) {
                    console.log('client nodejs: plus(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: plus: catch: ', err)
                })
            wo.group.div(ps)
                .then(function(r) {
                    console.log('client nodejs: div(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: div: catch: ', err)
                })
            wo.add(ps)
                .then(function(r) {
                    console.log('client nodejs: add(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: add: catch: ', err)
                })
            wo.minu(ps)
                .then(function(r) {
                    console.log('client nodejs: minu(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client nodejs: minu: catch: ', err)
                })
        }

        let i = 100
        setInterval(function() {
            i += 1
            core({
                p1: i,
                p2: 10,
            })
        }, 1000)

    })
    .catch(function(err) {
        console.log('client nodejs: catch', err)
    })
```

### In a browser(UMD module):
> **Note:** `w-comor-mqtt-client` is mainly dependent on `mqtt`.

[Optional] Add script with nomodule for IE11.
```alias
<script nomodule src="https://cdn.jsdelivr.net/npm/@babel/polyfill/dist/polyfill.min.js"></script>
```
[Necessary] Add script for mqtt.
```alias
<script src="https://cdn.jsdelivr.net/npm/mqtt@3.0.0/dist/mqtt.min.js"></script>
```
[Necessary] Add script for w-comor-mqtt-client.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-comor-mqtt@1.0.36/dist/w-comor-mqtt-client.umd.js"></script>
```
#### Example for `w-comor-mqtt-client`:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-comor-mqtt/blob/master/web.html)]
```alias
//opt
let opt = {
    url: 'mqtt://localhost:8090', //for mqtt web server
    token: '*',
    open: function() {
        console.log('client web: open')
    },
    close: function() {
        console.log('client web: close')
    },
    error: function(err) {
        console.log('client web: error:', err)
    },
    reconn: function() {
        console.log('client web: reconn')
    },
}

//WComorMqttClient
let WComorMqttClient = window['w-comor-mqtt-client']
new WComorMqttClient(opt)
    .then(function(wo) {
        console.log('client web: funcs: ', wo)
        
        function core(ps) {
            wo.group.plus(ps)
                .then(function(r) {
                    console.log('client web: plus(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client web: plus: catch: ', err)
                })
            wo.group.div(ps)
                .then(function(r) {
                    console.log('client web: div(' + JSON.stringify(ps) + ')=' + r)
                })
                .catch(function(err) {
                    console.log('client web: div: catch: ', err)
                })
            wo.add(ps)
                .then(function(r) {
                    console.log('client web: add('+JSON.stringify(ps)+')='+r)
                })
                .catch(function(err) {
                    console.log('client web: add: catch: ', err)
                })
            wo.minu(ps)
                .then(function(r) {
                    console.log('client web: minu('+JSON.stringify(ps)+')='+r)
                })
                .catch(function(err) {
                    console.log('client web: minu: catch: ', err)
                })
        }

        let i = 100
        setInterval(function() {
            i += 1
            core({
                p1: i,
                p2: 10,
            })
        }, 1000)

    })
    .catch(function(err) {
        console.log('client web: catch', err)
    })
```