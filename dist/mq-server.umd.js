/*!
 * mq-server v1.0.20
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("mosca")):"function"==typeof define&&define.amd?define(["mosca"],r):(t=t||self)["mq-server"]=r(t.mosca)}(this,(function(t){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t=t&&t.hasOwnProperty("default")?t.default:t;var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t,r){return t(r={exports:{}},r.exports),r.exports}var o=n((function(t){var e=function(t){var e,n=Object.prototype,o=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function f(t,r,e,n){var o=r&&r.prototype instanceof b?r:b,a=Object.create(o.prototype),i=new L(n||[]);return a._invoke=function(t,r,e){var n=l;return function(o,a){if(n===v)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw a;return k()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=S(i,e);if(c){if(c===y)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===l)throw n=h,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=v;var u=s(t,r,e);if("normal"===u.type){if(n=e.done?h:p,u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=h,e.method="throw",e.arg=u.arg)}}}(t,e,i),a}function s(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var l="suspendedStart",p="suspendedYield",v="executing",h="completed",y={};function b(){}function d(){}function j(){}var g={};g[i]=function(){return this};var _=Object.getPrototypeOf,w=_&&_(_(P([])));w&&w!==n&&o.call(w,i)&&(g=w);var m=j.prototype=b.prototype=Object.create(g);function O(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function x(t){var e;this._invoke=function(n,a){function i(){return new Promise((function(e,i){!function e(n,a,i,c){var u=s(t[n],t,a);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"===r(l)&&o.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,i,c)}),(function(t){e("throw",t,i,c)})):Promise.resolve(l).then((function(t){f.value=t,i(f)}),(function(t){return e("throw",t,i,c)}))}c(u.arg)}(n,a,e,i)}))}return e=e?e.then(i,i):i()}}function S(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,S(t,r),"throw"===r.method))return y;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=s(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function A(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function E(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function P(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function r(){for(;++n<t.length;)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:k}}function k(){return{value:e,done:!0}}return d.prototype=m.constructor=j,j.constructor=d,j[u]=d.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===d||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},O(x.prototype),x.prototype[c]=function(){return this},t.AsyncIterator=x,t.async=function(r,e,n,o){var a=new x(f(r,e,n,o));return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(m),m[u]="Generator",m[i]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=P,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),f=o.call(i,"finallyLoc");if(u&&f){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),E(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;E(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));var a=function(){this.__data__=[],this.size=0};var i=function(t,r){return t===r||t!=t&&r!=r};var c=function(t,r){for(var e=t.length;e--;)if(i(t[e][0],r))return e;return-1},u=Array.prototype.splice;var f=function(t){var r=this.__data__,e=c(r,t);return!(e<0)&&(e==r.length-1?r.pop():u.call(r,e,1),--this.size,!0)};var s=function(t){var r=this.__data__,e=c(r,t);return e<0?void 0:r[e][1]};var l=function(t){return c(this.__data__,t)>-1};var p=function(t,r){var e=this.__data__,n=c(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this};function v(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}v.prototype.clear=a,v.prototype.delete=f,v.prototype.get=s,v.prototype.has=l,v.prototype.set=p;var h=v;var y=function(){this.__data__=new h,this.size=0};var b=function(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e};var d=function(t){return this.__data__.get(t)};var j=function(t){return this.__data__.has(t)},g="object"==r(e)&&e&&e.Object===Object&&e,_="object"==("undefined"==typeof self?"undefined":r(self))&&self&&self.Object===Object&&self,w=g||_||Function("return this")(),m=w.Symbol,O=Object.prototype,x=O.hasOwnProperty,S=O.toString,A=m?m.toStringTag:void 0;var E=function(t){var r=x.call(t,A),e=t[A];try{t[A]=void 0;var n=!0}catch(t){}var o=S.call(t);return n&&(r?t[A]=e:delete t[A]),o},L=Object.prototype.toString;var P=function(t){return L.call(t)},k="[object Null]",F="[object Undefined]",z=m?m.toStringTag:void 0;var N=function(t){return null==t?void 0===t?F:k:z&&z in Object(t)?E(t):P(t)};var I=function(t){var e=r(t);return null!=t&&("object"==e||"function"==e)},T="[object AsyncFunction]",C="[object Function]",U="[object GeneratorFunction]",M="[object Proxy]";var $,B=function(t){if(!I(t))return!1;var r=N(t);return r==C||r==U||r==T||r==M},D=w["__core-js_shared__"],G=($=/[^.]+$/.exec(D&&D.keys&&D.keys.IE_PROTO||""))?"Symbol(src)_1."+$:"";var W=function(t){return!!G&&G in t},q=Function.prototype.toString;var R=function(t){if(null!=t){try{return q.call(t)}catch(t){}try{return t+""}catch(t){}}return""},V=/^\[object .+?Constructor\]$/,J=Function.prototype,Y=Object.prototype,H=J.toString,K=Y.hasOwnProperty,Q=RegExp("^"+H.call(K).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var X=function(t){return!(!I(t)||W(t))&&(B(t)?Q:V).test(R(t))};var Z=function(t,r){return null==t?void 0:t[r]};var tt=function(t,r){var e=Z(t,r);return X(e)?e:void 0},rt=tt(w,"Map"),et=tt(Object,"create");var nt=function(){this.__data__=et?et(null):{},this.size=0};var ot=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},at="__lodash_hash_undefined__",it=Object.prototype.hasOwnProperty;var ct=function(t){var r=this.__data__;if(et){var e=r[t];return e===at?void 0:e}return it.call(r,t)?r[t]:void 0},ut=Object.prototype.hasOwnProperty;var ft=function(t){var r=this.__data__;return et?void 0!==r[t]:ut.call(r,t)},st="__lodash_hash_undefined__";var lt=function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=et&&void 0===r?st:r,this};function pt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}pt.prototype.clear=nt,pt.prototype.delete=ot,pt.prototype.get=ct,pt.prototype.has=ft,pt.prototype.set=lt;var vt=pt;var ht=function(){this.size=0,this.__data__={hash:new vt,map:new(rt||h),string:new vt}};var yt=function(t){var e=r(t);return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var bt=function(t,r){var e=t.__data__;return yt(r)?e["string"==typeof r?"string":"hash"]:e.map};var dt=function(t){var r=bt(this,t).delete(t);return this.size-=r?1:0,r};var jt=function(t){return bt(this,t).get(t)};var gt=function(t){return bt(this,t).has(t)};var _t=function(t,r){var e=bt(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this};function wt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}wt.prototype.clear=ht,wt.prototype.delete=dt,wt.prototype.get=jt,wt.prototype.has=gt,wt.prototype.set=_t;var mt=wt,Ot=200;var xt=function(t,r){var e=this.__data__;if(e instanceof h){var n=e.__data__;if(!rt||n.length<Ot-1)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new mt(n)}return e.set(t,r),this.size=e.size,this};function St(t){var r=this.__data__=new h(t);this.size=r.size}St.prototype.clear=y,St.prototype.delete=b,St.prototype.get=d,St.prototype.has=j,St.prototype.set=xt;var At=St;var Et=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t},Lt=function(){try{var t=tt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var Pt=function(t,r,e){"__proto__"==r&&Lt?Lt(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e},kt=Object.prototype.hasOwnProperty;var Ft=function(t,r,e){var n=t[r];kt.call(t,r)&&i(n,e)&&(void 0!==e||r in t)||Pt(t,r,e)};var zt=function(t,r,e,n){var o=!e;e||(e={});for(var a=-1,i=r.length;++a<i;){var c=r[a],u=n?n(e[c],t[c],c,e,t):void 0;void 0===u&&(u=t[c]),o?Pt(e,c,u):Ft(e,c,u)}return e};var Nt=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n};var It=function(t){return null!=t&&"object"==r(t)},Tt="[object Arguments]";var Ct=function(t){return It(t)&&N(t)==Tt},Ut=Object.prototype,Mt=Ut.hasOwnProperty,$t=Ut.propertyIsEnumerable,Bt=Ct(function(){return arguments}())?Ct:function(t){return It(t)&&Mt.call(t,"callee")&&!$t.call(t,"callee")},Dt=Array.isArray;var Gt=function(){return!1},Wt=n((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?w.Buffer:void 0,a=(o?o.isBuffer:void 0)||Gt;t.exports=a})),qt=9007199254740991,Rt=/^(?:0|[1-9]\d*)$/;var Vt=function(t,e){var n=r(t);return!!(e=null==e?qt:e)&&("number"==n||"symbol"!=n&&Rt.test(t))&&t>-1&&t%1==0&&t<e},Jt=9007199254740991;var Yt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=Jt},Ht={};Ht["[object Float32Array]"]=Ht["[object Float64Array]"]=Ht["[object Int8Array]"]=Ht["[object Int16Array]"]=Ht["[object Int32Array]"]=Ht["[object Uint8Array]"]=Ht["[object Uint8ClampedArray]"]=Ht["[object Uint16Array]"]=Ht["[object Uint32Array]"]=!0,Ht["[object Arguments]"]=Ht["[object Array]"]=Ht["[object ArrayBuffer]"]=Ht["[object Boolean]"]=Ht["[object DataView]"]=Ht["[object Date]"]=Ht["[object Error]"]=Ht["[object Function]"]=Ht["[object Map]"]=Ht["[object Number]"]=Ht["[object Object]"]=Ht["[object RegExp]"]=Ht["[object Set]"]=Ht["[object String]"]=Ht["[object WeakMap]"]=!1;var Kt=function(t){return It(t)&&Yt(t.length)&&!!Ht[N(t)]};var Qt=function(t){return function(r){return t(r)}},Xt=n((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e&&g.process,a=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=a})),Zt=Xt&&Xt.isTypedArray,tr=Zt?Qt(Zt):Kt,rr=Object.prototype.hasOwnProperty;var er=function(t,r){var e=Dt(t),n=!e&&Bt(t),o=!e&&!n&&Wt(t),a=!e&&!n&&!o&&tr(t),i=e||n||o||a,c=i?Nt(t.length,String):[],u=c.length;for(var f in t)!r&&!rr.call(t,f)||i&&("length"==f||o&&("offset"==f||"parent"==f)||a&&("buffer"==f||"byteLength"==f||"byteOffset"==f)||Vt(f,u))||c.push(f);return c},nr=Object.prototype;var or=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||nr)};var ar=function(t,r){return function(e){return t(r(e))}},ir=ar(Object.keys,Object),cr=Object.prototype.hasOwnProperty;var ur=function(t){if(!or(t))return ir(t);var r=[];for(var e in Object(t))cr.call(t,e)&&"constructor"!=e&&r.push(e);return r};var fr=function(t){return null!=t&&Yt(t.length)&&!B(t)};var sr=function(t){return fr(t)?er(t):ur(t)};var lr=function(t,r){return t&&zt(r,sr(r),t)};var pr=function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r},vr=Object.prototype.hasOwnProperty;var hr=function(t){if(!I(t))return pr(t);var r=or(t),e=[];for(var n in t)("constructor"!=n||!r&&vr.call(t,n))&&e.push(n);return e};var yr=function(t){return fr(t)?er(t,!0):hr(t)};var br=function(t,r){return t&&zt(r,yr(r),t)},dr=n((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?w.Buffer:void 0,a=o?o.allocUnsafe:void 0;t.exports=function(t,r){if(r)return t.slice();var e=t.length,n=a?a(e):new t.constructor(e);return t.copy(n),n}}));var jr=function(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r};var gr=function(t,r){for(var e=-1,n=null==t?0:t.length,o=0,a=[];++e<n;){var i=t[e];r(i,e,t)&&(a[o++]=i)}return a};var _r=function(){return[]},wr=Object.prototype.propertyIsEnumerable,mr=Object.getOwnPropertySymbols,Or=mr?function(t){return null==t?[]:(t=Object(t),gr(mr(t),(function(r){return wr.call(t,r)})))}:_r;var xr=function(t,r){return zt(t,Or(t),r)};var Sr=function(t,r){for(var e=-1,n=r.length,o=t.length;++e<n;)t[o+e]=r[e];return t},Ar=ar(Object.getPrototypeOf,Object),Er=Object.getOwnPropertySymbols?function(t){for(var r=[];t;)Sr(r,Or(t)),t=Ar(t);return r}:_r;var Lr=function(t,r){return zt(t,Er(t),r)};var Pr=function(t,r,e){var n=r(t);return Dt(t)?n:Sr(n,e(t))};var kr=function(t){return Pr(t,sr,Or)};var Fr=function(t){return Pr(t,yr,Er)},zr=tt(w,"DataView"),Nr=tt(w,"Promise"),Ir=tt(w,"Set"),Tr=tt(w,"WeakMap"),Cr=R(zr),Ur=R(rt),Mr=R(Nr),$r=R(Ir),Br=R(Tr),Dr=N;(zr&&"[object DataView]"!=Dr(new zr(new ArrayBuffer(1)))||rt&&"[object Map]"!=Dr(new rt)||Nr&&"[object Promise]"!=Dr(Nr.resolve())||Ir&&"[object Set]"!=Dr(new Ir)||Tr&&"[object WeakMap]"!=Dr(new Tr))&&(Dr=function(t){var r=N(t),e="[object Object]"==r?t.constructor:void 0,n=e?R(e):"";if(n)switch(n){case Cr:return"[object DataView]";case Ur:return"[object Map]";case Mr:return"[object Promise]";case $r:return"[object Set]";case Br:return"[object WeakMap]"}return r});var Gr=Dr,Wr=Object.prototype.hasOwnProperty;var qr=function(t){var r=t.length,e=new t.constructor(r);return r&&"string"==typeof t[0]&&Wr.call(t,"index")&&(e.index=t.index,e.input=t.input),e},Rr=w.Uint8Array;var Vr=function(t){var r=new t.constructor(t.byteLength);return new Rr(r).set(new Rr(t)),r};var Jr=function(t,r){var e=r?Vr(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)},Yr=/\w*$/;var Hr=function(t){var r=new t.constructor(t.source,Yr.exec(t));return r.lastIndex=t.lastIndex,r},Kr=m?m.prototype:void 0,Qr=Kr?Kr.valueOf:void 0;var Xr=function(t){return Qr?Object(Qr.call(t)):{}};var Zr=function(t,r){var e=r?Vr(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)},te="[object Boolean]",re="[object Date]",ee="[object Map]",ne="[object Number]",oe="[object RegExp]",ae="[object Set]",ie="[object String]",ce="[object Symbol]",ue="[object ArrayBuffer]",fe="[object DataView]",se="[object Float32Array]",le="[object Float64Array]",pe="[object Int8Array]",ve="[object Int16Array]",he="[object Int32Array]",ye="[object Uint8Array]",be="[object Uint8ClampedArray]",de="[object Uint16Array]",je="[object Uint32Array]";var ge=function(t,r,e){var n=t.constructor;switch(r){case ue:return Vr(t);case te:case re:return new n(+t);case fe:return Jr(t,e);case se:case le:case pe:case ve:case he:case ye:case be:case de:case je:return Zr(t,e);case ee:return new n;case ne:case ie:return new n(t);case oe:return Hr(t);case ae:return new n;case ce:return Xr(t)}},_e=Object.create,we=function(){function t(){}return function(r){if(!I(r))return{};if(_e)return _e(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();var me=function(t){return"function"!=typeof t.constructor||or(t)?{}:we(Ar(t))},Oe="[object Map]";var xe=function(t){return It(t)&&Gr(t)==Oe},Se=Xt&&Xt.isMap,Ae=Se?Qt(Se):xe,Ee="[object Set]";var Le=function(t){return It(t)&&Gr(t)==Ee},Pe=Xt&&Xt.isSet,ke=Pe?Qt(Pe):Le,Fe=1,ze=2,Ne=4,Ie="[object Arguments]",Te="[object Function]",Ce="[object GeneratorFunction]",Ue="[object Object]",Me={};Me[Ie]=Me["[object Array]"]=Me["[object ArrayBuffer]"]=Me["[object DataView]"]=Me["[object Boolean]"]=Me["[object Date]"]=Me["[object Float32Array]"]=Me["[object Float64Array]"]=Me["[object Int8Array]"]=Me["[object Int16Array]"]=Me["[object Int32Array]"]=Me["[object Map]"]=Me["[object Number]"]=Me[Ue]=Me["[object RegExp]"]=Me["[object Set]"]=Me["[object String]"]=Me["[object Symbol]"]=Me["[object Uint8Array]"]=Me["[object Uint8ClampedArray]"]=Me["[object Uint16Array]"]=Me["[object Uint32Array]"]=!0,Me["[object Error]"]=Me[Te]=Me["[object WeakMap]"]=!1;var $e=function t(r,e,n,o,a,i){var c,u=e&Fe,f=e&ze,s=e&Ne;if(n&&(c=a?n(r,o,a,i):n(r)),void 0!==c)return c;if(!I(r))return r;var l=Dt(r);if(l){if(c=qr(r),!u)return jr(r,c)}else{var p=Gr(r),v=p==Te||p==Ce;if(Wt(r))return dr(r,u);if(p==Ue||p==Ie||v&&!a){if(c=f||v?{}:me(r),!u)return f?Lr(r,br(c,r)):xr(r,lr(c,r))}else{if(!Me[p])return a?r:{};c=ge(r,p,u)}}i||(i=new At);var h=i.get(r);if(h)return h;i.set(r,c),ke(r)?r.forEach((function(o){c.add(t(o,e,n,o,r,i))})):Ae(r)&&r.forEach((function(o,a){c.set(a,t(o,e,n,a,r,i))}));var y=s?f?Fr:kr:f?keysIn:sr,b=l?void 0:y(r);return Et(b||r,(function(o,a){b&&(o=r[a=o]),Ft(c,a,t(o,e,n,a,r,i))})),c},Be=1,De=4;var Ge=function(t){return $e(t,Be|De)};function We(t){return"[object Object]"===Object.prototype.toString.call(t)}function qe(t){return"[object String]"===Object.prototype.toString.call(t)}function Re(t){return!(!qe(t)||""===t)}var Ve="[object Symbol]";var Je=function(t){return"symbol"==r(t)||It(t)&&N(t)==Ve},Ye=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,He=/^\w*$/;var Ke=function(t,e){if(Dt(t))return!1;var n=r(t);return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!Je(t))||(He.test(t)||!Ye.test(t)||null!=e&&t in Object(e))},Qe="Expected a function";function Xe(t,r){if("function"!=typeof t||null!=r&&"function"!=typeof r)throw new TypeError(Qe);var e=function e(){var n=arguments,o=r?r.apply(this,n):n[0],a=e.cache;if(a.has(o))return a.get(o);var i=t.apply(this,n);return e.cache=a.set(o,i)||a,i};return e.cache=new(Xe.Cache||mt),e}Xe.Cache=mt;var Ze=Xe,tn=500;var rn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,en=/\\(\\)?/g,nn=function(t){var r=Ze(t,(function(t){return e.size===tn&&e.clear(),t})),e=r.cache;return r}((function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(rn,(function(t,e,n,o){r.push(n?o.replace(en,"$1"):e||t)})),r}));var on=function(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o},an=1/0,cn=m?m.prototype:void 0,un=cn?cn.toString:void 0;var fn=function t(r){if("string"==typeof r)return r;if(Dt(r))return on(r,t)+"";if(Je(r))return un?un.call(r):"";var e=r+"";return"0"==e&&1/r==-an?"-0":e};var sn=function(t){return null==t?"":fn(t)};var ln=function(t,r){return Dt(t)?t:Ke(t,r)?[t]:nn(sn(t))},pn=1/0;var vn=function(t){if("string"==typeof t||Je(t))return t;var r=t+"";return"0"==r&&1/t==-pn?"-0":r};var hn=function(t,r){for(var e=0,n=(r=ln(r,t)).length;null!=t&&e<n;)t=t[vn(r[e++])];return e&&e==n?t:void 0};var yn=function(t,r,e){var n=null==t?void 0:hn(t,r);return void 0===n?e:n};function bn(t,r){return function(t){if(We(t)){for(var r in t)return!0;return!1}return!1}(t)&&Re(r)?yn(t,r,""):""}function dn(t){var r=!1;return Re(t)?r=!isNaN(Number(t)):function(t){return"[object Number]"===Object.prototype.toString.call(t)}(t)&&(r=!0),r}function jn(t,r){var e,n=bn(t,r);return n=Re(e=n)||dn(e)?String(e):""}function gn(t){var r=Object.prototype.toString.call(t);return"[object Function]"===r||"[object AsyncFunction]"===r}function _n(t){return"[object Array]"===Object.prototype.toString.call(t)}function wn(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!function(t){if(We(t)){for(var r in t)return!1;return!0}return!1}(t)||(!!function(t){return!(!qe(t)||""!==t)}(t)||!!function(t){return!!_n(t)&&0===t.length}(t))))}function mn(t){return!!_n(t)&&(0!==t.length&&(1!==t.length||!wn(t[0])))}function On(t,r){if(Re(t))t=[t];else if(!mn(t))return!1;if(Re(r))r=[r];else if(!mn(r))return!1;for(var e=0;e<t.length;e++)for(var n=0;n<r.length;n++)if(t[e]===r[n])return!0;return!1}return function(r){(r=Ge(r)).port||(r.port=8080),r.portWeb||(r.portWeb=r.port+10);var e,n,a=[];function i(t){var e,n,o,a=((o=new Promise((function(){e=arguments[0],n=arguments[1]}))).resolve=e,o.reject=n,o);return gn(r.authenticate)?r.authenticate(t).then((function(t){a.resolve(t)})):a.resolve(!0),a}n="funcs",We(e=r)&&Re(n)&&n in e&&(a=sr(r.funcs));var c={port:r.port,http:{port:r.portWeb,bundle:!0,static:"./"}},u=new t.Server(c),f=[];function s(t,r){var e={topic:t,payload:JSON.stringify(r),qos:2,retain:!1};u.publish(e,(function(t){t&&console.log("publish: error:",t)}))}u.on("clientConnected",(function(t){f.push(t),gn(r.onClientChange)&&r.onClientChange(f,r)})),u.on("clientDisconnected",(function(t){f=f.filter((function(r){return r!==t})),gn(r.onClientChange)&&r.onClientChange(f,r)})),u.on("published",(function(t,e){var n=t.topic,c=t.payload.toString("utf8");c.indexOf('"output"')>=0||n.indexOf("topic|")>=0&&function(t,e){var n,c,u,f;o.async((function(l){for(;;)switch(l.prev=l.next){case 0:return n=jn(e,"token"),l.next=3,o.awrap(i(n));case 3:if(!l.sent){l.next=25;break}if(c=jn(e,"func"),u=bn(e,"input"),"getFuncs"!==c){l.next=15;break}if(!gn(r.filterFuncs)){l.next=12;break}return l.next=11,o.awrap(r.filterFuncs(n,a));case 11:a=l.sent;case 12:e.output={sys:"sys",funcs:a},l.next=23;break;case 15:if(!On(a,c)){l.next=22;break}return l.next=18,o.awrap(r.funcs[c](u));case 18:f=l.sent,e.output=f,l.next=23;break;case 22:e.output={err:"can not find: ".concat(c)};case 23:l.next=26;break;case 25:e.output={err:"can not authenticate token: ".concat(n)};case 26:delete e.input,s(t,e);case 28:case"end":return l.stop()}}))}(n,function(t){if(!Re(t))return{};var r={};try{r=JSON.parse(t)}catch(t){r={}}return r}(c))})),u.on("ready",(function(){u.authenticate=function(t,r,e,n){var a,c;return o.async((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r,t.next=3,o.awrap(i(a));case 3:c=t.sent,n(null,c);case 5:case"end":return t.stop()}}))},console.log("Server running at: mqtt://localhost:".concat(r.port," and [web] mqtt://localhost:").concat(r.portWeb))}))}}));
//# sourceMappingURL=mq-server.umd.js.map
