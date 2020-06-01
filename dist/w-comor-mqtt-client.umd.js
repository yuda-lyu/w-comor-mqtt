/*!
 * w-comor-mqtt-client v1.0.26
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("mqtt")):"function"==typeof define&&define.amd?define(["mqtt"],n):(t=t||self)["w-comor-mqtt-client"]=n(t.mqtt)}(this,(function(t){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var n=Array.isArray,r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,n){return t(n={exports:{}},n.exports),n.exports}var o=e((function(t){function n(r){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(r)}t.exports=n})),u="object"==o(r)&&r&&r.Object===Object&&r,i="object"==("undefined"==typeof self?"undefined":o(self))&&self&&self.Object===Object&&self,c=u||i||Function("return this")(),a=c.Symbol,f=Object.prototype,s=f.hasOwnProperty,l=f.toString,v=a?a.toStringTag:void 0;var p=function(t){var n=s.call(t,v),r=t[v];try{t[v]=void 0;var e=!0}catch(t){}var o=l.call(t);return e&&(n?t[v]=r:delete t[v]),o},h=Object.prototype.toString;var y=function(t){return h.call(t)},b=a?a.toStringTag:void 0;var d=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":b&&b in Object(t)?p(t):y(t)};var _=function(t){return null!=t&&"object"==o(t)};var j=function(t){return"symbol"==o(t)||_(t)&&"[object Symbol]"==d(t)},g=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,m=/^\w*$/;var O=function(t,r){if(n(t))return!1;var e=o(t);return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=t&&!j(t))||(m.test(t)||!g.test(t)||null!=r&&t in Object(r))};var w=function(t){var n=o(t);return null!=t&&("object"==n||"function"==n)};var x,S=function(t){if(!w(t))return!1;var n=d(t);return"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n},A=c["__core-js_shared__"],P=(x=/[^.]+$/.exec(A&&A.keys&&A.keys.IE_PROTO||""))?"Symbol(src)_1."+x:"";var k=function(t){return!!P&&P in t},N=Function.prototype.toString;var T=function(t){if(null!=t){try{return N.call(t)}catch(t){}try{return t+""}catch(t){}}return""},F=/^\[object .+?Constructor\]$/,$=Function.prototype,z=Object.prototype,C=$.toString,q=z.hasOwnProperty,E=RegExp("^"+C.call(q).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var L=function(t){return!(!w(t)||k(t))&&(S(t)?E:F).test(T(t))};var I=function(t,n){return null==t?void 0:t[n]};var M=function(t,n){var r=I(t,n);return L(r)?r:void 0},U=M(Object,"create");var B=function(){this.__data__=U?U(null):{},this.size=0};var R=function(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n},D=Object.prototype.hasOwnProperty;var J=function(t){var n=this.__data__;if(U){var r=n[t];return"__lodash_hash_undefined__"===r?void 0:r}return D.call(n,t)?n[t]:void 0},G=Object.prototype.hasOwnProperty;var V=function(t){var n=this.__data__;return U?void 0!==n[t]:G.call(n,t)};var W=function(t,n){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=U&&void 0===n?"__lodash_hash_undefined__":n,this};function H(t){var n=-1,r=null==t?0:t.length;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}H.prototype.clear=B,H.prototype.delete=R,H.prototype.get=J,H.prototype.has=V,H.prototype.set=W;var K=H;var Q=function(){this.__data__=[],this.size=0};var X=function(t,n){return t===n||t!=t&&n!=n};var Y=function(t,n){for(var r=t.length;r--;)if(X(t[r][0],n))return r;return-1},Z=Array.prototype.splice;var tt=function(t){var n=this.__data__,r=Y(n,t);return!(r<0)&&(r==n.length-1?n.pop():Z.call(n,r,1),--this.size,!0)};var nt=function(t){var n=this.__data__,r=Y(n,t);return r<0?void 0:n[r][1]};var rt=function(t){return Y(this.__data__,t)>-1};var et=function(t,n){var r=this.__data__,e=Y(r,t);return e<0?(++this.size,r.push([t,n])):r[e][1]=n,this};function ot(t){var n=-1,r=null==t?0:t.length;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}ot.prototype.clear=Q,ot.prototype.delete=tt,ot.prototype.get=nt,ot.prototype.has=rt,ot.prototype.set=et;var ut=ot,it=M(c,"Map");var ct=function(){this.size=0,this.__data__={hash:new K,map:new(it||ut),string:new K}};var at=function(t){var n=o(t);return"string"==n||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==t:null===t};var ft=function(t,n){var r=t.__data__;return at(n)?r["string"==typeof n?"string":"hash"]:r.map};var st=function(t){var n=ft(this,t).delete(t);return this.size-=n?1:0,n};var lt=function(t){return ft(this,t).get(t)};var vt=function(t){return ft(this,t).has(t)};var pt=function(t,n){var r=ft(this,t),e=r.size;return r.set(t,n),this.size+=r.size==e?0:1,this};function ht(t){var n=-1,r=null==t?0:t.length;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}ht.prototype.clear=ct,ht.prototype.delete=st,ht.prototype.get=lt,ht.prototype.has=vt,ht.prototype.set=pt;var yt=ht;function bt(t,n){if("function"!=typeof t||null!=n&&"function"!=typeof n)throw new TypeError("Expected a function");var r=function r(){var e=arguments,o=n?n.apply(this,e):e[0],u=r.cache;if(u.has(o))return u.get(o);var i=t.apply(this,e);return r.cache=u.set(o,i)||u,i};return r.cache=new(bt.Cache||yt),r}bt.Cache=yt;var dt=bt;var _t=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,jt=/\\(\\)?/g,gt=function(t){var n=dt(t,(function(t){return 500===r.size&&r.clear(),t})),r=n.cache;return n}((function(t){var n=[];return 46===t.charCodeAt(0)&&n.push(""),t.replace(_t,(function(t,r,e,o){n.push(e?o.replace(jt,"$1"):r||t)})),n}));var mt=function(t,n){for(var r=-1,e=null==t?0:t.length,o=Array(e);++r<e;)o[r]=n(t[r],r,t);return o},Ot=a?a.prototype:void 0,wt=Ot?Ot.toString:void 0;var xt=function t(r){if("string"==typeof r)return r;if(n(r))return mt(r,t)+"";if(j(r))return wt?wt.call(r):"";var e=r+"";return"0"==e&&1/r==-1/0?"-0":e};var St=function(t){return null==t?"":xt(t)};var At=function(t,r){return n(t)?t:O(t,r)?[t]:gt(St(t))};var Pt=function(t){if("string"==typeof t||j(t))return t;var n=t+"";return"0"==n&&1/t==-1/0?"-0":n};var kt=function(t,n){for(var r=0,e=(n=At(n,t)).length;null!=t&&r<e;)t=t[Pt(n[r++])];return r&&r==e?t:void 0};var Nt=function(t,n,r){var e=null==t?void 0:kt(t,n);return void 0===e?r:e},Tt=function(){try{var t=M(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Ft=function(t,n,r){"__proto__"==n&&Tt?Tt(t,n,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[n]=r},$t=Object.prototype.hasOwnProperty;var zt=function(t,n,r){var e=t[n];$t.call(t,n)&&X(e,r)&&(void 0!==r||n in t)||Ft(t,n,r)},Ct=/^(?:0|[1-9]\d*)$/;var qt=function(t,n){var r=o(t);return!!(n=null==n?9007199254740991:n)&&("number"==r||"symbol"!=r&&Ct.test(t))&&t>-1&&t%1==0&&t<n};var Et=function(t,n,r,e){if(!w(t))return t;for(var o=-1,u=(n=At(n,t)).length,i=u-1,c=t;null!=c&&++o<u;){var a=Pt(n[o]),f=r;if(o!=i){var s=c[a];void 0===(f=e?e(s,a,c):void 0)&&(f=w(s)?s:qt(n[o+1])?[]:{})}zt(c,a,f),c=c[a]}return t};var Lt=function(t,n,r){return null==t?t:Et(t,n,r)};var It=function(t,n){for(var r=-1,e=null==t?0:t.length;++r<e&&!1!==n(t[r],r,t););return t};var Mt=function(t){return function(n,r,e){for(var o=-1,u=Object(n),i=e(n),c=i.length;c--;){var a=i[t?c:++o];if(!1===r(u[a],a,u))break}return n}}();var Ut=function(t,n){for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);return e};var Bt=function(t){return _(t)&&"[object Arguments]"==d(t)},Rt=Object.prototype,Dt=Rt.hasOwnProperty,Jt=Rt.propertyIsEnumerable,Gt=Bt(function(){return arguments}())?Bt:function(t){return _(t)&&Dt.call(t,"callee")&&!Jt.call(t,"callee")};var Vt=function(){return!1},Wt=e((function(t,n){var r=n&&!n.nodeType&&n,e=r&&t&&!t.nodeType&&t,o=e&&e.exports===r?c.Buffer:void 0,u=(o?o.isBuffer:void 0)||Vt;t.exports=u}));var Ht=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},Kt={};Kt["[object Float32Array]"]=Kt["[object Float64Array]"]=Kt["[object Int8Array]"]=Kt["[object Int16Array]"]=Kt["[object Int32Array]"]=Kt["[object Uint8Array]"]=Kt["[object Uint8ClampedArray]"]=Kt["[object Uint16Array]"]=Kt["[object Uint32Array]"]=!0,Kt["[object Arguments]"]=Kt["[object Array]"]=Kt["[object ArrayBuffer]"]=Kt["[object Boolean]"]=Kt["[object DataView]"]=Kt["[object Date]"]=Kt["[object Error]"]=Kt["[object Function]"]=Kt["[object Map]"]=Kt["[object Number]"]=Kt["[object Object]"]=Kt["[object RegExp]"]=Kt["[object Set]"]=Kt["[object String]"]=Kt["[object WeakMap]"]=!1;var Qt=function(t){return _(t)&&Ht(t.length)&&!!Kt[d(t)]};var Xt=function(t){return function(n){return t(n)}},Yt=e((function(t,n){var r=n&&!n.nodeType&&n,e=r&&t&&!t.nodeType&&t,o=e&&e.exports===r&&u.process,i=function(){try{var t=e&&e.require&&e.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=i})),Zt=Yt&&Yt.isTypedArray,tn=Zt?Xt(Zt):Qt,nn=Object.prototype.hasOwnProperty;var rn=function(t,r){var e=n(t),o=!e&&Gt(t),u=!e&&!o&&Wt(t),i=!e&&!o&&!u&&tn(t),c=e||o||u||i,a=c?Ut(t.length,String):[],f=a.length;for(var s in t)!r&&!nn.call(t,s)||c&&("length"==s||u&&("offset"==s||"parent"==s)||i&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||qt(s,f))||a.push(s);return a},en=Object.prototype;var on=function(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||en)};var un=function(t,n){return function(r){return t(n(r))}}(Object.keys,Object),cn=Object.prototype.hasOwnProperty;var an=function(t){if(!on(t))return un(t);var n=[];for(var r in Object(t))cn.call(t,r)&&"constructor"!=r&&n.push(r);return n};var fn=function(t){return null!=t&&Ht(t.length)&&!S(t)};var sn=function(t){return fn(t)?rn(t):an(t)};var ln=function(t,n){return function(r,e){if(null==r)return r;if(!fn(r))return t(r,e);for(var o=r.length,u=n?o:-1,i=Object(r);(n?u--:++u<o)&&!1!==e(i[u],u,i););return r}}((function(t,n){return t&&Mt(t,n,sn)}));var vn=function(t){return t};var pn=function(t){return"function"==typeof t?t:vn};var hn=function(t,r){return(n(t)?It:ln)(t,pn(r))};function yn(){var t,n,r=new Promise((function(){t=arguments[0],n=arguments[1]}));return r.resolve=t,r.reject=n,r}var bn=/^\s+|\s+$/g,dn=/^[-+]0x[0-9a-f]+$/i,_n=/^0b[01]+$/i,jn=/^0o[0-7]+$/i,gn=parseInt;var mn=function(t){if("number"==typeof t)return t;if(j(t))return NaN;if(w(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=w(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(bn,"");var r=_n.test(t);return r||jn.test(t)?gn(t.slice(2),r?2:8):dn.test(t)?NaN:+t};var On=function(t){return t?(t=mn(t))===1/0||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0};var wn=function(t){var n=On(t),r=n%1;return n==n?r?n-r:n:0};var xn=function(t){return"number"==typeof t&&t==wn(t)};function Sn(t){return"[object String]"===Object.prototype.toString.call(t)}function An(t){return!(!Sn(t)||""===t)}function Pn(t){var n=!1;return An(t)?n=!isNaN(Number(t)):function(t){return"[object Number]"===Object.prototype.toString.call(t)}(t)&&(n=!0),n}function kn(t){return Pn(t)?On(t):0}var Nn=c.isFinite,Tn=Math.min;var Fn=function(t){var n=Math[t];return function(t,r){if(t=mn(t),(r=null==r?0:Tn(wn(r),292))&&Nn(t)){var e=(St(t)+"e").split("e"),o=n(e[0]+"e"+(+e[1]+r));return+((e=(St(o)+"e").split("e"))[0]+"e"+(+e[1]-r))}return n(t)}}("round");function $n(t){if(!Pn(t))return 0;t=kn(t);var n=Fn(t);return"0"===String(n)?0:n}function zn(t){return!!function(t){return!!Pn(t)&&(t=kn(t),xn(t))}(t)&&$n(t)>0}var Cn="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),qn=Cn.length;function En(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,n=[];t=zn(t)?$n(t):32;for(var r=0;r<t;r++)n[r]=Cn[0|Math.random()*qn];var e=n.join("");return e}var Ln=e((function(t){var n=Object.prototype.hasOwnProperty,r="~";function e(){}function o(t,n,r){this.fn=t,this.context=n,this.once=r||!1}function u(t,n,e,u,i){if("function"!=typeof e)throw new TypeError("The listener must be a function");var c=new o(e,u||t,i),a=r?r+n:n;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],c]:t._events[a].push(c):(t._events[a]=c,t._eventsCount++),t}function i(t,n){0==--t._eventsCount?t._events=new e:delete t._events[n]}function c(){this._events=new e,this._eventsCount=0}Object.create&&(e.prototype=Object.create(null),(new e).__proto__||(r=!1)),c.prototype.eventNames=function(){var t,e,o=[];if(0===this._eventsCount)return o;for(e in t=this._events)n.call(t,e)&&o.push(r?e.slice(1):e);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(t)):o},c.prototype.listeners=function(t){var n=r?r+t:t,e=this._events[n];if(!e)return[];if(e.fn)return[e.fn];for(var o=0,u=e.length,i=new Array(u);o<u;o++)i[o]=e[o].fn;return i},c.prototype.listenerCount=function(t){var n=r?r+t:t,e=this._events[n];return e?e.fn?1:e.length:0},c.prototype.emit=function(t,n,e,o,u,i){var c=r?r+t:t;if(!this._events[c])return!1;var a,f,s=this._events[c],l=arguments.length;if(s.fn){switch(s.once&&this.removeListener(t,s.fn,void 0,!0),l){case 1:return s.fn.call(s.context),!0;case 2:return s.fn.call(s.context,n),!0;case 3:return s.fn.call(s.context,n,e),!0;case 4:return s.fn.call(s.context,n,e,o),!0;case 5:return s.fn.call(s.context,n,e,o,u),!0;case 6:return s.fn.call(s.context,n,e,o,u,i),!0}for(f=1,a=new Array(l-1);f<l;f++)a[f-1]=arguments[f];s.fn.apply(s.context,a)}else{var v,p=s.length;for(f=0;f<p;f++)switch(s[f].once&&this.removeListener(t,s[f].fn,void 0,!0),l){case 1:s[f].fn.call(s[f].context);break;case 2:s[f].fn.call(s[f].context,n);break;case 3:s[f].fn.call(s[f].context,n,e);break;case 4:s[f].fn.call(s[f].context,n,e,o);break;default:if(!a)for(v=1,a=new Array(l-1);v<l;v++)a[v-1]=arguments[v];s[f].fn.apply(s[f].context,a)}}return!0},c.prototype.on=function(t,n,r){return u(this,t,n,r,!1)},c.prototype.once=function(t,n,r){return u(this,t,n,r,!0)},c.prototype.removeListener=function(t,n,e,o){var u=r?r+t:t;if(!this._events[u])return this;if(!n)return i(this,u),this;var c=this._events[u];if(c.fn)c.fn!==n||o&&!c.once||e&&c.context!==e||i(this,u);else{for(var a=0,f=[],s=c.length;a<s;a++)(c[a].fn!==n||o&&!c[a].once||e&&c[a].context!==e)&&f.push(c[a]);f.length?this._events[u]=1===f.length?f[0]:f:i(this,u)}return this},c.prototype.removeAllListeners=function(t){var n;return t?(n=r?r+t:t,this._events[n]&&i(this,n)):(this._events=new e,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=r,c.EventEmitter=c,t.exports=c}));function In(){return new Ln}function Mn(t){var n=Object.prototype.toString.call(t);return"[object Function]"===n||"[object AsyncFunction]"===n}function Un(t){return"[object Array]"===Object.prototype.toString.call(t)}function Bn(t){if(function(t){return"[object Object]"===Object.prototype.toString.call(t)}(t)){for(var n in t)return!1;return!0}return!1}function Rn(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!Bn(t)||(!!function(t){return!(!Sn(t)||""!==t)}(t)||!!function(t){return!!Un(t)&&0===t.length}(t))))}function Dn(t){return!!Un(t)&&(0!==t.length&&(1!==t.length||!Rn(t[0])))}return function(n){var r=yn(),e="",o={},u=0,i=new In;function c(){var r=yn(),o={},u=En();e=u,n.url||(n.url="mqtt://localhost:8080"),n.token||(n.token="*");var c="topic|"+En(),a=null;try{a=t.connect(n.url,{username:n.token})}catch(t){return s(),r.reject(),r}function f(t){!function(t,n){a.connected&&a.publish(t,JSON.stringify(n),{qos:2,retain:!1})}(c,t)}function l(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=yn(),o=En(),u={token:n.token,_id:o,func:t,input:r};return f(u),i.on(o,(function(t){e.resolve(t),i.removeAllListeners(o)})),e}return a.on("connect",(function(){e===u?(Mn(n.open)&&n.open(),function(t){var n=yn();return a.connected?a.subscribe(t,{qos:2},(function(t){t?n.reject("subscribe error: no send"):n.resolve()})):n.reject("subscribe error: no connect"),n}(c).then((function(){return l("getFuncs",null)})).catch((function(t){Mn(n.error)&&n.error(t)}))):a.end()})),a.on("message",(function(t,n){if(e===u){var c=function(t){if(!An(t))return{};var n={};try{n=JSON.parse(t)}catch(t){n={}}return n}(n.toString("utf8"));if("sys"===Nt(c,"output.sys")&&Nt(c,"output.funcs")){for(var f=c.output.funcs,s=function(t){var n=f[t];Lt(o,n,(function(t){return l(n,t)}))},v=0;v<f.length;v++)s(v);r.resolve(o)}if(Nt(c,"_id")&&Nt(c,"output")){var p=Nt(c,"_id"),h=Nt(c,"output");i.emit(p,h)}}else a.end()})),a.on("reconnect",(function(){})),a.on("offline",(function(){a.end(),Mn(n.close)&&n.close(),s()})),a.on("error",(function(t){Mn(n.error)&&n.error(t)})),r}function a(t){if(0===u)u++,o=t,r.resolve(o);else{var n=sn(o),e=sn(t);hn(e,(function(n){o[n]=t[n]})),hn(n,(function(t){(function(t,n){if(An(t))t=[t];else if(!Dn(t))return!1;if(An(n))n=[n];else if(!Dn(n))return!1;for(var r=0;r<t.length;r++)for(var e=0;e<n.length;e++)if(t[r]===n[e])return!0;return!1})(e,t)||delete o[t]}))}}function f(){(new c).then((function(t){a(t)})).catch((function(){}))}function s(){setTimeout((function(){Mn(n.reconn)&&n.reconn(),f()}),5e3)}return f(),r}}));
//# sourceMappingURL=w-comor-mqtt-client.umd.js.map
