# w-comor-mqtt
A websocket communicator in nodejs and browser. Mapping functions from nodejs to other end points, like a simple RPC.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-comor-mqtt.svg?style=flat)](https://npmjs.org/package/w-comor-mqtt) 
[![license](https://img.shields.io/npm/l/w-comor-mqtt.svg?style=flat)](https://npmjs.org/package/w-comor-mqtt) 
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

Add script for mqtt.
```alias
<script src="https://cdn.jsdelivr.net/npm/mqtt@5.16.1/dist/mqtt.min.js"></script>
```

Add script for w-comor-mqtt-client.
```alias
<script src="https://yuda-lyu.github.io/w-comor-mqtt/dist/w-comor-mqtt-client.umd.js"></script>
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

## Upgrade notes: aedes 1.x and mqtt 5.16

The broker is now built on `aedes` 1.2.x (it fixes the remote DoS and resource exhaustion advisories GHSA-xxqp-5qx8-gj5q, GHSA-52qw-whmv-87c5, GHSA-5jvp-3p2v-5qgf and GHSA-p8r9-qf8w-p73r, which 0.x never received) and the client on `mqtt` 5.16.x.

* **Node.js**: `aedes` 1.x requires Node.js >= 20. The UMD files in `dist` load the ESM-only `aedes` with `require` (verified on Node.js 24), which relies on `require(esm)` support (enabled by default since Node.js 20.19 and 22.12) when using `w-comor-mqtt/dist/w-comor-mqtt-server.umd.js`.
* **`new WComorMqttServer(opt)` now returns a Promise** (aedes 1.x must be started asynchronously). It resolves to `{ port, portWeb, close }` once both ports are listening, and rejects if a port can not be listened (for example `EADDRINUSE`). Code that ignores the return value, like the example above, keeps working. To wait until the server is ready, close it, or handle a listening error:

```alias
let srv = await new WComorMqttServer(opt)
//...
await srv.close() //disconnect all clients and release both ports, safe to call more than once
```

* **`close()` is new**: before, there was no way to stop the server. After `close()` the same ports can be used by a new `WComorMqttServer`; connected clients reconnect by themselves.
* **`onClientChange` now also fires when a client disconnects**: the previous version listened to a misspelled event name (`clientDisconnected`, the real one is `clientDisconnect`), so it was only called when a client connected and `clients` never shrank.
* **Slow clients are dropped**: `aedes` 1.x sets `drainTimeout` to 60000 ms by default (0 before), so a client whose socket stays blocked for 60 seconds is disconnected, then reconnects automatically.
* **`engines`**: `package.json` declares `"node": "^20.19.0 || >=22.12.0"` (the Node.js versions where `require(esm)` is enabled by default, needed by the UMD files to load the ESM-only `aedes`).
* **`mqtt` 5.16**: `w-comor-mqtt-client` never read the CONNACK back into its options, so the `mqtt` 5.16 changes (CONNACK no longer rewrites the caller's options, a refused CONNACK always closes the socket) need no change in your code. A client whose token is refused by `authenticate` receives `opt.error` with `Connection refused: Not authorized` (code 5) and stays unresolved. In a browser, load `mqtt` 5.x (the example above uses 5.16.1) instead of 3.x.

### Behavior changes of `w-comor-mqtt-server` and `w-comor-mqtt-client` calls

There is no compatibility layer; adjust the code that calls the mapped functions as listed.

| Situation | Before | Now | What to change |
|---|---|---|---|
| A server function (`opt.funcs`) rejects or throws | The server only logged it; the client call never settled | The client call **rejects** with an `Error`: `err.code === 'W_COMOR_REMOTE_ERROR'`, `err.message` is the message of the server error (a string or an object rejection is converted to text), plus `err.remoteName` (error class name) and `err.remoteCode` (the `code` of the server error) when present. The server stack is never sent | Add `.catch` to calls. Do not put secrets in error messages: the message is sent to the client |
| A server function resolves `{ err: '...' }` | Resolved | Still resolves with the same data (only a rejection is an error) | Nothing |
| Call to a function that is unknown or not allowed for the token | Resolved `{ err: 'can not find: <name>' }` | Same | Nothing |
| A client calls while it is disconnected | The request was dropped and the call never settled | The call **rejects at once** (not queued, not sent after reconnecting) with `err.code === 'W_COMOR_DISCONNECTED'` | Retry in your code after the `open` callback if you need to |
| The connection drops while a call is waiting for its reply | Never settled | Rejects with `err.code === 'W_COMOR_DISCONNECTED'` | Same as above |
| Server function returns `0`, `false`, `''`, `null` or `undefined` | The client call never settled | Resolves with that value (`undefined` becomes `null`) | Nothing |
| Request input contains the text `"output"` | The request was silently ignored | Handled normally | Nothing |
| Server function result can not be serialized (for example `BigInt`) | The client call never settled | Rejects with `W_COMOR_REMOTE_ERROR` (`can not serialize output: ...`) | Return JSON-compatible values |
| Input of a call can not be serialized | Thrown inside the call | Rejects with `err.code === 'W_COMOR_INVALID_INPUT'` | Pass JSON-compatible input |
| `opt.filterFuncs(token, funcs)` | The result of the first client replaced the function list of every later client, and calls of other tokens could fail with `can not find` | The result is used for that token only; `funcs` passed to `filterFuncs` is a copy; the allow list is evaluated per request, so a token can not call a function that `filterFuncs` removed for it, even without asking for the list first | Nothing, unless you relied on the shared effect |

The last row narrows what a token may call (a function hidden by `filterFuncs` is now refused even when called directly). Before upgrading, check whether any client relied on the old behavior: make your `filterFuncs` log the names it removes for each token, then compare them with the function names your clients call (for example with `grep`).

### Closing the client

`new WComorMqttClient(opt)` returns a Promise that now also has a `close()` function. Keep a reference to that Promise (`.then()` returns a new Promise without `close`):

```alias
let client = new WComorMqttClient(opt)
let wo = await client
//...
await client.close() //stop reconnecting, end the connection, reject waiting calls with code 'W_COMOR_CLOSED'
```

* `close()` is safe to call more than once (it returns the same Promise), clears the reconnect timer, ends every connection, and rejects the calls that are waiting for a reply with `err.code === 'W_COMOR_CLOSED'`. Calls made after it reject with the same code.
* After `close()` the `open`, `close`, `error` and `reconn` callbacks are not called again, so closing on purpose does not trigger `opt.close`.
* Without `close()`, the client reconnects every 5 seconds after a disconnect until the process ends (unchanged).
* If the client has not connected yet (for example the token was refused), the Promise stays pending after `close()`; it is not rejected.