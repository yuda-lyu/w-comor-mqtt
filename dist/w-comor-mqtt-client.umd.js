/*!
 * w-comor-mqtt-client v1.0.36
 * (c) 2018-2021 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("mqtt")):"function"==typeof define&&define.amd?define(["mqtt"],e):(t="undefined"!=typeof globalThis?globalThis:t||self)["w-comor-mqtt-client"]=e(t.mqtt)}(this,(function(t){"use strict";var e=Array.isArray,n="object"==typeof global&&global&&global.Object===Object&&global,r="object"==typeof self&&self&&self.Object===Object&&self,o=n||r||Function("return this")(),i=o.Symbol,u=Object.prototype,c=u.hasOwnProperty,a=u.toString,f=i?i.toStringTag:void 0;var s=Object.prototype.toString;var l="[object Null]",p="[object Undefined]",v=i?i.toStringTag:void 0;function h(t){return null==t?void 0===t?p:l:v&&v in Object(t)?function(t){var e=c.call(t,f),n=t[f];try{t[f]=void 0;var r=!0}catch(t){}var o=a.call(t);return r&&(e?t[f]=n:delete t[f]),o}(t):function(t){return s.call(t)}(t)}function y(t){return null!=t&&"object"==typeof t}var b="[object Symbol]";function _(t){return"symbol"==typeof t||y(t)&&h(t)==b}var d=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,j=/^\w*$/;function g(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var m="[object AsyncFunction]",O="[object Function]",w="[object GeneratorFunction]",x="[object Proxy]";function A(t){if(!g(t))return!1;var e=h(t);return e==O||e==w||e==m||e==x}var S,z=o["__core-js_shared__"],P=(S=/[^.]+$/.exec(z&&z.keys&&z.keys.IE_PROTO||""))?"Symbol(src)_1."+S:"";var k=Function.prototype.toString;function E(t){if(null!=t){try{return k.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var T=/^\[object .+?Constructor\]$/,F=Function.prototype,N=Object.prototype,L=F.toString,$=N.hasOwnProperty,C=RegExp("^"+L.call($).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function q(t){return!(!g(t)||(e=t,P&&P in e))&&(A(t)?C:T).test(E(t));var e}function M(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return q(n)?n:void 0}var B=M(Object,"create");var I=Object.prototype.hasOwnProperty;var U=Object.prototype.hasOwnProperty;function D(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function R(t,e){return t===e||t!=t&&e!=e}function V(t,e){for(var n=t.length;n--;)if(R(t[n][0],e))return n;return-1}D.prototype.clear=function(){this.__data__=B?B(null):{},this.size=0},D.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},D.prototype.get=function(t){var e=this.__data__;if(B){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return I.call(e,t)?e[t]:void 0},D.prototype.has=function(t){var e=this.__data__;return B?void 0!==e[t]:U.call(e,t)},D.prototype.set=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=B&&void 0===e?"__lodash_hash_undefined__":e,this};var W=Array.prototype.splice;function J(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}J.prototype.clear=function(){this.__data__=[],this.size=0},J.prototype.delete=function(t){var e=this.__data__,n=V(e,t);return!(n<0)&&(n==e.length-1?e.pop():W.call(e,n,1),--this.size,!0)},J.prototype.get=function(t){var e=this.__data__,n=V(e,t);return n<0?void 0:e[n][1]},J.prototype.has=function(t){return V(this.__data__,t)>-1},J.prototype.set=function(t,e){var n=this.__data__,r=V(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this};var G=M(o,"Map");function H(t,e){var n,r,o=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof e?"string":"hash"]:o.map}function K(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}K.prototype.clear=function(){this.size=0,this.__data__={hash:new D,map:new(G||J),string:new D}},K.prototype.delete=function(t){var e=H(this,t).delete(t);return this.size-=e?1:0,e},K.prototype.get=function(t){return H(this,t).get(t)},K.prototype.has=function(t){return H(this,t).has(t)},K.prototype.set=function(t,e){var n=H(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this};var Q="Expected a function";function X(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(Q);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var u=t.apply(this,r);return n.cache=i.set(o,u)||i,u};return n.cache=new(X.Cache||K),n}X.Cache=K;var Y,Z,tt,et=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,nt=/\\(\\)?/g,rt=(Y=function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(et,(function(t,n,r,o){e.push(r?o.replace(nt,"$1"):n||t)})),e},Z=X(Y,(function(t){return 500===tt.size&&tt.clear(),t})),tt=Z.cache,Z),ot=rt;var it=1/0,ut=i?i.prototype:void 0,ct=ut?ut.toString:void 0;function at(t){if("string"==typeof t)return t;if(e(t))return function(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}(t,at)+"";if(_(t))return ct?ct.call(t):"";var n=t+"";return"0"==n&&1/t==-it?"-0":n}function ft(t){return null==t?"":at(t)}function st(t,n){return e(t)?t:function(t,n){if(e(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!_(t))||j.test(t)||!d.test(t)||null!=n&&t in Object(n)}(t,n)?[t]:ot(ft(t))}var lt=1/0;function pt(t){if("string"==typeof t||_(t))return t;var e=t+"";return"0"==e&&1/t==-lt?"-0":e}function vt(t,e,n){var r=null==t?void 0:function(t,e){for(var n=0,r=(e=st(e,t)).length;null!=t&&n<r;)t=t[pt(e[n++])];return n&&n==r?t:void 0}(t,e);return void 0===r?n:r}var ht=function(){try{var t=M(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),yt=ht;var bt=Object.prototype.hasOwnProperty;function _t(t,e,n){var r=t[e];bt.call(t,e)&&R(r,n)&&(void 0!==n||e in t)||function(t,e,n){"__proto__"==e&&yt?yt(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}(t,e,n)}var dt=9007199254740991,jt=/^(?:0|[1-9]\d*)$/;function gt(t,e){var n=typeof t;return!!(e=null==e?dt:e)&&("number"==n||"symbol"!=n&&jt.test(t))&&t>-1&&t%1==0&&t<e}function mt(t,e,n){return null==t?t:function(t,e,n,r){if(!g(t))return t;for(var o=-1,i=(e=st(e,t)).length,u=i-1,c=t;null!=c&&++o<i;){var a=pt(e[o]),f=n;if("__proto__"===a||"constructor"===a||"prototype"===a)return t;if(o!=u){var s=c[a];void 0===(f=r?r(s,a,c):void 0)&&(f=g(s)?s:gt(e[o+1])?[]:{})}_t(c,a,f),c=c[a]}return t}(t,e,n)}function Ot(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););return t}var wt,xt=function(t,e,n){for(var r=-1,o=Object(t),i=n(t),u=i.length;u--;){var c=i[wt?u:++r];if(!1===e(o[c],c,o))break}return t};function At(t){return y(t)&&"[object Arguments]"==h(t)}var St=Object.prototype,zt=St.hasOwnProperty,Pt=St.propertyIsEnumerable,kt=At(function(){return arguments}())?At:function(t){return y(t)&&zt.call(t,"callee")&&!Pt.call(t,"callee")},Et=kt;var Tt="object"==typeof exports&&exports&&!exports.nodeType&&exports,Ft=Tt&&"object"==typeof module&&module&&!module.nodeType&&module,Nt=Ft&&Ft.exports===Tt?o.Buffer:void 0,Lt=(Nt?Nt.isBuffer:void 0)||function(){return!1},$t=9007199254740991;function Ct(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=$t}var qt={};qt["[object Float32Array]"]=qt["[object Float64Array]"]=qt["[object Int8Array]"]=qt["[object Int16Array]"]=qt["[object Int32Array]"]=qt["[object Uint8Array]"]=qt["[object Uint8ClampedArray]"]=qt["[object Uint16Array]"]=qt["[object Uint32Array]"]=!0,qt["[object Arguments]"]=qt["[object Array]"]=qt["[object ArrayBuffer]"]=qt["[object Boolean]"]=qt["[object DataView]"]=qt["[object Date]"]=qt["[object Error]"]=qt["[object Function]"]=qt["[object Map]"]=qt["[object Number]"]=qt["[object Object]"]=qt["[object RegExp]"]=qt["[object Set]"]=qt["[object String]"]=qt["[object WeakMap]"]=!1;var Mt="object"==typeof exports&&exports&&!exports.nodeType&&exports,Bt=Mt&&"object"==typeof module&&module&&!module.nodeType&&module,It=Bt&&Bt.exports===Mt&&n.process,Ut=function(){try{var t=Bt&&Bt.require&&Bt.require("util").types;return t||It&&It.binding&&It.binding("util")}catch(t){}}(),Dt=Ut&&Ut.isTypedArray,Rt=Dt?function(t){return function(e){return t(e)}}(Dt):function(t){return y(t)&&Ct(t.length)&&!!qt[h(t)]},Vt=Rt,Wt=Object.prototype.hasOwnProperty;function Jt(t,n){var r=e(t),o=!r&&Et(t),i=!r&&!o&&Lt(t),u=!r&&!o&&!i&&Vt(t),c=r||o||i||u,a=c?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],f=a.length;for(var s in t)!n&&!Wt.call(t,s)||c&&("length"==s||i&&("offset"==s||"parent"==s)||u&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||gt(s,f))||a.push(s);return a}var Gt=Object.prototype;var Ht=function(t,e){return function(n){return t(e(n))}}(Object.keys,Object),Kt=Ht,Qt=Object.prototype.hasOwnProperty;function Xt(t){if(n=(e=t)&&e.constructor,e!==("function"==typeof n&&n.prototype||Gt))return Kt(t);var e,n,r=[];for(var o in Object(t))Qt.call(t,o)&&"constructor"!=o&&r.push(o);return r}function Yt(t){return null!=t&&Ct(t.length)&&!A(t)}function Zt(t){return Yt(t)?Jt(t):Xt(t)}var te=function(t,e){return function(n,r){if(null==n)return n;if(!Yt(n))return t(n,r);for(var o=n.length,i=e?o:-1,u=Object(n);(e?i--:++i<o)&&!1!==r(u[i],i,u););return n}}((function(t,e){return t&&xt(t,e,Zt)})),ee=te;function ne(t){return t}function re(t,n){var r;return(e(t)?Ot:ee)(t,"function"==typeof(r=n)?r:ne)}function oe(){let t,e,n=new Promise((function(){t=arguments[0],e=arguments[1]}));return n.resolve=t,n.reject=e,n}var ie=/\s/;var ue=/^\s+/;function ce(t){return t?t.slice(0,function(t){for(var e=t.length;e--&&ie.test(t.charAt(e)););return e}(t)+1).replace(ue,""):t}var ae=NaN,fe=/^[-+]0x[0-9a-f]+$/i,se=/^0b[01]+$/i,le=/^0o[0-7]+$/i,pe=parseInt;function ve(t){if("number"==typeof t)return t;if(_(t))return ae;if(g(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=g(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=ce(t);var n=se.test(t);return n||le.test(t)?pe(t.slice(2),n?2:8):fe.test(t)?ae:+t}var he=1/0,ye=17976931348623157e292;function be(t){return t?(t=ve(t))===he||t===-he?(t<0?-1:1)*ye:t==t?t:0:0===t?t:0}function _e(t){var e=be(t),n=e%1;return e==e?n?e-n:e:0}function de(t){return"[object String]"===Object.prototype.toString.call(t)}function je(t){return!(!de(t)||""===t)}function ge(t){return t!=t}function me(t){let e=!1;if(je(t))e=!isNaN(Number(t));else if(function(t){return"[object Number]"===Object.prototype.toString.call(t)}(t)){if(ge(t))return!1;e=!0}return e}function Oe(t){if(!me(t))return 0;return be(t)}function we(t){return!!me(t)&&(t=Oe(t),"number"==typeof(e=t)&&e==_e(e));var e}var xe=o.isFinite,Ae=Math.min;var Se=function(t){var e=Math[t];return function(t,n){if(t=ve(t),(n=null==n?0:Ae(_e(n),292))&&xe(t)){var r=(ft(t)+"e").split("e");return+((r=(ft(e(r[0]+"e"+(+r[1]+n)))+"e").split("e"))[0]+"e"+(+r[1]-n))}return e(t)}}("round"),ze=Se;function Pe(t){if(!me(t))return 0;t=Oe(t);let e=ze(t);return"0"===String(e)?0:e}let ke="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),Ee=ke.length;function Te(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,e=[];var n;t=we(n=t)&&Pe(n)>0?Pe(t):32;for(let n=0;n<t;n++)e[n]=ke[0|Math.random()*Ee];return e.join("")}var Fe={};!function(t){var e=Object.prototype.hasOwnProperty,n="~";function r(){}function o(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function i(t,e,r,i,u){if("function"!=typeof r)throw new TypeError("The listener must be a function");var c=new o(r,i||t,u),a=n?n+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],c]:t._events[a].push(c):(t._events[a]=c,t._eventsCount++),t}function u(t,e){0==--t._eventsCount?t._events=new r:delete t._events[e]}function c(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),c.prototype.eventNames=function(){var t,r,o=[];if(0===this._eventsCount)return o;for(r in t=this._events)e.call(t,r)&&o.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(t)):o},c.prototype.listeners=function(t){var e=n?n+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,i=r.length,u=new Array(i);o<i;o++)u[o]=r[o].fn;return u},c.prototype.listenerCount=function(t){var e=n?n+t:t,r=this._events[e];return r?r.fn?1:r.length:0},c.prototype.emit=function(t,e,r,o,i,u){var c=n?n+t:t;if(!this._events[c])return!1;var a,f,s=this._events[c],l=arguments.length;if(s.fn){switch(s.once&&this.removeListener(t,s.fn,void 0,!0),l){case 1:return s.fn.call(s.context),!0;case 2:return s.fn.call(s.context,e),!0;case 3:return s.fn.call(s.context,e,r),!0;case 4:return s.fn.call(s.context,e,r,o),!0;case 5:return s.fn.call(s.context,e,r,o,i),!0;case 6:return s.fn.call(s.context,e,r,o,i,u),!0}for(f=1,a=new Array(l-1);f<l;f++)a[f-1]=arguments[f];s.fn.apply(s.context,a)}else{var p,v=s.length;for(f=0;f<v;f++)switch(s[f].once&&this.removeListener(t,s[f].fn,void 0,!0),l){case 1:s[f].fn.call(s[f].context);break;case 2:s[f].fn.call(s[f].context,e);break;case 3:s[f].fn.call(s[f].context,e,r);break;case 4:s[f].fn.call(s[f].context,e,r,o);break;default:if(!a)for(p=1,a=new Array(l-1);p<l;p++)a[p-1]=arguments[p];s[f].fn.apply(s[f].context,a)}}return!0},c.prototype.on=function(t,e,n){return i(this,t,e,n,!1)},c.prototype.once=function(t,e,n){return i(this,t,e,n,!0)},c.prototype.removeListener=function(t,e,r,o){var i=n?n+t:t;if(!this._events[i])return this;if(!e)return u(this,i),this;var c=this._events[i];if(c.fn)c.fn!==e||o&&!c.once||r&&c.context!==r||u(this,i);else{for(var a=0,f=[],s=c.length;a<s;a++)(c[a].fn!==e||o&&!c[a].once||r&&c[a].context!==r)&&f.push(c[a]);f.length?this._events[i]=1===f.length?f[0]:f:u(this,i)}return this},c.prototype.removeAllListeners=function(t){var e;return t?(e=n?n+t:t,this._events[e]&&u(this,e)):(this._events=new r,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=n,c.EventEmitter=c,t.exports=c}({get exports(){return Fe},set exports(t){Fe=t}});var Ne=Fe;function Le(t){let e=Object.prototype.toString.call(t);return"[object Function]"===e||"[object AsyncFunction]"===e}function $e(t){var e=this.__data__=new J(t);this.size=e.size}$e.prototype.clear=function(){this.__data__=new J,this.size=0},$e.prototype.delete=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n},$e.prototype.get=function(t){return this.__data__.get(t)},$e.prototype.has=function(t){return this.__data__.has(t)},$e.prototype.set=function(t,e){var n=this.__data__;if(n instanceof J){var r=n.__data__;if(!G||r.length<199)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new K(r)}return n.set(t,e),this.size=n.size,this};function Ce(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new K;++e<n;)this.add(t[e])}function qe(t,e){for(var n=-1,r=null==t?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}function Me(t,e){return t.has(e)}Ce.prototype.add=Ce.prototype.push=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this},Ce.prototype.has=function(t){return this.__data__.has(t)};var Be=1,Ie=2;function Ue(t,e,n,r,o,i){var u=n&Be,c=t.length,a=e.length;if(c!=a&&!(u&&a>c))return!1;var f=i.get(t),s=i.get(e);if(f&&s)return f==e&&s==t;var l=-1,p=!0,v=n&Ie?new Ce:void 0;for(i.set(t,e),i.set(e,t);++l<c;){var h=t[l],y=e[l];if(r)var b=u?r(y,h,l,e,t,i):r(h,y,l,t,e,i);if(void 0!==b){if(b)continue;p=!1;break}if(v){if(!qe(e,(function(t,e){if(!Me(v,e)&&(h===t||o(h,t,n,r,i)))return v.push(e)}))){p=!1;break}}else if(h!==y&&!o(h,y,n,r,i)){p=!1;break}}return i.delete(t),i.delete(e),p}var De=o.Uint8Array;function Re(t){var e=-1,n=Array(t.size);return t.forEach((function(t,r){n[++e]=[r,t]})),n}function Ve(t){var e=-1,n=Array(t.size);return t.forEach((function(t){n[++e]=t})),n}var We=1,Je=2,Ge="[object Boolean]",He="[object Date]",Ke="[object Error]",Qe="[object Map]",Xe="[object Number]",Ye="[object RegExp]",Ze="[object Set]",tn="[object String]",en="[object Symbol]",nn="[object ArrayBuffer]",rn="[object DataView]",on=i?i.prototype:void 0,un=on?on.valueOf:void 0;var cn=Object.prototype.propertyIsEnumerable,an=Object.getOwnPropertySymbols,fn=an?function(t){return null==t?[]:(t=Object(t),function(t,e){for(var n=-1,r=null==t?0:t.length,o=0,i=[];++n<r;){var u=t[n];e(u,n,t)&&(i[o++]=u)}return i}(an(t),(function(e){return cn.call(t,e)})))}:function(){return[]},sn=fn;function ln(t){return function(t,n,r){var o=n(t);return e(t)?o:function(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}(o,r(t))}(t,Zt,sn)}var pn=1,vn=Object.prototype.hasOwnProperty;var hn=M(o,"DataView"),yn=M(o,"Promise"),bn=M(o,"Set"),_n=M(o,"WeakMap"),dn="[object Map]",jn="[object Promise]",gn="[object Set]",mn="[object WeakMap]",On="[object DataView]",wn=E(hn),xn=E(G),An=E(yn),Sn=E(bn),zn=E(_n),Pn=h;(hn&&Pn(new hn(new ArrayBuffer(1)))!=On||G&&Pn(new G)!=dn||yn&&Pn(yn.resolve())!=jn||bn&&Pn(new bn)!=gn||_n&&Pn(new _n)!=mn)&&(Pn=function(t){var e=h(t),n="[object Object]"==e?t.constructor:void 0,r=n?E(n):"";if(r)switch(r){case wn:return On;case xn:return dn;case An:return jn;case Sn:return gn;case zn:return mn}return e});var kn=Pn,En=1,Tn="[object Arguments]",Fn="[object Array]",Nn="[object Object]",Ln=Object.prototype.hasOwnProperty;function $n(t,n,r,o,i,u){var c=e(t),a=e(n),f=c?Fn:kn(t),s=a?Fn:kn(n),l=(f=f==Tn?Nn:f)==Nn,p=(s=s==Tn?Nn:s)==Nn,v=f==s;if(v&&Lt(t)){if(!Lt(n))return!1;c=!0,l=!1}if(v&&!l)return u||(u=new $e),c||Vt(t)?Ue(t,n,r,o,i,u):function(t,e,n,r,o,i,u){switch(n){case rn:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case nn:return!(t.byteLength!=e.byteLength||!i(new De(t),new De(e)));case Ge:case He:case Xe:return R(+t,+e);case Ke:return t.name==e.name&&t.message==e.message;case Ye:case tn:return t==e+"";case Qe:var c=Re;case Ze:var a=r&We;if(c||(c=Ve),t.size!=e.size&&!a)return!1;var f=u.get(t);if(f)return f==e;r|=Je,u.set(t,e);var s=Ue(c(t),c(e),r,o,i,u);return u.delete(t),s;case en:if(un)return un.call(t)==un.call(e)}return!1}(t,n,f,r,o,i,u);if(!(r&En)){var h=l&&Ln.call(t,"__wrapped__"),y=p&&Ln.call(n,"__wrapped__");if(h||y){var b=h?t.value():t,_=y?n.value():n;return u||(u=new $e),i(b,_,r,o,u)}}return!!v&&(u||(u=new $e),function(t,e,n,r,o,i){var u=n&pn,c=ln(t),a=c.length;if(a!=ln(e).length&&!u)return!1;for(var f=a;f--;){var s=c[f];if(!(u?s in e:vn.call(e,s)))return!1}var l=i.get(t),p=i.get(e);if(l&&p)return l==e&&p==t;var v=!0;i.set(t,e),i.set(e,t);for(var h=u;++f<a;){var y=t[s=c[f]],b=e[s];if(r)var _=u?r(b,y,s,e,t,i):r(y,b,s,t,e,i);if(!(void 0===_?y===b||o(y,b,n,r,i):_)){v=!1;break}h||(h="constructor"==s)}if(v&&!h){var d=t.constructor,j=e.constructor;d==j||!("constructor"in t)||!("constructor"in e)||"function"==typeof d&&d instanceof d&&"function"==typeof j&&j instanceof j||(v=!1)}return i.delete(t),i.delete(e),v}(t,n,r,o,i,u))}function Cn(t,e,n,r,o){return t===e||(null==t||null==e||!y(t)&&!y(e)?t!=t&&e!=e:$n(t,e,n,r,Cn,o))}function qn(t){return"[object Array]"===Object.prototype.toString.call(t)}function Mn(t){if(function(t){return"[object Object]"===Object.prototype.toString.call(t)}(t)){for(let e in t)return!1;return!0}return!1}function Bn(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!Mn(t)||(!!function(t){return!(!de(t)||""!==t)}(t)||(!!function(t){return!!qn(t)&&0===t.length}(t)||!!ge(t)))))}return function(e){let n=oe(),r="",o={},i=0,u=new Ne;function c(){let n=oe(),o={},i=Te();r=i,e.url||(e.url="mqtt://localhost:8080"),e.token||(e.token="*");let c="topic|"+Te(),a=null;try{a=t.connect(e.url,{username:e.token})}catch(t){return s(),n.reject(),n}function f(t){!function(t,e){let n={qos:2,retain:!1};a.connected&&a.publish(t,JSON.stringify(e),n)}(c,t)}function l(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=oe(),o=Te();return f({token:e.token,_id:o,func:t,input:n}),u.on(o,(function(t){r.resolve(t),u.removeAllListeners(o)})),r}return a.on("connect",(function(){r===i?(Le(e.open)&&e.open(),function(t){let e=oe();return a.connected?a.subscribe(t,{qos:2},(function(t){t?e.reject("subscribe error: no send"):e.resolve()})):e.reject("subscribe error: no connect"),e}(c).then((function(){return l("getFuncs",null)})).catch((function(t){Le(e.error)&&e.error(t)}))):a.end()})),a.on("message",(function(t,e){if(r===i){let t=function(t){if(!je(t))return{};let e={};try{e=JSON.parse(t)}catch(t){e={}}return e}(e.toString("utf8"));if("sys"===vt(t,"output.sys")&&vt(t,"output.funcs")){let e=t.output.funcs;for(let t=0;t<e.length;t++){let n=e[t];mt(o,n,(function(t){return l(n,t)}))}n.resolve(o)}if(vt(t,"_id")&&vt(t,"output")){let e=vt(t,"_id"),n=vt(t,"output");u.emit(e,n)}}else a.end()})),a.on("reconnect",(function(){})),a.on("offline",(function(){a.end(),Le(e.close)&&e.close(),s()})),a.on("error",(function(t){Le(e.error)&&e.error(t)})),n}function a(t){if(0===i)i++,o=t,n.resolve(o);else{let e=Zt(o),n=Zt(t);re(n,(function(e){o[e]=t[e]})),re(e,(function(t){(function(t,e){function n(t){return qn(t)?t:[t]}if(Bn(t))return!1;if(0===(t=n(t)).length)return!1;if(Bn(t))return!1;if(0===(e=n(e)).length)return!1;for(let n=0;n<t.length;n++)for(let i=0;i<e.length;i++)if(r=t[n],o=e[i],Cn(r,o))return!0;var r,o;return!1})(n,t)||delete o[t]}))}}function f(){(new c).then((function(t){a(t)})).catch((function(){}))}function s(){setTimeout((function(){Le(e.reconn)&&e.reconn(),f()}),5e3)}return f(),n}}));
//# sourceMappingURL=w-comor-mqtt-client.umd.js.map
