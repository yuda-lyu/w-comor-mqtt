/*!
 * w-comor-mqtt-client v1.0.29
 * (c) 2018-2021 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("mqtt")):"function"==typeof define&&define.amd?define(["mqtt"],r):(t="undefined"!=typeof globalThis?globalThis:t||self)["w-comor-mqtt-client"]=r(t.mqtt)}(this,(function(t){"use strict";function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=r(t),n=Array.isArray;function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function u(t){var r={exports:{}};return t(r,r.exports),r.exports}var a="object"==o(i)&&i&&i.Object===Object&&i,c="object"==("undefined"==typeof self?"undefined":o(self))&&self&&self.Object===Object&&self,f=a||c||Function("return this")(),s=f.Symbol,l=Object.prototype,v=l.hasOwnProperty,p=l.toString,h=s?s.toStringTag:void 0;var y=function(t){var r=v.call(t,h),e=t[h];try{t[h]=void 0;var n=!0}catch(t){}var o=p.call(t);return n&&(r?t[h]=e:delete t[h]),o},b=Object.prototype.toString;var _=function(t){return b.call(t)},d=s?s.toStringTag:void 0;var j=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":d&&d in Object(t)?y(t):_(t)};var g=function(t){return null!=t&&"object"==o(t)};var m=function(t){return"symbol"==o(t)||g(t)&&"[object Symbol]"==j(t)},O=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,w=/^\w*$/;var S=function(t,r){if(n(t))return!1;var e=o(t);return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=t&&!m(t))||(w.test(t)||!O.test(t)||null!=r&&t in Object(r))};var A=function(t){var r=o(t);return null!=t&&("object"==r||"function"==r)};var x,z=function(t){if(!A(t))return!1;var r=j(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r},P=f["__core-js_shared__"],k=(x=/[^.]+$/.exec(P&&P.keys&&P.keys.IE_PROTO||""))?"Symbol(src)_1."+x:"";var T=function(t){return!!k&&k in t},E=Function.prototype.toString;var N=function(t){if(null!=t){try{return E.call(t)}catch(t){}try{return t+""}catch(t){}}return""},F=/^\[object .+?Constructor\]$/,L=Function.prototype,$=Object.prototype,C=L.toString,q=$.hasOwnProperty,M=RegExp("^"+C.call(q).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var I=function(t){return!(!A(t)||T(t))&&(z(t)?M:F).test(N(t))};var B=function(t,r){return null==t?void 0:t[r]};var U=function(t,r){var e=B(t,r);return I(e)?e:void 0},D=U(Object,"create");var R=function(){this.__data__=D?D(null):{},this.size=0};var V=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},W=Object.prototype.hasOwnProperty;var J=function(t){var r=this.__data__;if(D){var e=r[t];return"__lodash_hash_undefined__"===e?void 0:e}return W.call(r,t)?r[t]:void 0},G=Object.prototype.hasOwnProperty;var H=function(t){var r=this.__data__;return D?void 0!==r[t]:G.call(r,t)};var K=function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=D&&void 0===r?"__lodash_hash_undefined__":r,this};function Q(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}Q.prototype.clear=R,Q.prototype.delete=V,Q.prototype.get=J,Q.prototype.has=H,Q.prototype.set=K;var X=Q;var Y=function(){this.__data__=[],this.size=0};var Z=function(t,r){return t===r||t!=t&&r!=r};var tt=function(t,r){for(var e=t.length;e--;)if(Z(t[e][0],r))return e;return-1},rt=Array.prototype.splice;var et=function(t){var r=this.__data__,e=tt(r,t);return!(e<0)&&(e==r.length-1?r.pop():rt.call(r,e,1),--this.size,!0)};var nt=function(t){var r=this.__data__,e=tt(r,t);return e<0?void 0:r[e][1]};var ot=function(t){return tt(this.__data__,t)>-1};var it=function(t,r){var e=this.__data__,n=tt(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this};function ut(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}ut.prototype.clear=Y,ut.prototype.delete=et,ut.prototype.get=nt,ut.prototype.has=ot,ut.prototype.set=it;var at=ut,ct=U(f,"Map");var ft=function(){this.size=0,this.__data__={hash:new X,map:new(ct||at),string:new X}};var st=function(t){var r=o(t);return"string"==r||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t};var lt=function(t,r){var e=t.__data__;return st(r)?e["string"==typeof r?"string":"hash"]:e.map};var vt=function(t){var r=lt(this,t).delete(t);return this.size-=r?1:0,r};var pt=function(t){return lt(this,t).get(t)};var ht=function(t){return lt(this,t).has(t)};var yt=function(t,r){var e=lt(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this};function bt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}bt.prototype.clear=ft,bt.prototype.delete=vt,bt.prototype.get=pt,bt.prototype.has=ht,bt.prototype.set=yt;var _t=bt;function dt(t,r){if("function"!=typeof t||null!=r&&"function"!=typeof r)throw new TypeError("Expected a function");var e=function e(){var n=arguments,o=r?r.apply(this,n):n[0],i=e.cache;if(i.has(o))return i.get(o);var u=t.apply(this,n);return e.cache=i.set(o,u)||i,u};return e.cache=new(dt.Cache||_t),e}dt.Cache=_t;var jt=dt;var gt=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,mt=/\\(\\)?/g,Ot=function(t){var r=jt(t,(function(t){return 500===e.size&&e.clear(),t})),e=r.cache;return r}((function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(gt,(function(t,e,n,o){r.push(n?o.replace(mt,"$1"):e||t)})),r}));var wt=function(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o},St=s?s.prototype:void 0,At=St?St.toString:void 0;var xt=function t(r){if("string"==typeof r)return r;if(n(r))return wt(r,t)+"";if(m(r))return At?At.call(r):"";var e=r+"";return"0"==e&&1/r==-Infinity?"-0":e};var zt=function(t){return null==t?"":xt(t)};var Pt=function(t,r){return n(t)?t:S(t,r)?[t]:Ot(zt(t))};var kt=function(t){if("string"==typeof t||m(t))return t;var r=t+"";return"0"==r&&1/t==-Infinity?"-0":r};var Tt=function(t,r){for(var e=0,n=(r=Pt(r,t)).length;null!=t&&e<n;)t=t[kt(r[e++])];return e&&e==n?t:void 0};var Et=function(t,r,e){var n=null==t?void 0:Tt(t,r);return void 0===n?e:n},Nt=function(){try{var t=U(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Ft=function(t,r,e){"__proto__"==r&&Nt?Nt(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e},Lt=Object.prototype.hasOwnProperty;var $t=function(t,r,e){var n=t[r];Lt.call(t,r)&&Z(n,e)&&(void 0!==e||r in t)||Ft(t,r,e)},Ct=/^(?:0|[1-9]\d*)$/;var qt=function(t,r){var e=o(t);return!!(r=null==r?9007199254740991:r)&&("number"==e||"symbol"!=e&&Ct.test(t))&&t>-1&&t%1==0&&t<r};var Mt=function(t,r,e,n){if(!A(t))return t;for(var o=-1,i=(r=Pt(r,t)).length,u=i-1,a=t;null!=a&&++o<i;){var c=kt(r[o]),f=e;if("__proto__"===c||"constructor"===c||"prototype"===c)return t;if(o!=u){var s=a[c];void 0===(f=n?n(s,c,a):void 0)&&(f=A(s)?s:qt(r[o+1])?[]:{})}$t(a,c,f),a=a[c]}return t};var It=function(t,r,e){return null==t?t:Mt(t,r,e)};var Bt=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t};var Ut=function(t){return function(r,e,n){for(var o=-1,i=Object(r),u=n(r),a=u.length;a--;){var c=u[t?a:++o];if(!1===e(i[c],c,i))break}return r}}();var Dt=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n};var Rt=function(t){return g(t)&&"[object Arguments]"==j(t)},Vt=Object.prototype,Wt=Vt.hasOwnProperty,Jt=Vt.propertyIsEnumerable,Gt=Rt(function(){return arguments}())?Rt:function(t){return g(t)&&Wt.call(t,"callee")&&!Jt.call(t,"callee")},Ht=Gt;var Kt=function(){return!1},Qt=u((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?f.Buffer:void 0,i=(o?o.isBuffer:void 0)||Kt;t.exports=i}));var Xt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},Yt={};Yt["[object Float32Array]"]=Yt["[object Float64Array]"]=Yt["[object Int8Array]"]=Yt["[object Int16Array]"]=Yt["[object Int32Array]"]=Yt["[object Uint8Array]"]=Yt["[object Uint8ClampedArray]"]=Yt["[object Uint16Array]"]=Yt["[object Uint32Array]"]=!0,Yt["[object Arguments]"]=Yt["[object Array]"]=Yt["[object ArrayBuffer]"]=Yt["[object Boolean]"]=Yt["[object DataView]"]=Yt["[object Date]"]=Yt["[object Error]"]=Yt["[object Function]"]=Yt["[object Map]"]=Yt["[object Number]"]=Yt["[object Object]"]=Yt["[object RegExp]"]=Yt["[object Set]"]=Yt["[object String]"]=Yt["[object WeakMap]"]=!1;var Zt=function(t){return g(t)&&Xt(t.length)&&!!Yt[j(t)]};var tr=function(t){return function(r){return t(r)}},rr=u((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e&&a.process,i=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=i})),er=rr&&rr.isTypedArray,nr=er?tr(er):Zt,or=Object.prototype.hasOwnProperty;var ir=function(t,r){var e=n(t),o=!e&&Ht(t),i=!e&&!o&&Qt(t),u=!e&&!o&&!i&&nr(t),a=e||o||i||u,c=a?Dt(t.length,String):[],f=c.length;for(var s in t)!r&&!or.call(t,s)||a&&("length"==s||i&&("offset"==s||"parent"==s)||u&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||qt(s,f))||c.push(s);return c},ur=Object.prototype;var ar=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||ur)};var cr=function(t,r){return function(e){return t(r(e))}}(Object.keys,Object),fr=Object.prototype.hasOwnProperty;var sr=function(t){if(!ar(t))return cr(t);var r=[];for(var e in Object(t))fr.call(t,e)&&"constructor"!=e&&r.push(e);return r};var lr=function(t){return null!=t&&Xt(t.length)&&!z(t)};var vr=function(t){return lr(t)?ir(t):sr(t)};var pr=function(t,r){return function(e,n){if(null==e)return e;if(!lr(e))return t(e,n);for(var o=e.length,i=r?o:-1,u=Object(e);(r?i--:++i<o)&&!1!==n(u[i],i,u););return e}}((function(t,r){return t&&Ut(t,r,vr)}));var hr=function(t){return t};var yr=function(t){return"function"==typeof t?t:hr};var br=function(t,r){return(n(t)?Bt:pr)(t,yr(r))};function _r(){var t,r,e=new Promise((function(){t=arguments[0],r=arguments[1]}));return e.resolve=t,e.reject=r,e}var dr=/\s/;var jr=function(t){for(var r=t.length;r--&&dr.test(t.charAt(r)););return r},gr=/^\s+/;var mr=function(t){return t?t.slice(0,jr(t)+1).replace(gr,""):t},Or=/^[-+]0x[0-9a-f]+$/i,wr=/^0b[01]+$/i,Sr=/^0o[0-7]+$/i,Ar=parseInt;var xr=function(t){if("number"==typeof t)return t;if(m(t))return NaN;if(A(t)){var r="function"==typeof t.valueOf?t.valueOf():t;t=A(r)?r+"":r}if("string"!=typeof t)return 0===t?t:+t;t=mr(t);var e=wr.test(t);return e||Sr.test(t)?Ar(t.slice(2),e?2:8):Or.test(t)?NaN:+t},zr=1/0;var Pr=function(t){return t?(t=xr(t))===zr||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0};var kr=function(t){var r=Pr(t),e=r%1;return r==r?e?r-e:r:0};var Tr=function(t){return"number"==typeof t&&t==kr(t)};function Er(t){return"[object String]"===Object.prototype.toString.call(t)}function Nr(t){return!(!Er(t)||""===t)}function Fr(t){var r=!1;return Nr(t)?r=!isNaN(Number(t)):function(t){return"[object Number]"===Object.prototype.toString.call(t)}(t)&&(r=!0),r}function Lr(t){return Fr(t)?Pr(t):0}var $r=f.isFinite,Cr=Math.min;var qr=function(t){var r=Math[t];return function(t,e){if(t=xr(t),(e=null==e?0:Cr(kr(e),292))&&$r(t)){var n=(zt(t)+"e").split("e"),o=r(n[0]+"e"+(+n[1]+e));return+((n=(zt(o)+"e").split("e"))[0]+"e"+(+n[1]-e))}return r(t)}}("round");function Mr(t){if(!Fr(t))return 0;t=Lr(t);var r=qr(t);return"0"===String(r)?0:r}function Ir(t){return!!function(t){return!!Fr(t)&&(t=Lr(t),Tr(t))}(t)&&Mr(t)>0}var Br="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),Ur=Br.length;function Dr(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,r=[];t=Ir(t)?Mr(t):32;for(var e=0;e<t;e++)r[e]=Br[0|Math.random()*Ur];var n=r.join("");return n}var Rr=u((function(t){var r=Object.prototype.hasOwnProperty,e="~";function n(){}function o(t,r,e){this.fn=t,this.context=r,this.once=e||!1}function i(t,r,n,i,u){if("function"!=typeof n)throw new TypeError("The listener must be a function");var a=new o(n,i||t,u),c=e?e+r:r;return t._events[c]?t._events[c].fn?t._events[c]=[t._events[c],a]:t._events[c].push(a):(t._events[c]=a,t._eventsCount++),t}function u(t,r){0==--t._eventsCount?t._events=new n:delete t._events[r]}function a(){this._events=new n,this._eventsCount=0}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(e=!1)),a.prototype.eventNames=function(){var t,n,o=[];if(0===this._eventsCount)return o;for(n in t=this._events)r.call(t,n)&&o.push(e?n.slice(1):n);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(t)):o},a.prototype.listeners=function(t){var r=e?e+t:t,n=this._events[r];if(!n)return[];if(n.fn)return[n.fn];for(var o=0,i=n.length,u=new Array(i);o<i;o++)u[o]=n[o].fn;return u},a.prototype.listenerCount=function(t){var r=e?e+t:t,n=this._events[r];return n?n.fn?1:n.length:0},a.prototype.emit=function(t,r,n,o,i,u){var a=e?e+t:t;if(!this._events[a])return!1;var c,f,s=this._events[a],l=arguments.length;if(s.fn){switch(s.once&&this.removeListener(t,s.fn,void 0,!0),l){case 1:return s.fn.call(s.context),!0;case 2:return s.fn.call(s.context,r),!0;case 3:return s.fn.call(s.context,r,n),!0;case 4:return s.fn.call(s.context,r,n,o),!0;case 5:return s.fn.call(s.context,r,n,o,i),!0;case 6:return s.fn.call(s.context,r,n,o,i,u),!0}for(f=1,c=new Array(l-1);f<l;f++)c[f-1]=arguments[f];s.fn.apply(s.context,c)}else{var v,p=s.length;for(f=0;f<p;f++)switch(s[f].once&&this.removeListener(t,s[f].fn,void 0,!0),l){case 1:s[f].fn.call(s[f].context);break;case 2:s[f].fn.call(s[f].context,r);break;case 3:s[f].fn.call(s[f].context,r,n);break;case 4:s[f].fn.call(s[f].context,r,n,o);break;default:if(!c)for(v=1,c=new Array(l-1);v<l;v++)c[v-1]=arguments[v];s[f].fn.apply(s[f].context,c)}}return!0},a.prototype.on=function(t,r,e){return i(this,t,r,e,!1)},a.prototype.once=function(t,r,e){return i(this,t,r,e,!0)},a.prototype.removeListener=function(t,r,n,o){var i=e?e+t:t;if(!this._events[i])return this;if(!r)return u(this,i),this;var a=this._events[i];if(a.fn)a.fn!==r||o&&!a.once||n&&a.context!==n||u(this,i);else{for(var c=0,f=[],s=a.length;c<s;c++)(a[c].fn!==r||o&&!a[c].once||n&&a[c].context!==n)&&f.push(a[c]);f.length?this._events[i]=1===f.length?f[0]:f:u(this,i)}return this},a.prototype.removeAllListeners=function(t){var r;return t?(r=e?e+t:t,this._events[r]&&u(this,r)):(this._events=new n,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=e,a.EventEmitter=a,t.exports=a}));function Vr(){return new Rr}function Wr(t){var r=Object.prototype.toString.call(t);return"[object Function]"===r||"[object AsyncFunction]"===r}var Jr=function(){this.__data__=new at,this.size=0};var Gr=function(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e};var Hr=function(t){return this.__data__.get(t)};var Kr=function(t){return this.__data__.has(t)};var Qr=function(t,r){var e=this.__data__;if(e instanceof at){var n=e.__data__;if(!ct||n.length<199)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new _t(n)}return e.set(t,r),this.size=e.size,this};function Xr(t){var r=this.__data__=new at(t);this.size=r.size}Xr.prototype.clear=Jr,Xr.prototype.delete=Gr,Xr.prototype.get=Hr,Xr.prototype.has=Kr,Xr.prototype.set=Qr;var Yr=Xr;var Zr=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this};var te=function(t){return this.__data__.has(t)};function re(t){var r=-1,e=null==t?0:t.length;for(this.__data__=new _t;++r<e;)this.add(t[r])}re.prototype.add=re.prototype.push=Zr,re.prototype.has=te;var ee=re;var ne=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n;)if(r(t[e],e,t))return!0;return!1};var oe=function(t,r){return t.has(r)};var ie=function(t,r,e,n,o,i){var u=1&e,a=t.length,c=r.length;if(a!=c&&!(u&&c>a))return!1;var f=i.get(t),s=i.get(r);if(f&&s)return f==r&&s==t;var l=-1,v=!0,p=2&e?new ee:void 0;for(i.set(t,r),i.set(r,t);++l<a;){var h=t[l],y=r[l];if(n)var b=u?n(y,h,l,r,t,i):n(h,y,l,t,r,i);if(void 0!==b){if(b)continue;v=!1;break}if(p){if(!ne(r,(function(t,r){if(!oe(p,r)&&(h===t||o(h,t,e,n,i)))return p.push(r)}))){v=!1;break}}else if(h!==y&&!o(h,y,e,n,i)){v=!1;break}}return i.delete(t),i.delete(r),v},ue=f.Uint8Array;var ae=function(t){var r=-1,e=Array(t.size);return t.forEach((function(t,n){e[++r]=[n,t]})),e};var ce=function(t){var r=-1,e=Array(t.size);return t.forEach((function(t){e[++r]=t})),e},fe=s?s.prototype:void 0,se=fe?fe.valueOf:void 0;var le=function(t,r,e,n,o,i,u){switch(e){case"[object DataView]":if(t.byteLength!=r.byteLength||t.byteOffset!=r.byteOffset)return!1;t=t.buffer,r=r.buffer;case"[object ArrayBuffer]":return!(t.byteLength!=r.byteLength||!i(new ue(t),new ue(r)));case"[object Boolean]":case"[object Date]":case"[object Number]":return Z(+t,+r);case"[object Error]":return t.name==r.name&&t.message==r.message;case"[object RegExp]":case"[object String]":return t==r+"";case"[object Map]":var a=ae;case"[object Set]":var c=1&n;if(a||(a=ce),t.size!=r.size&&!c)return!1;var f=u.get(t);if(f)return f==r;n|=2,u.set(t,r);var s=ie(a(t),a(r),n,o,i,u);return u.delete(t),s;case"[object Symbol]":if(se)return se.call(t)==se.call(r)}return!1};var ve=function(t,r){for(var e=-1,n=r.length,o=t.length;++e<n;)t[o+e]=r[e];return t};var pe=function(t,r,e){var o=r(t);return n(t)?o:ve(o,e(t))};var he=function(t,r){for(var e=-1,n=null==t?0:t.length,o=0,i=[];++e<n;){var u=t[e];r(u,e,t)&&(i[o++]=u)}return i};var ye=function(){return[]},be=Object.prototype.propertyIsEnumerable,_e=Object.getOwnPropertySymbols,de=_e?function(t){return null==t?[]:(t=Object(t),he(_e(t),(function(r){return be.call(t,r)})))}:ye;var je=function(t){return pe(t,vr,de)},ge=Object.prototype.hasOwnProperty;var me=function(t,r,e,n,o,i){var u=1&e,a=je(t),c=a.length;if(c!=je(r).length&&!u)return!1;for(var f=c;f--;){var s=a[f];if(!(u?s in r:ge.call(r,s)))return!1}var l=i.get(t),v=i.get(r);if(l&&v)return l==r&&v==t;var p=!0;i.set(t,r),i.set(r,t);for(var h=u;++f<c;){var y=t[s=a[f]],b=r[s];if(n)var _=u?n(b,y,s,r,t,i):n(y,b,s,t,r,i);if(!(void 0===_?y===b||o(y,b,e,n,i):_)){p=!1;break}h||(h="constructor"==s)}if(p&&!h){var d=t.constructor,j=r.constructor;d==j||!("constructor"in t)||!("constructor"in r)||"function"==typeof d&&d instanceof d&&"function"==typeof j&&j instanceof j||(p=!1)}return i.delete(t),i.delete(r),p},Oe=U(f,"DataView"),we=U(f,"Promise"),Se=U(f,"Set"),Ae=U(f,"WeakMap"),xe="[object Map]",ze="[object Promise]",Pe="[object Set]",ke="[object WeakMap]",Te="[object DataView]",Ee=N(Oe),Ne=N(ct),Fe=N(we),Le=N(Se),$e=N(Ae),Ce=j;(Oe&&Ce(new Oe(new ArrayBuffer(1)))!=Te||ct&&Ce(new ct)!=xe||we&&Ce(we.resolve())!=ze||Se&&Ce(new Se)!=Pe||Ae&&Ce(new Ae)!=ke)&&(Ce=function(t){var r=j(t),e="[object Object]"==r?t.constructor:void 0,n=e?N(e):"";if(n)switch(n){case Ee:return Te;case Ne:return xe;case Fe:return ze;case Le:return Pe;case $e:return ke}return r});var qe=Ce,Me="[object Arguments]",Ie="[object Array]",Be="[object Object]",Ue=Object.prototype.hasOwnProperty;var De=function(t,r,e,o,i,u){var a=n(t),c=n(r),f=a?Ie:qe(t),s=c?Ie:qe(r),l=(f=f==Me?Be:f)==Be,v=(s=s==Me?Be:s)==Be,p=f==s;if(p&&Qt(t)){if(!Qt(r))return!1;a=!0,l=!1}if(p&&!l)return u||(u=new Yr),a||nr(t)?ie(t,r,e,o,i,u):le(t,r,f,e,o,i,u);if(!(1&e)){var h=l&&Ue.call(t,"__wrapped__"),y=v&&Ue.call(r,"__wrapped__");if(h||y){var b=h?t.value():t,_=y?r.value():r;return u||(u=new Yr),i(b,_,e,o,u)}}return!!p&&(u||(u=new Yr),me(t,r,e,o,i,u))};var Re=function t(r,e,n,o,i){return r===e||(null==r||null==e||!g(r)&&!g(e)?r!=r&&e!=e:De(r,e,n,o,t,i))};var Ve=function(t,r){return Re(t,r)};function We(t){return"[object Array]"===Object.prototype.toString.call(t)}function Je(t){if(function(t){return"[object Object]"===Object.prototype.toString.call(t)}(t)){for(var r in t)return!1;return!0}return!1}function Ge(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!Je(t)||(!!function(t){return!(!Er(t)||""!==t)}(t)||!!function(t){return!!We(t)&&0===t.length}(t))))}return function(t){var r=_r(),n="",o={},i=0,u=new Vr;function a(){var r=_r(),o={},i=Dr();n=i,t.url||(t.url="mqtt://localhost:8080"),t.token||(t.token="*");var a="topic|"+Dr(),c=null;try{c=e.default.connect(t.url,{username:t.token})}catch(t){return s(),r.reject(),r}function f(t){!function(t,r){var e={qos:2,retain:!1};c.connected&&c.publish(t,JSON.stringify(r),e)}(a,t)}function l(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=_r(),o=Dr(),i={token:t.token,_id:o,func:r,input:e};return f(i),u.on(o,(function(t){n.resolve(t),u.removeAllListeners(o)})),n}return c.on("connect",(function(){n===i?(Wr(t.open)&&t.open(),function(t){var r=_r();return c.connected?c.subscribe(t,{qos:2},(function(t){t?r.reject("subscribe error: no send"):r.resolve()})):r.reject("subscribe error: no connect"),r}(a).then((function(){return l("getFuncs",null)})).catch((function(r){Wr(t.error)&&t.error(r)}))):c.end()})),c.on("message",(function(t,e){if(n===i){var a=function(t){if(!Nr(t))return{};var r={};try{r=JSON.parse(t)}catch(t){r={}}return r}(e.toString("utf8"));if("sys"===Et(a,"output.sys")&&Et(a,"output.funcs")){for(var f=a.output.funcs,s=function(t){var r=f[t];It(o,r,(function(t){return l(r,t)}))},v=0;v<f.length;v++)s(v);r.resolve(o)}if(Et(a,"_id")&&Et(a,"output")){var p=Et(a,"_id"),h=Et(a,"output");u.emit(p,h)}}else c.end()})),c.on("reconnect",(function(){})),c.on("offline",(function(){c.end(),Wr(t.close)&&t.close(),s()})),c.on("error",(function(r){Wr(t.error)&&t.error(r)})),r}function c(t){if(0===i)i++,o=t,r.resolve(o);else{var e=vr(o),n=vr(t);br(n,(function(r){o[r]=t[r]})),br(e,(function(t){(function(t,r){function e(t){return We(t)?t:[t]}if(Ge(t))return!1;if(0===(t=e(t)).length)return!1;if(Ge(t))return!1;if(0===(r=e(r)).length)return!1;for(var n=0;n<t.length;n++)for(var o=0;o<r.length;o++)if(Ve(t[n],r[o]))return!0;return!1})(n,t)||delete o[t]}))}}function f(){(new a).then((function(t){c(t)})).catch((function(){}))}function s(){setTimeout((function(){Wr(t.reconn)&&t.reconn(),f()}),5e3)}return f(),r}}));
//# sourceMappingURL=w-comor-mqtt-client.umd.js.map
