/*!
 * w-comor-mqtt-server v1.0.21
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("mosca")):"function"==typeof define&&define.amd?define(["mosca"],r):(t=t||self)["w-comor-mqtt-server"]=r(t.mosca)}(this,(function(t){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t=t&&t.hasOwnProperty("default")?t.default:t;var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t,r){return t(r={exports:{}},r.exports),r.exports}var o=n((function(t){var e=function(t){var e,n=Object.prototype,o=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function f(t,r,e,n){var o=r&&r.prototype instanceof b?r:b,a=Object.create(o.prototype),i=new L(n||[]);return a._invoke=function(t,r,e){var n=l;return function(o,a){if(n===v)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw a;return k()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=A(i,e);if(c){if(c===y)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===l)throw n=h,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=v;var u=s(t,r,e);if("normal"===u.type){if(n=e.done?h:p,u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=h,e.method="throw",e.arg=u.arg)}}}(t,e,i),a}function s(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var l="suspendedStart",p="suspendedYield",v="executing",h="completed",y={};function b(){}function d(){}function j(){}var g={};g[i]=function(){return this};var _=Object.getPrototypeOf,w=_&&_(_(P([])));w&&w!==n&&o.call(w,i)&&(g=w);var m=j.prototype=b.prototype=Object.create(g);function O(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function x(t){var e;this._invoke=function(n,a){function i(){return new Promise((function(e,i){!function e(n,a,i,c){var u=s(t[n],t,a);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"===r(l)&&o.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,i,c)}),(function(t){e("throw",t,i,c)})):Promise.resolve(l).then((function(t){f.value=t,i(f)}),(function(t){return e("throw",t,i,c)}))}c(u.arg)}(n,a,e,i)}))}return e=e?e.then(i,i):i()}}function A(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,A(t,r),"throw"===r.method))return y;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=s(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function S(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function E(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function P(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function r(){for(;++n<t.length;)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:k}}function k(){return{value:e,done:!0}}return d.prototype=m.constructor=j,j.constructor=d,j[u]=d.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===d||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},O(x.prototype),x.prototype[c]=function(){return this},t.AsyncIterator=x,t.async=function(r,e,n,o){var a=new x(f(r,e,n,o));return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(m),m[u]="Generator",m[i]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=P,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),f=o.call(i,"finallyLoc");if(u&&f){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),E(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;E(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));function a(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}var i=function(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function c(t){a(i,n,o,c,u,"next",t)}function u(t){a(i,n,o,c,u,"throw",t)}c(void 0)}))}};var c=function(){this.__data__=[],this.size=0};var u=function(t,r){return t===r||t!=t&&r!=r};var f=function(t,r){for(var e=t.length;e--;)if(u(t[e][0],r))return e;return-1},s=Array.prototype.splice;var l=function(t){var r=this.__data__,e=f(r,t);return!(e<0)&&(e==r.length-1?r.pop():s.call(r,e,1),--this.size,!0)};var p=function(t){var r=this.__data__,e=f(r,t);return e<0?void 0:r[e][1]};var v=function(t){return f(this.__data__,t)>-1};var h=function(t,r){var e=this.__data__,n=f(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this};function y(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}y.prototype.clear=c,y.prototype.delete=l,y.prototype.get=p,y.prototype.has=v,y.prototype.set=h;var b=y;var d=function(){this.__data__=new b,this.size=0};var j=function(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e};var g=function(t){return this.__data__.get(t)};var _=function(t){return this.__data__.has(t)},w="object"==r(e)&&e&&e.Object===Object&&e,m="object"==("undefined"==typeof self?"undefined":r(self))&&self&&self.Object===Object&&self,O=w||m||Function("return this")(),x=O.Symbol,A=Object.prototype,S=A.hasOwnProperty,E=A.toString,L=x?x.toStringTag:void 0;var P=function(t){var r=S.call(t,L),e=t[L];try{t[L]=void 0;var n=!0}catch(t){}var o=E.call(t);return n&&(r?t[L]=e:delete t[L]),o},k=Object.prototype.toString;var F=function(t){return k.call(t)},z="[object Null]",I="[object Undefined]",T=x?x.toStringTag:void 0;var C=function(t){return null==t?void 0===t?I:z:T&&T in Object(t)?P(t):F(t)};var U=function(t){var e=r(t);return null!=t&&("object"==e||"function"==e)},N="[object AsyncFunction]",M="[object Function]",$="[object GeneratorFunction]",B="[object Proxy]";var D,G=function(t){if(!U(t))return!1;var r=C(t);return r==M||r==$||r==N||r==B},W=O["__core-js_shared__"],q=(D=/[^.]+$/.exec(W&&W.keys&&W.keys.IE_PROTO||""))?"Symbol(src)_1."+D:"";var R=function(t){return!!q&&q in t},V=Function.prototype.toString;var J=function(t){if(null!=t){try{return V.call(t)}catch(t){}try{return t+""}catch(t){}}return""},Y=/^\[object .+?Constructor\]$/,H=Function.prototype,K=Object.prototype,Q=H.toString,X=K.hasOwnProperty,Z=RegExp("^"+Q.call(X).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var tt=function(t){return!(!U(t)||R(t))&&(G(t)?Z:Y).test(J(t))};var rt=function(t,r){return null==t?void 0:t[r]};var et=function(t,r){var e=rt(t,r);return tt(e)?e:void 0},nt=et(O,"Map"),ot=et(Object,"create");var at=function(){this.__data__=ot?ot(null):{},this.size=0};var it=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},ct="__lodash_hash_undefined__",ut=Object.prototype.hasOwnProperty;var ft=function(t){var r=this.__data__;if(ot){var e=r[t];return e===ct?void 0:e}return ut.call(r,t)?r[t]:void 0},st=Object.prototype.hasOwnProperty;var lt=function(t){var r=this.__data__;return ot?void 0!==r[t]:st.call(r,t)},pt="__lodash_hash_undefined__";var vt=function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=ot&&void 0===r?pt:r,this};function ht(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}ht.prototype.clear=at,ht.prototype.delete=it,ht.prototype.get=ft,ht.prototype.has=lt,ht.prototype.set=vt;var yt=ht;var bt=function(){this.size=0,this.__data__={hash:new yt,map:new(nt||b),string:new yt}};var dt=function(t){var e=r(t);return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var jt=function(t,r){var e=t.__data__;return dt(r)?e["string"==typeof r?"string":"hash"]:e.map};var gt=function(t){var r=jt(this,t).delete(t);return this.size-=r?1:0,r};var _t=function(t){return jt(this,t).get(t)};var wt=function(t){return jt(this,t).has(t)};var mt=function(t,r){var e=jt(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this};function Ot(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}Ot.prototype.clear=bt,Ot.prototype.delete=gt,Ot.prototype.get=_t,Ot.prototype.has=wt,Ot.prototype.set=mt;var xt=Ot,At=200;var St=function(t,r){var e=this.__data__;if(e instanceof b){var n=e.__data__;if(!nt||n.length<At-1)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new xt(n)}return e.set(t,r),this.size=e.size,this};function Et(t){var r=this.__data__=new b(t);this.size=r.size}Et.prototype.clear=d,Et.prototype.delete=j,Et.prototype.get=g,Et.prototype.has=_,Et.prototype.set=St;var Lt=Et;var Pt=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t},kt=function(){try{var t=et(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Ft=function(t,r,e){"__proto__"==r&&kt?kt(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e},zt=Object.prototype.hasOwnProperty;var It=function(t,r,e){var n=t[r];zt.call(t,r)&&u(n,e)&&(void 0!==e||r in t)||Ft(t,r,e)};var Tt=function(t,r,e,n){var o=!e;e||(e={});for(var a=-1,i=r.length;++a<i;){var c=r[a],u=n?n(e[c],t[c],c,e,t):void 0;void 0===u&&(u=t[c]),o?Ft(e,c,u):It(e,c,u)}return e};var Ct=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n};var Ut=function(t){return null!=t&&"object"==r(t)},Nt="[object Arguments]";var Mt=function(t){return Ut(t)&&C(t)==Nt},$t=Object.prototype,Bt=$t.hasOwnProperty,Dt=$t.propertyIsEnumerable,Gt=Mt(function(){return arguments}())?Mt:function(t){return Ut(t)&&Bt.call(t,"callee")&&!Dt.call(t,"callee")},Wt=Array.isArray;var qt=function(){return!1},Rt=n((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?O.Buffer:void 0,a=(o?o.isBuffer:void 0)||qt;t.exports=a})),Vt=9007199254740991,Jt=/^(?:0|[1-9]\d*)$/;var Yt=function(t,e){var n=r(t);return!!(e=null==e?Vt:e)&&("number"==n||"symbol"!=n&&Jt.test(t))&&t>-1&&t%1==0&&t<e},Ht=9007199254740991;var Kt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=Ht},Qt={};Qt["[object Float32Array]"]=Qt["[object Float64Array]"]=Qt["[object Int8Array]"]=Qt["[object Int16Array]"]=Qt["[object Int32Array]"]=Qt["[object Uint8Array]"]=Qt["[object Uint8ClampedArray]"]=Qt["[object Uint16Array]"]=Qt["[object Uint32Array]"]=!0,Qt["[object Arguments]"]=Qt["[object Array]"]=Qt["[object ArrayBuffer]"]=Qt["[object Boolean]"]=Qt["[object DataView]"]=Qt["[object Date]"]=Qt["[object Error]"]=Qt["[object Function]"]=Qt["[object Map]"]=Qt["[object Number]"]=Qt["[object Object]"]=Qt["[object RegExp]"]=Qt["[object Set]"]=Qt["[object String]"]=Qt["[object WeakMap]"]=!1;var Xt=function(t){return Ut(t)&&Kt(t.length)&&!!Qt[C(t)]};var Zt=function(t){return function(r){return t(r)}},tr=n((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e&&w.process,a=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=a})),rr=tr&&tr.isTypedArray,er=rr?Zt(rr):Xt,nr=Object.prototype.hasOwnProperty;var or=function(t,r){var e=Wt(t),n=!e&&Gt(t),o=!e&&!n&&Rt(t),a=!e&&!n&&!o&&er(t),i=e||n||o||a,c=i?Ct(t.length,String):[],u=c.length;for(var f in t)!r&&!nr.call(t,f)||i&&("length"==f||o&&("offset"==f||"parent"==f)||a&&("buffer"==f||"byteLength"==f||"byteOffset"==f)||Yt(f,u))||c.push(f);return c},ar=Object.prototype;var ir=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||ar)};var cr=function(t,r){return function(e){return t(r(e))}},ur=cr(Object.keys,Object),fr=Object.prototype.hasOwnProperty;var sr=function(t){if(!ir(t))return ur(t);var r=[];for(var e in Object(t))fr.call(t,e)&&"constructor"!=e&&r.push(e);return r};var lr=function(t){return null!=t&&Kt(t.length)&&!G(t)};var pr=function(t){return lr(t)?or(t):sr(t)};var vr=function(t,r){return t&&Tt(r,pr(r),t)};var hr=function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r},yr=Object.prototype.hasOwnProperty;var br=function(t){if(!U(t))return hr(t);var r=ir(t),e=[];for(var n in t)("constructor"!=n||!r&&yr.call(t,n))&&e.push(n);return e};var dr=function(t){return lr(t)?or(t,!0):br(t)};var jr=function(t,r){return t&&Tt(r,dr(r),t)},gr=n((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?O.Buffer:void 0,a=o?o.allocUnsafe:void 0;t.exports=function(t,r){if(r)return t.slice();var e=t.length,n=a?a(e):new t.constructor(e);return t.copy(n),n}}));var _r=function(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r};var wr=function(t,r){for(var e=-1,n=null==t?0:t.length,o=0,a=[];++e<n;){var i=t[e];r(i,e,t)&&(a[o++]=i)}return a};var mr=function(){return[]},Or=Object.prototype.propertyIsEnumerable,xr=Object.getOwnPropertySymbols,Ar=xr?function(t){return null==t?[]:(t=Object(t),wr(xr(t),(function(r){return Or.call(t,r)})))}:mr;var Sr=function(t,r){return Tt(t,Ar(t),r)};var Er=function(t,r){for(var e=-1,n=r.length,o=t.length;++e<n;)t[o+e]=r[e];return t},Lr=cr(Object.getPrototypeOf,Object),Pr=Object.getOwnPropertySymbols?function(t){for(var r=[];t;)Er(r,Ar(t)),t=Lr(t);return r}:mr;var kr=function(t,r){return Tt(t,Pr(t),r)};var Fr=function(t,r,e){var n=r(t);return Wt(t)?n:Er(n,e(t))};var zr=function(t){return Fr(t,pr,Ar)};var Ir=function(t){return Fr(t,dr,Pr)},Tr=et(O,"DataView"),Cr=et(O,"Promise"),Ur=et(O,"Set"),Nr=et(O,"WeakMap"),Mr=J(Tr),$r=J(nt),Br=J(Cr),Dr=J(Ur),Gr=J(Nr),Wr=C;(Tr&&"[object DataView]"!=Wr(new Tr(new ArrayBuffer(1)))||nt&&"[object Map]"!=Wr(new nt)||Cr&&"[object Promise]"!=Wr(Cr.resolve())||Ur&&"[object Set]"!=Wr(new Ur)||Nr&&"[object WeakMap]"!=Wr(new Nr))&&(Wr=function(t){var r=C(t),e="[object Object]"==r?t.constructor:void 0,n=e?J(e):"";if(n)switch(n){case Mr:return"[object DataView]";case $r:return"[object Map]";case Br:return"[object Promise]";case Dr:return"[object Set]";case Gr:return"[object WeakMap]"}return r});var qr=Wr,Rr=Object.prototype.hasOwnProperty;var Vr=function(t){var r=t.length,e=new t.constructor(r);return r&&"string"==typeof t[0]&&Rr.call(t,"index")&&(e.index=t.index,e.input=t.input),e},Jr=O.Uint8Array;var Yr=function(t){var r=new t.constructor(t.byteLength);return new Jr(r).set(new Jr(t)),r};var Hr=function(t,r){var e=r?Yr(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)},Kr=/\w*$/;var Qr=function(t){var r=new t.constructor(t.source,Kr.exec(t));return r.lastIndex=t.lastIndex,r},Xr=x?x.prototype:void 0,Zr=Xr?Xr.valueOf:void 0;var te=function(t){return Zr?Object(Zr.call(t)):{}};var re=function(t,r){var e=r?Yr(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)},ee="[object Boolean]",ne="[object Date]",oe="[object Map]",ae="[object Number]",ie="[object RegExp]",ce="[object Set]",ue="[object String]",fe="[object Symbol]",se="[object ArrayBuffer]",le="[object DataView]",pe="[object Float32Array]",ve="[object Float64Array]",he="[object Int8Array]",ye="[object Int16Array]",be="[object Int32Array]",de="[object Uint8Array]",je="[object Uint8ClampedArray]",ge="[object Uint16Array]",_e="[object Uint32Array]";var we=function(t,r,e){var n=t.constructor;switch(r){case se:return Yr(t);case ee:case ne:return new n(+t);case le:return Hr(t,e);case pe:case ve:case he:case ye:case be:case de:case je:case ge:case _e:return re(t,e);case oe:return new n;case ae:case ue:return new n(t);case ie:return Qr(t);case ce:return new n;case fe:return te(t)}},me=Object.create,Oe=function(){function t(){}return function(r){if(!U(r))return{};if(me)return me(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();var xe=function(t){return"function"!=typeof t.constructor||ir(t)?{}:Oe(Lr(t))},Ae="[object Map]";var Se=function(t){return Ut(t)&&qr(t)==Ae},Ee=tr&&tr.isMap,Le=Ee?Zt(Ee):Se,Pe="[object Set]";var ke=function(t){return Ut(t)&&qr(t)==Pe},Fe=tr&&tr.isSet,ze=Fe?Zt(Fe):ke,Ie=1,Te=2,Ce=4,Ue="[object Arguments]",Ne="[object Function]",Me="[object GeneratorFunction]",$e="[object Object]",Be={};Be[Ue]=Be["[object Array]"]=Be["[object ArrayBuffer]"]=Be["[object DataView]"]=Be["[object Boolean]"]=Be["[object Date]"]=Be["[object Float32Array]"]=Be["[object Float64Array]"]=Be["[object Int8Array]"]=Be["[object Int16Array]"]=Be["[object Int32Array]"]=Be["[object Map]"]=Be["[object Number]"]=Be[$e]=Be["[object RegExp]"]=Be["[object Set]"]=Be["[object String]"]=Be["[object Symbol]"]=Be["[object Uint8Array]"]=Be["[object Uint8ClampedArray]"]=Be["[object Uint16Array]"]=Be["[object Uint32Array]"]=!0,Be["[object Error]"]=Be[Ne]=Be["[object WeakMap]"]=!1;var De=function t(r,e,n,o,a,i){var c,u=e&Ie,f=e&Te,s=e&Ce;if(n&&(c=a?n(r,o,a,i):n(r)),void 0!==c)return c;if(!U(r))return r;var l=Wt(r);if(l){if(c=Vr(r),!u)return _r(r,c)}else{var p=qr(r),v=p==Ne||p==Me;if(Rt(r))return gr(r,u);if(p==$e||p==Ue||v&&!a){if(c=f||v?{}:xe(r),!u)return f?kr(r,jr(c,r)):Sr(r,vr(c,r))}else{if(!Be[p])return a?r:{};c=we(r,p,u)}}i||(i=new Lt);var h=i.get(r);if(h)return h;i.set(r,c),ze(r)?r.forEach((function(o){c.add(t(o,e,n,o,r,i))})):Le(r)&&r.forEach((function(o,a){c.set(a,t(o,e,n,a,r,i))}));var y=s?f?Ir:zr:f?keysIn:pr,b=l?void 0:y(r);return Pt(b||r,(function(o,a){b&&(o=r[a=o]),It(c,a,t(o,e,n,a,r,i))})),c},Ge=1,We=4;var qe=function(t){return De(t,Ge|We)},Re="[object Symbol]";var Ve=function(t){return"symbol"==r(t)||Ut(t)&&C(t)==Re},Je=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ye=/^\w*$/;var He=function(t,e){if(Wt(t))return!1;var n=r(t);return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!Ve(t))||(Ye.test(t)||!Je.test(t)||null!=e&&t in Object(e))},Ke="Expected a function";function Qe(t,r){if("function"!=typeof t||null!=r&&"function"!=typeof r)throw new TypeError(Ke);var e=function e(){var n=arguments,o=r?r.apply(this,n):n[0],a=e.cache;if(a.has(o))return a.get(o);var i=t.apply(this,n);return e.cache=a.set(o,i)||a,i};return e.cache=new(Qe.Cache||xt),e}Qe.Cache=xt;var Xe=Qe,Ze=500;var tn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,rn=/\\(\\)?/g,en=function(t){var r=Xe(t,(function(t){return e.size===Ze&&e.clear(),t})),e=r.cache;return r}((function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(tn,(function(t,e,n,o){r.push(n?o.replace(rn,"$1"):e||t)})),r}));var nn=function(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o},on=1/0,an=x?x.prototype:void 0,cn=an?an.toString:void 0;var un=function t(r){if("string"==typeof r)return r;if(Wt(r))return nn(r,t)+"";if(Ve(r))return cn?cn.call(r):"";var e=r+"";return"0"==e&&1/r==-on?"-0":e};var fn=function(t){return null==t?"":un(t)};var sn=function(t,r){return Wt(t)?t:He(t,r)?[t]:en(fn(t))},ln=1/0;var pn=function(t){if("string"==typeof t||Ve(t))return t;var r=t+"";return"0"==r&&1/t==-ln?"-0":r};var vn=function(t,r){for(var e=0,n=(r=sn(r,t)).length;null!=t&&e<n;)t=t[pn(r[e++])];return e&&e==n?t:void 0};var hn=function(t,r,e){var n=null==t?void 0:vn(t,r);return void 0===n?e:n};function yn(t){return"[object Object]"===Object.prototype.toString.call(t)}function bn(t){return"[object String]"===Object.prototype.toString.call(t)}function dn(t){return!(!bn(t)||""===t)}function jn(t){var r=Object.prototype.toString.call(t);return"[object Function]"===r||"[object AsyncFunction]"===r}function gn(t){return"[object Array]"===Object.prototype.toString.call(t)}function _n(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!function(t){if(yn(t)){for(var r in t)return!1;return!0}return!1}(t)||(!!function(t){return!(!bn(t)||""!==t)}(t)||!!function(t){return!!gn(t)&&0===t.length}(t))))}function wn(t){return!!gn(t)&&(0!==t.length&&(1!==t.length||!_n(t[0])))}function mn(t,r){if(dn(t))t=[t];else if(!wn(t))return!1;if(dn(r))r=[r];else if(!wn(r))return!1;for(var e=0;e<t.length;e++)for(var n=0;n<r.length;n++)if(t[e]===r[n])return!0;return!1}return function(r){(r=qe(r)).port||(r.port=8080),r.portWeb||(r.portWeb=r.port+10);var e,n,a=[];function c(t){var e,n,o,a=((o=new Promise((function(){e=arguments[0],n=arguments[1]}))).resolve=e,o.reject=n,o);return jn(r.authenticate)?r.authenticate(t).then((function(t){a.resolve(t)})):a.resolve(!0),a}n="funcs",yn(e=r)&&dn(n)&&n in e&&(a=pr(r.funcs));var u={port:r.port,http:{port:r.portWeb,bundle:!0,static:"./"}},f=new t.Server(u),s=[];function l(t,r){var e={topic:t,payload:JSON.stringify(r),qos:2,retain:!1};f.publish(e,(function(t){t&&console.log("publish: error:",t)}))}function p(){return(p=i(o.mark((function t(e,n){var i,u,f,s;return o.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=hn(n,"token",""),t.next=3,c(i);case 3:if(!t.sent){t.next=25;break}if(u=hn(n,"func",""),f=hn(n,"input"),"getFuncs"!==u){t.next=15;break}if(!jn(r.filterFuncs)){t.next=12;break}return t.next=11,r.filterFuncs(i,a);case 11:a=t.sent;case 12:n.output={sys:"sys",funcs:a},t.next=23;break;case 15:if(!mn(a,u)){t.next=22;break}return t.next=18,r.funcs[u](f);case 18:s=t.sent,n.output=s,t.next=23;break;case 22:n.output={err:"can not find: ".concat(u)};case 23:t.next=26;break;case 25:n.output={err:"can not authenticate token: ".concat(i)};case 26:delete n.input,l(e,n);case 28:case"end":return t.stop()}}),t)})))).apply(this,arguments)}f.on("clientConnected",(function(t){s.push(t),jn(r.onClientChange)&&r.onClientChange(s,r)})),f.on("clientDisconnected",(function(t){s=s.filter((function(r){return r!==t})),jn(r.onClientChange)&&r.onClientChange(s,r)})),f.on("published",(function(t,r){var e=t.topic,n=t.payload.toString("utf8");n.indexOf('"output"')>=0||e.indexOf("topic|")>=0&&function(t,r){p.apply(this,arguments)}(e,function(t){if(!dn(t))return{};var r={};try{r=JSON.parse(t)}catch(t){r={}}return r}(n))})),f.on("ready",(function(){f.authenticate=function(){var t=i(o.mark((function t(r,e,n,a){var i,u;return o.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=e,t.next=3,c(i);case 3:u=t.sent,a(null,u);case 5:case"end":return t.stop()}}),t)})));return function(r,e,n,o){return t.apply(this,arguments)}}(),console.log("Server running at: mqtt://localhost:".concat(r.port," and [web] mqtt://localhost:").concat(r.portWeb))}))}}));
//# sourceMappingURL=w-comor-mqtt-server.umd.js.map
