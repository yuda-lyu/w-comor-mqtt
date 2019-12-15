/*!
 * mq-client v1.0.20
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("mqtt")):"function"==typeof define&&define.amd?define(["mqtt"],n):(t=t||self)["mq-client"]=n(t.mqtt)}(this,(function(t){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t=t&&t.hasOwnProperty("default")?t.default:t;var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(t,n){return t(n={exports:{}},n.exports),n.exports}var o=r((function(t){!function(e){function r(){}var o=r.prototype,i=e.EventEmitter;function u(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function c(t){return function(){return this[t].apply(this,arguments)}}o.getListeners=function(t){var n,e,r=this._getEvents();if(t instanceof RegExp)for(e in n={},r)r.hasOwnProperty(e)&&t.test(e)&&(n[e]=r[e]);else n=r[t]||(r[t]=[]);return n},o.flattenListeners=function(t){var n,e=[];for(n=0;n<t.length;n+=1)e.push(t[n].listener);return e},o.getListenersAsObject=function(t){var n,e=this.getListeners(t);return e instanceof Array&&((n={})[t]=e),n||e},o.addListener=function(t,e){if(!function t(e){return"function"==typeof e||e instanceof RegExp||!(!e||"object"!==n(e))&&t(e.listener)}(e))throw new TypeError("listener must be a function");var r,o=this.getListenersAsObject(t),i="object"===n(e);for(r in o)o.hasOwnProperty(r)&&-1===u(o[r],e)&&o[r].push(i?e:{listener:e,once:!1});return this},o.on=c("addListener"),o.addOnceListener=function(t,n){return this.addListener(t,{listener:n,once:!0})},o.once=c("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var n=0;n<t.length;n+=1)this.defineEvent(t[n]);return this},o.removeListener=function(t,n){var e,r,o=this.getListenersAsObject(t);for(r in o)o.hasOwnProperty(r)&&-1!==(e=u(o[r],n))&&o[r].splice(e,1);return this},o.off=c("removeListener"),o.addListeners=function(t,n){return this.manipulateListeners(!1,t,n)},o.removeListeners=function(t,n){return this.manipulateListeners(!0,t,n)},o.manipulateListeners=function(t,e,r){var o,i,u=t?this.removeListener:this.addListener,c=t?this.removeListeners:this.addListeners;if("object"!==n(e)||e instanceof RegExp)for(o=r.length;o--;)u.call(this,e,r[o]);else for(o in e)e.hasOwnProperty(o)&&(i=e[o])&&("function"==typeof i?u.call(this,o,i):c.call(this,o,i));return this},o.removeEvent=function(t){var e,r=n(t),o=this._getEvents();if("string"===r)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},o.removeAllListeners=c("removeEvent"),o.emitEvent=function(t,n){var e,r,o,i,u=this.getListenersAsObject(t);for(i in u)if(u.hasOwnProperty(i))for(e=u[i].slice(0),o=0;o<e.length;o++)!0===(r=e[o]).once&&this.removeListener(t,r.listener),r.listener.apply(this,n||[])===this._getOnceReturnValue()&&this.removeListener(t,r.listener);return this},o.trigger=c("emitEvent"),o.emit=function(t){var n=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,n)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},o._getEvents=function(){return this._events||(this._events={})},r.noConflict=function(){return e.EventEmitter=i,r},t.exports?t.exports=r:e.EventEmitter=r}("undefined"!=typeof window?window:e||{})})),i=Array.isArray,u="object"==n(e)&&e&&e.Object===Object&&e,c="object"==("undefined"==typeof self?"undefined":n(self))&&self&&self.Object===Object&&self,a=u||c||Function("return this")(),f=a.Symbol,s=Object.prototype,l=s.hasOwnProperty,v=s.toString,p=f?f.toStringTag:void 0;var h=function(t){var n=l.call(t,p),e=t[p];try{t[p]=void 0;var r=!0}catch(t){}var o=v.call(t);return r&&(n?t[p]=e:delete t[p]),o},y=Object.prototype.toString;var b=function(t){return y.call(t)},d="[object Null]",g="[object Undefined]",j=f?f.toStringTag:void 0;var _=function(t){return null==t?void 0===t?g:d:j&&j in Object(t)?h(t):b(t)};var m=function(t){return null!=t&&"object"==n(t)},O="[object Symbol]";var w=function(t){return"symbol"==n(t)||m(t)&&_(t)==O},A=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,S=/^\w*$/;var E=function(t,e){if(i(t))return!1;var r=n(t);return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!w(t))||(S.test(t)||!A.test(t)||null!=e&&t in Object(e))};var L=function(t){var e=n(t);return null!=t&&("object"==e||"function"==e)},x="[object AsyncFunction]",P="[object Function]",F="[object GeneratorFunction]",R="[object Proxy]";var T,$=function(t){if(!L(t))return!1;var n=_(t);return n==P||n==F||n==x||n==R},z=a["__core-js_shared__"],N=(T=/[^.]+$/.exec(z&&z.keys&&z.keys.IE_PROTO||""))?"Symbol(src)_1."+T:"";var k=function(t){return!!N&&N in t},q=Function.prototype.toString;var M=function(t){if(null!=t){try{return q.call(t)}catch(t){}try{return t+""}catch(t){}}return""},V=/^\[object .+?Constructor\]$/,C=Function.prototype,I=Object.prototype,U=C.toString,B=I.hasOwnProperty,D=RegExp("^"+U.call(B).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var J=function(t){return!(!L(t)||k(t))&&($(t)?D:V).test(M(t))};var G=function(t,n){return null==t?void 0:t[n]};var W=function(t,n){var e=G(t,n);return J(e)?e:void 0},H=W(Object,"create");var K=function(){this.__data__=H?H(null):{},this.size=0};var Q=function(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n},X="__lodash_hash_undefined__",Y=Object.prototype.hasOwnProperty;var Z=function(t){var n=this.__data__;if(H){var e=n[t];return e===X?void 0:e}return Y.call(n,t)?n[t]:void 0},tt=Object.prototype.hasOwnProperty;var nt=function(t){var n=this.__data__;return H?void 0!==n[t]:tt.call(n,t)},et="__lodash_hash_undefined__";var rt=function(t,n){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=H&&void 0===n?et:n,this};function ot(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}ot.prototype.clear=K,ot.prototype.delete=Q,ot.prototype.get=Z,ot.prototype.has=nt,ot.prototype.set=rt;var it=ot;var ut=function(){this.__data__=[],this.size=0};var ct=function(t,n){return t===n||t!=t&&n!=n};var at=function(t,n){for(var e=t.length;e--;)if(ct(t[e][0],n))return e;return-1},ft=Array.prototype.splice;var st=function(t){var n=this.__data__,e=at(n,t);return!(e<0)&&(e==n.length-1?n.pop():ft.call(n,e,1),--this.size,!0)};var lt=function(t){var n=this.__data__,e=at(n,t);return e<0?void 0:n[e][1]};var vt=function(t){return at(this.__data__,t)>-1};var pt=function(t,n){var e=this.__data__,r=at(e,t);return r<0?(++this.size,e.push([t,n])):e[r][1]=n,this};function ht(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}ht.prototype.clear=ut,ht.prototype.delete=st,ht.prototype.get=lt,ht.prototype.has=vt,ht.prototype.set=pt;var yt=ht,bt=W(a,"Map");var dt=function(){this.size=0,this.__data__={hash:new it,map:new(bt||yt),string:new it}};var gt=function(t){var e=n(t);return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var jt=function(t,n){var e=t.__data__;return gt(n)?e["string"==typeof n?"string":"hash"]:e.map};var _t=function(t){var n=jt(this,t).delete(t);return this.size-=n?1:0,n};var mt=function(t){return jt(this,t).get(t)};var Ot=function(t){return jt(this,t).has(t)};var wt=function(t,n){var e=jt(this,t),r=e.size;return e.set(t,n),this.size+=e.size==r?0:1,this};function At(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}At.prototype.clear=dt,At.prototype.delete=_t,At.prototype.get=mt,At.prototype.has=Ot,At.prototype.set=wt;var St=At,Et="Expected a function";function Lt(t,n){if("function"!=typeof t||null!=n&&"function"!=typeof n)throw new TypeError(Et);var e=function e(){var r=arguments,o=n?n.apply(this,r):r[0],i=e.cache;if(i.has(o))return i.get(o);var u=t.apply(this,r);return e.cache=i.set(o,u)||i,u};return e.cache=new(Lt.Cache||St),e}Lt.Cache=St;var xt=Lt,Pt=500;var Ft=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Rt=/\\(\\)?/g,Tt=function(t){var n=xt(t,(function(t){return e.size===Pt&&e.clear(),t})),e=n.cache;return n}((function(t){var n=[];return 46===t.charCodeAt(0)&&n.push(""),t.replace(Ft,(function(t,e,r,o){n.push(r?o.replace(Rt,"$1"):e||t)})),n}));var $t=function(t,n){for(var e=-1,r=null==t?0:t.length,o=Array(r);++e<r;)o[e]=n(t[e],e,t);return o},zt=1/0,Nt=f?f.prototype:void 0,kt=Nt?Nt.toString:void 0;var qt=function t(n){if("string"==typeof n)return n;if(i(n))return $t(n,t)+"";if(w(n))return kt?kt.call(n):"";var e=n+"";return"0"==e&&1/n==-zt?"-0":e};var Mt=function(t){return null==t?"":qt(t)};var Vt=function(t,n){return i(t)?t:E(t,n)?[t]:Tt(Mt(t))},Ct=1/0;var It=function(t){if("string"==typeof t||w(t))return t;var n=t+"";return"0"==n&&1/t==-Ct?"-0":n};var Ut=function(t,n){for(var e=0,r=(n=Vt(n,t)).length;null!=t&&e<r;)t=t[It(n[e++])];return e&&e==r?t:void 0};var Bt=function(t,n,e){var r=null==t?void 0:Ut(t,n);return void 0===r?e:r},Dt=function(){try{var t=W(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Jt=function(t,n,e){"__proto__"==n&&Dt?Dt(t,n,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[n]=e},Gt=Object.prototype.hasOwnProperty;var Wt=function(t,n,e){var r=t[n];Gt.call(t,n)&&ct(r,e)&&(void 0!==e||n in t)||Jt(t,n,e)},Ht=9007199254740991,Kt=/^(?:0|[1-9]\d*)$/;var Qt=function(t,e){var r=n(t);return!!(e=null==e?Ht:e)&&("number"==r||"symbol"!=r&&Kt.test(t))&&t>-1&&t%1==0&&t<e};var Xt=function(t,n,e,r){if(!L(t))return t;for(var o=-1,i=(n=Vt(n,t)).length,u=i-1,c=t;null!=c&&++o<i;){var a=It(n[o]),f=e;if(o!=u){var s=c[a];void 0===(f=r?r(s,a,c):void 0)&&(f=L(s)?s:Qt(n[o+1])?[]:{})}Wt(c,a,f),c=c[a]}return t};var Yt=function(t,n,e){return null==t?t:Xt(t,n,e)};var Zt=function(t,n){for(var e=-1,r=null==t?0:t.length;++e<r&&!1!==n(t[e],e,t););return t};var tn=function(t){return function(n,e,r){for(var o=-1,i=Object(n),u=r(n),c=u.length;c--;){var a=u[t?c:++o];if(!1===e(i[a],a,i))break}return n}}();var nn=function(t,n){for(var e=-1,r=Array(t);++e<t;)r[e]=n(e);return r},en="[object Arguments]";var rn=function(t){return m(t)&&_(t)==en},on=Object.prototype,un=on.hasOwnProperty,cn=on.propertyIsEnumerable,an=rn(function(){return arguments}())?rn:function(t){return m(t)&&un.call(t,"callee")&&!cn.call(t,"callee")};var fn=function(){return!1},sn=r((function(t,n){var e=n&&!n.nodeType&&n,r=e&&t&&!t.nodeType&&t,o=r&&r.exports===e?a.Buffer:void 0,i=(o?o.isBuffer:void 0)||fn;t.exports=i})),ln=9007199254740991;var vn=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=ln},pn={};pn["[object Float32Array]"]=pn["[object Float64Array]"]=pn["[object Int8Array]"]=pn["[object Int16Array]"]=pn["[object Int32Array]"]=pn["[object Uint8Array]"]=pn["[object Uint8ClampedArray]"]=pn["[object Uint16Array]"]=pn["[object Uint32Array]"]=!0,pn["[object Arguments]"]=pn["[object Array]"]=pn["[object ArrayBuffer]"]=pn["[object Boolean]"]=pn["[object DataView]"]=pn["[object Date]"]=pn["[object Error]"]=pn["[object Function]"]=pn["[object Map]"]=pn["[object Number]"]=pn["[object Object]"]=pn["[object RegExp]"]=pn["[object Set]"]=pn["[object String]"]=pn["[object WeakMap]"]=!1;var hn=function(t){return m(t)&&vn(t.length)&&!!pn[_(t)]};var yn=function(t){return function(n){return t(n)}},bn=r((function(t,n){var e=n&&!n.nodeType&&n,r=e&&t&&!t.nodeType&&t,o=r&&r.exports===e&&u.process,i=function(){try{var t=r&&r.require&&r.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=i})),dn=bn&&bn.isTypedArray,gn=dn?yn(dn):hn,jn=Object.prototype.hasOwnProperty;var _n=function(t,n){var e=i(t),r=!e&&an(t),o=!e&&!r&&sn(t),u=!e&&!r&&!o&&gn(t),c=e||r||o||u,a=c?nn(t.length,String):[],f=a.length;for(var s in t)!n&&!jn.call(t,s)||c&&("length"==s||o&&("offset"==s||"parent"==s)||u&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||Qt(s,f))||a.push(s);return a},mn=Object.prototype;var On=function(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||mn)};var wn=function(t,n){return function(e){return t(n(e))}}(Object.keys,Object),An=Object.prototype.hasOwnProperty;var Sn=function(t){if(!On(t))return wn(t);var n=[];for(var e in Object(t))An.call(t,e)&&"constructor"!=e&&n.push(e);return n};var En=function(t){return null!=t&&vn(t.length)&&!$(t)};var Ln=function(t){return En(t)?_n(t):Sn(t)};var xn=function(t,n){return function(e,r){if(null==e)return e;if(!En(e))return t(e,r);for(var o=e.length,i=n?o:-1,u=Object(e);(n?i--:++i<o)&&!1!==r(u[i],i,u););return e}}((function(t,n){return t&&tn(t,n,Ln)}));var Pn=function(t){return t};var Fn=function(t){return"function"==typeof t?t:Pn};var Rn=function(t,n){return(i(t)?Zt:xn)(t,Fn(n))};function Tn(){var t,n,e=new Promise((function(){t=arguments[0],n=arguments[1]}));return e.resolve=t,e.reject=n,e}var $n=NaN,zn=/^\s+|\s+$/g,Nn=/^[-+]0x[0-9a-f]+$/i,kn=/^0b[01]+$/i,qn=/^0o[0-7]+$/i,Mn=parseInt;var Vn=function(t){if("number"==typeof t)return t;if(w(t))return $n;if(L(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=L(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(zn,"");var e=kn.test(t);return e||qn.test(t)?Mn(t.slice(2),e?2:8):Nn.test(t)?$n:+t},Cn=1/0,In=17976931348623157e292;var Un=function(t){return t?(t=Vn(t))===Cn||t===-Cn?(t<0?-1:1)*In:t==t?t:0:0===t?t:0};var Bn=function(t){var n=Un(t),e=n%1;return n==n?e?n-e:n:0};var Dn=function(t){return"number"==typeof t&&t==Bn(t)};function Jn(t){return"[object String]"===Object.prototype.toString.call(t)}function Gn(t){return!(!Jn(t)||""===t)}function Wn(t){var n=!1;return Gn(t)?n=!isNaN(Number(t)):function(t){return"[object Number]"===Object.prototype.toString.call(t)}(t)&&(n=!0),n}function Hn(t){return Wn(t)?Un(t):0}var Kn=a.isFinite,Qn=Math.min;var Xn=function(t){var n=Math[t];return function(t,e){if(t=Vn(t),(e=null==e?0:Qn(Bn(e),292))&&Kn(t)){var r=(Mt(t)+"e").split("e"),o=n(r[0]+"e"+(+r[1]+e));return+((r=(Mt(o)+"e").split("e"))[0]+"e"+(+r[1]-e))}return n(t)}}("round");function Yn(t){return!!function(t){return!!Wn(t)&&(t=Hn(t),Dn(t))}(t)&&function(t){if(!Wn(t))return 0;t=Hn(t);var n=Xn(t);return"0"===String(n)?0:n}(t)>0}function Zn(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),r=[],o=e.length;if(Yn(n))for(t=0;t<n;t++)r[t]=e[0|Math.random()*o];else{if("rfc4122"!==n)return"";var i;for(r[8]=r[13]=r[18]=r[23]="-",r[14]="4",t=0;t<36;t++)r[t]||(i=0|16*Math.random(),r[t]=e[19===t?3&i|8:i])}return r.join("")}function te(t){var n=Object.prototype.toString.call(t);return"[object Function]"===n||"[object AsyncFunction]"===n}function ne(t){return"[object Array]"===Object.prototype.toString.call(t)}function ee(t){if(function(t){return"[object Object]"===Object.prototype.toString.call(t)}(t)){for(var n in t)return!1;return!0}return!1}function re(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!ee(t)||(!!function(t){return!(!Jn(t)||""!==t)}(t)||!!function(t){return!!ne(t)&&0===t.length}(t))))}function oe(t){return!!ne(t)&&(0!==t.length&&(1!==t.length||!re(t[0])))}return function(n){var e=Tn(),r="",i={},u=0,c=new o;function a(){var e=Tn(),o={},i=Zn();r=i,n.url||(n.url="mqtt://localhost:8080"),n.token||(n.token="*");var u="topic|"+Zn(),a=null;try{a=t.connect(n.url,{username:n.token})}catch(t){return l(),e.reject(),e}function f(t){!function(t,n){a.connected&&a.publish(t,JSON.stringify(n),{qos:2,retain:!1})}(u,t)}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=Tn(),o=Zn();return f({token:n.token,_id:o,func:t,input:e}),c.on(o,(function(t){r.resolve(t),c.removeAllListeners(o)})),r}return a.on("connect",(function(){r===i?(te(n.open)&&n.open(),function(t){var n=Tn();return a.connected?a.subscribe(t,{qos:2},(function(t){t?n.reject("subscribe error: no send"):n.resolve()})):n.reject("subscribe error: no connect"),n}(u).then((function(){return s("getFuncs",null)})).catch((function(t){te(n.error)&&n.error(t)}))):a.end()})),a.on("message",(function(t,n){if(r===i){var u=function(t){if(!Gn(t))return{};var n={};try{n=JSON.parse(t)}catch(t){n={}}return n}(n.toString("utf8"));if("sys"===Bt(u,"output.sys")&&Bt(u,"output.funcs")){for(var f=u.output.funcs,l=function(t){var n=f[t];Yt(o,n,(function(t){return s(n,t)}))},v=0;v<f.length;v++)l(v);e.resolve(o)}if(Bt(u,"_id")&&Bt(u,"output")){var p=Bt(u,"_id"),h=Bt(u,"output");c.emit(p,h)}}else a.end()})),a.on("reconnect",(function(){})),a.on("offline",(function(){a.end(),te(n.close)&&n.close(),l()})),a.on("error",(function(t){te(n.error)&&n.error(t)})),e}function f(t){if(0===u)u++,i=t,e.resolve(i);else{var n=Ln(i),r=Ln(t);Rn(r,(function(n){i[n]=t[n]})),Rn(n,(function(t){(function(t,n){if(Gn(t))t=[t];else if(!oe(t))return!1;if(Gn(n))n=[n];else if(!oe(n))return!1;for(var e=0;e<t.length;e++)for(var r=0;r<n.length;r++)if(t[e]===n[r])return!0;return!1})(r,t)||delete i[t]}))}}function s(){(new a).then((function(t){f(t)})).catch((function(){}))}function l(){setTimeout((function(){te(n.reconn)&&n.reconn(),s()}),5e3)}return s(),e}}));
//# sourceMappingURL=mq-client.umd.js.map
