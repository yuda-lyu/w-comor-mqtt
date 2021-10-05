/*!
 * w-comor-mqtt-server v1.0.28
 * (c) 2018-2021 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("mosca")):"function"==typeof define&&define.amd?define(["mosca"],r):(t="undefined"!=typeof globalThis?globalThis:t||self)["w-comor-mqtt-server"]=r(t.mosca)}(this,(function(t){"use strict";function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=r(t);function n(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var r=this,e=arguments;return new Promise((function(o,a){var i=t.apply(r,e);function c(t){n(i,o,a,c,u,"next",t)}function u(t){n(i,o,a,c,u,"throw",t)}c(void 0)}))}}function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function c(t){var r={exports:{}};return t(r,r.exports),r.exports}var u=c((function(t){var r=function(t){var r,e=Object.prototype,n=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function f(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{f({},"")}catch(t){f=function(t,r,e){return t[r]=e}}function s(t,r,e,n){var o=r&&r.prototype instanceof d?r:d,a=Object.create(o.prototype),i=new k(n||[]);return a._invoke=function(t,r,e){var n=p;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw a;return F()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=S(i,e);if(c){if(c===b)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===p)throw n=y,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=h;var u=l(t,r,e);if("normal"===u.type){if(n=e.done?y:v,u.arg===b)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=y,e.method="throw",e.arg=u.arg)}}}(t,e,i),a}function l(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var p="suspendedStart",v="suspendedYield",h="executing",y="completed",b={};function d(){}function g(){}function j(){}var _={};f(_,i,(function(){return this}));var w=Object.getPrototypeOf,m=w&&w(w(P([])));m&&m!==e&&n.call(m,i)&&(_=m);var O=j.prototype=d.prototype=Object.create(_);function x(t){["next","throw","return"].forEach((function(r){f(t,r,(function(t){return this._invoke(r,t)}))}))}function A(t,r){function e(o,i,c,u){var f=l(t[o],t,i);if("throw"!==f.type){var s=f.arg,p=s.value;return p&&"object"===a(p)&&n.call(p,"__await")?r.resolve(p.__await).then((function(t){e("next",t,c,u)}),(function(t){e("throw",t,c,u)})):r.resolve(p).then((function(t){s.value=t,c(s)}),(function(t){return e("throw",t,c,u)}))}u(f.arg)}var o;this._invoke=function(t,n){function a(){return new r((function(r,o){e(t,n,r,o)}))}return o=o?o.then(a,a):a()}}function S(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,S(t,e),"throw"===e.method))return b;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return b}var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,b;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,b):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,b)}function E(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function L(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:F}}function F(){return{value:r,done:!0}}return g.prototype=j,f(O,"constructor",j),f(j,"constructor",g),g.displayName=f(j,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===g||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,f(t,u,"GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},x(A.prototype),f(A.prototype,c,(function(){return this})),t.AsyncIterator=A,t.async=function(r,e,n,o,a){void 0===a&&(a=Promise);var i=new A(s(r,e,n,o),a);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(O),f(O,u,"Generator"),f(O,i,(function(){return this})),f(O,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=P,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),f=n.call(i,"finallyLoc");if(u&&f){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,b):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),b},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),L(e),b}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;L(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),b}},t}(t.exports);try{regeneratorRuntime=r}catch(t){"object"===("undefined"==typeof globalThis?"undefined":a(globalThis))?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}})),f=u;var s=function(){this.__data__=[],this.size=0};var l=function(t,r){return t===r||t!=t&&r!=r};var p=function(t,r){for(var e=t.length;e--;)if(l(t[e][0],r))return e;return-1},v=Array.prototype.splice;var h=function(t){var r=this.__data__,e=p(r,t);return!(e<0)&&(e==r.length-1?r.pop():v.call(r,e,1),--this.size,!0)};var y=function(t){var r=this.__data__,e=p(r,t);return e<0?void 0:r[e][1]};var b=function(t){return p(this.__data__,t)>-1};var d=function(t,r){var e=this.__data__,n=p(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this};function g(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}g.prototype.clear=s,g.prototype.delete=h,g.prototype.get=y,g.prototype.has=b,g.prototype.set=d;var j=g;var _=function(){this.__data__=new j,this.size=0};var w=function(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e};var m=function(t){return this.__data__.get(t)};var O=function(t){return this.__data__.has(t)},x="object"==a(i)&&i&&i.Object===Object&&i,A="object"==("undefined"==typeof self?"undefined":a(self))&&self&&self.Object===Object&&self,S=x||A||Function("return this")(),E=S.Symbol,L=Object.prototype,k=L.hasOwnProperty,P=L.toString,F=E?E.toStringTag:void 0;var z=function(t){var r=k.call(t,F),e=t[F];try{t[F]=void 0;var n=!0}catch(t){}var o=P.call(t);return n&&(r?t[F]=e:delete t[F]),o},T=Object.prototype.toString;var I=function(t){return T.call(t)},C=E?E.toStringTag:void 0;var N=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":C&&C in Object(t)?z(t):I(t)};var U=function(t){var r=a(t);return null!=t&&("object"==r||"function"==r)};var B,M=function(t){if(!U(t))return!1;var r=N(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r},D=S["__core-js_shared__"],$=(B=/[^.]+$/.exec(D&&D.keys&&D.keys.IE_PROTO||""))?"Symbol(src)_1."+B:"";var G=function(t){return!!$&&$ in t},R=Function.prototype.toString;var W=function(t){if(null!=t){try{return R.call(t)}catch(t){}try{return t+""}catch(t){}}return""},q=/^\[object .+?Constructor\]$/,V=Function.prototype,J=Object.prototype,Y=V.toString,H=J.hasOwnProperty,K=RegExp("^"+Y.call(H).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var Q=function(t){return!(!U(t)||G(t))&&(M(t)?K:q).test(W(t))};var X=function(t,r){return null==t?void 0:t[r]};var Z=function(t,r){var e=X(t,r);return Q(e)?e:void 0},tt=Z(S,"Map"),rt=Z(Object,"create");var et=function(){this.__data__=rt?rt(null):{},this.size=0};var nt=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},ot=Object.prototype.hasOwnProperty;var at=function(t){var r=this.__data__;if(rt){var e=r[t];return"__lodash_hash_undefined__"===e?void 0:e}return ot.call(r,t)?r[t]:void 0},it=Object.prototype.hasOwnProperty;var ct=function(t){var r=this.__data__;return rt?void 0!==r[t]:it.call(r,t)};var ut=function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=rt&&void 0===r?"__lodash_hash_undefined__":r,this};function ft(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}ft.prototype.clear=et,ft.prototype.delete=nt,ft.prototype.get=at,ft.prototype.has=ct,ft.prototype.set=ut;var st=ft;var lt=function(){this.size=0,this.__data__={hash:new st,map:new(tt||j),string:new st}};var pt=function(t){var r=a(t);return"string"==r||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t};var vt=function(t,r){var e=t.__data__;return pt(r)?e["string"==typeof r?"string":"hash"]:e.map};var ht=function(t){var r=vt(this,t).delete(t);return this.size-=r?1:0,r};var yt=function(t){return vt(this,t).get(t)};var bt=function(t){return vt(this,t).has(t)};var dt=function(t,r){var e=vt(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this};function gt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}gt.prototype.clear=lt,gt.prototype.delete=ht,gt.prototype.get=yt,gt.prototype.has=bt,gt.prototype.set=dt;var jt=gt;var _t=function(t,r){var e=this.__data__;if(e instanceof j){var n=e.__data__;if(!tt||n.length<199)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new jt(n)}return e.set(t,r),this.size=e.size,this};function wt(t){var r=this.__data__=new j(t);this.size=r.size}wt.prototype.clear=_,wt.prototype.delete=w,wt.prototype.get=m,wt.prototype.has=O,wt.prototype.set=_t;var mt=wt;var Ot=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t},xt=function(){try{var t=Z(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var At=function(t,r,e){"__proto__"==r&&xt?xt(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e},St=Object.prototype.hasOwnProperty;var Et=function(t,r,e){var n=t[r];St.call(t,r)&&l(n,e)&&(void 0!==e||r in t)||At(t,r,e)};var Lt=function(t,r,e,n){var o=!e;e||(e={});for(var a=-1,i=r.length;++a<i;){var c=r[a],u=n?n(e[c],t[c],c,e,t):void 0;void 0===u&&(u=t[c]),o?At(e,c,u):Et(e,c,u)}return e};var kt=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n};var Pt=function(t){return null!=t&&"object"==a(t)};var Ft=function(t){return Pt(t)&&"[object Arguments]"==N(t)},zt=Object.prototype,Tt=zt.hasOwnProperty,It=zt.propertyIsEnumerable,Ct=Ft(function(){return arguments}())?Ft:function(t){return Pt(t)&&Tt.call(t,"callee")&&!It.call(t,"callee")},Nt=Ct,Ut=Array.isArray;var Bt=function(){return!1},Mt=c((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?S.Buffer:void 0,a=(o?o.isBuffer:void 0)||Bt;t.exports=a})),Dt=/^(?:0|[1-9]\d*)$/;var $t=function(t,r){var e=a(t);return!!(r=null==r?9007199254740991:r)&&("number"==e||"symbol"!=e&&Dt.test(t))&&t>-1&&t%1==0&&t<r};var Gt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},Rt={};Rt["[object Float32Array]"]=Rt["[object Float64Array]"]=Rt["[object Int8Array]"]=Rt["[object Int16Array]"]=Rt["[object Int32Array]"]=Rt["[object Uint8Array]"]=Rt["[object Uint8ClampedArray]"]=Rt["[object Uint16Array]"]=Rt["[object Uint32Array]"]=!0,Rt["[object Arguments]"]=Rt["[object Array]"]=Rt["[object ArrayBuffer]"]=Rt["[object Boolean]"]=Rt["[object DataView]"]=Rt["[object Date]"]=Rt["[object Error]"]=Rt["[object Function]"]=Rt["[object Map]"]=Rt["[object Number]"]=Rt["[object Object]"]=Rt["[object RegExp]"]=Rt["[object Set]"]=Rt["[object String]"]=Rt["[object WeakMap]"]=!1;var Wt=function(t){return Pt(t)&&Gt(t.length)&&!!Rt[N(t)]};var qt=function(t){return function(r){return t(r)}},Vt=c((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e&&x.process,a=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=a})),Jt=Vt&&Vt.isTypedArray,Yt=Jt?qt(Jt):Wt,Ht=Object.prototype.hasOwnProperty;var Kt=function(t,r){var e=Ut(t),n=!e&&Nt(t),o=!e&&!n&&Mt(t),a=!e&&!n&&!o&&Yt(t),i=e||n||o||a,c=i?kt(t.length,String):[],u=c.length;for(var f in t)!r&&!Ht.call(t,f)||i&&("length"==f||o&&("offset"==f||"parent"==f)||a&&("buffer"==f||"byteLength"==f||"byteOffset"==f)||$t(f,u))||c.push(f);return c},Qt=Object.prototype;var Xt=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||Qt)};var Zt=function(t,r){return function(e){return t(r(e))}},tr=Zt(Object.keys,Object),rr=Object.prototype.hasOwnProperty;var er=function(t){if(!Xt(t))return tr(t);var r=[];for(var e in Object(t))rr.call(t,e)&&"constructor"!=e&&r.push(e);return r};var nr=function(t){return null!=t&&Gt(t.length)&&!M(t)};var or=function(t){return nr(t)?Kt(t):er(t)};var ar=function(t,r){return t&&Lt(r,or(r),t)};var ir=function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r},cr=Object.prototype.hasOwnProperty;var ur=function(t){if(!U(t))return ir(t);var r=Xt(t),e=[];for(var n in t)("constructor"!=n||!r&&cr.call(t,n))&&e.push(n);return e};var fr=function(t){return nr(t)?Kt(t,!0):ur(t)};var sr=function(t,r){return t&&Lt(r,fr(r),t)},lr=c((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?S.Buffer:void 0,a=o?o.allocUnsafe:void 0;t.exports=function(t,r){if(r)return t.slice();var e=t.length,n=a?a(e):new t.constructor(e);return t.copy(n),n}}));var pr=function(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r};var vr=function(t,r){for(var e=-1,n=null==t?0:t.length,o=0,a=[];++e<n;){var i=t[e];r(i,e,t)&&(a[o++]=i)}return a};var hr=function(){return[]},yr=Object.prototype.propertyIsEnumerable,br=Object.getOwnPropertySymbols,dr=br?function(t){return null==t?[]:(t=Object(t),vr(br(t),(function(r){return yr.call(t,r)})))}:hr;var gr=function(t,r){return Lt(t,dr(t),r)};var jr=function(t,r){for(var e=-1,n=r.length,o=t.length;++e<n;)t[o+e]=r[e];return t},_r=Zt(Object.getPrototypeOf,Object),wr=Object.getOwnPropertySymbols?function(t){for(var r=[];t;)jr(r,dr(t)),t=_r(t);return r}:hr;var mr=function(t,r){return Lt(t,wr(t),r)};var Or=function(t,r,e){var n=r(t);return Ut(t)?n:jr(n,e(t))};var xr=function(t){return Or(t,or,dr)};var Ar=function(t){return Or(t,fr,wr)},Sr=Z(S,"DataView"),Er=Z(S,"Promise"),Lr=Z(S,"Set"),kr=Z(S,"WeakMap"),Pr="[object Map]",Fr="[object Promise]",zr="[object Set]",Tr="[object WeakMap]",Ir="[object DataView]",Cr=W(Sr),Nr=W(tt),Ur=W(Er),Br=W(Lr),Mr=W(kr),Dr=N;(Sr&&Dr(new Sr(new ArrayBuffer(1)))!=Ir||tt&&Dr(new tt)!=Pr||Er&&Dr(Er.resolve())!=Fr||Lr&&Dr(new Lr)!=zr||kr&&Dr(new kr)!=Tr)&&(Dr=function(t){var r=N(t),e="[object Object]"==r?t.constructor:void 0,n=e?W(e):"";if(n)switch(n){case Cr:return Ir;case Nr:return Pr;case Ur:return Fr;case Br:return zr;case Mr:return Tr}return r});var $r=Dr,Gr=Object.prototype.hasOwnProperty;var Rr=function(t){var r=t.length,e=new t.constructor(r);return r&&"string"==typeof t[0]&&Gr.call(t,"index")&&(e.index=t.index,e.input=t.input),e},Wr=S.Uint8Array;var qr=function(t){var r=new t.constructor(t.byteLength);return new Wr(r).set(new Wr(t)),r};var Vr=function(t,r){var e=r?qr(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)},Jr=/\w*$/;var Yr=function(t){var r=new t.constructor(t.source,Jr.exec(t));return r.lastIndex=t.lastIndex,r},Hr=E?E.prototype:void 0,Kr=Hr?Hr.valueOf:void 0;var Qr=function(t){return Kr?Object(Kr.call(t)):{}};var Xr=function(t,r){var e=r?qr(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)};var Zr=function(t,r,e){var n=t.constructor;switch(r){case"[object ArrayBuffer]":return qr(t);case"[object Boolean]":case"[object Date]":return new n(+t);case"[object DataView]":return Vr(t,e);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return Xr(t,e);case"[object Map]":case"[object Set]":return new n;case"[object Number]":case"[object String]":return new n(t);case"[object RegExp]":return Yr(t);case"[object Symbol]":return Qr(t)}},te=Object.create,re=function(){function t(){}return function(r){if(!U(r))return{};if(te)return te(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();var ee=function(t){return"function"!=typeof t.constructor||Xt(t)?{}:re(_r(t))};var ne=function(t){return Pt(t)&&"[object Map]"==$r(t)},oe=Vt&&Vt.isMap,ae=oe?qt(oe):ne;var ie=function(t){return Pt(t)&&"[object Set]"==$r(t)},ce=Vt&&Vt.isSet,ue=ce?qt(ce):ie,fe="[object Arguments]",se="[object Function]",le="[object Object]",pe={};pe[fe]=pe["[object Array]"]=pe["[object ArrayBuffer]"]=pe["[object DataView]"]=pe["[object Boolean]"]=pe["[object Date]"]=pe["[object Float32Array]"]=pe["[object Float64Array]"]=pe["[object Int8Array]"]=pe["[object Int16Array]"]=pe["[object Int32Array]"]=pe["[object Map]"]=pe["[object Number]"]=pe[le]=pe["[object RegExp]"]=pe["[object Set]"]=pe["[object String]"]=pe["[object Symbol]"]=pe["[object Uint8Array]"]=pe["[object Uint8ClampedArray]"]=pe["[object Uint16Array]"]=pe["[object Uint32Array]"]=!0,pe["[object Error]"]=pe[se]=pe["[object WeakMap]"]=!1;var ve=function t(r,e,n,o,a,i){var c,u=1&e,f=2&e,s=4&e;if(n&&(c=a?n(r,o,a,i):n(r)),void 0!==c)return c;if(!U(r))return r;var l=Ut(r);if(l){if(c=Rr(r),!u)return pr(r,c)}else{var p=$r(r),v=p==se||"[object GeneratorFunction]"==p;if(Mt(r))return lr(r,u);if(p==le||p==fe||v&&!a){if(c=f||v?{}:ee(r),!u)return f?mr(r,sr(c,r)):gr(r,ar(c,r))}else{if(!pe[p])return a?r:{};c=Zr(r,p,u)}}i||(i=new mt);var h=i.get(r);if(h)return h;i.set(r,c),ue(r)?r.forEach((function(o){c.add(t(o,e,n,o,r,i))})):ae(r)&&r.forEach((function(o,a){c.set(a,t(o,e,n,a,r,i))}));var y=l?void 0:(s?f?Ar:xr:f?fr:or)(r);return Ot(y||r,(function(o,a){y&&(o=r[a=o]),Et(c,a,t(o,e,n,a,r,i))})),c};var he=function(t){return ve(t,5)};var ye=function(t){return"symbol"==a(t)||Pt(t)&&"[object Symbol]"==N(t)},be=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,de=/^\w*$/;var ge=function(t,r){if(Ut(t))return!1;var e=a(t);return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=t&&!ye(t))||(de.test(t)||!be.test(t)||null!=r&&t in Object(r))};function je(t,r){if("function"!=typeof t||null!=r&&"function"!=typeof r)throw new TypeError("Expected a function");var e=function e(){var n=arguments,o=r?r.apply(this,n):n[0],a=e.cache;if(a.has(o))return a.get(o);var i=t.apply(this,n);return e.cache=a.set(o,i)||a,i};return e.cache=new(je.Cache||jt),e}je.Cache=jt;var _e=je;var we=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,me=/\\(\\)?/g,Oe=function(t){var r=_e(t,(function(t){return 500===e.size&&e.clear(),t})),e=r.cache;return r}((function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(we,(function(t,e,n,o){r.push(n?o.replace(me,"$1"):e||t)})),r}));var xe=function(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o},Ae=E?E.prototype:void 0,Se=Ae?Ae.toString:void 0;var Ee=function t(r){if("string"==typeof r)return r;if(Ut(r))return xe(r,t)+"";if(ye(r))return Se?Se.call(r):"";var e=r+"";return"0"==e&&1/r==-Infinity?"-0":e};var Le=function(t){return null==t?"":Ee(t)};var ke=function(t,r){return Ut(t)?t:ge(t,r)?[t]:Oe(Le(t))};var Pe=function(t){if("string"==typeof t||ye(t))return t;var r=t+"";return"0"==r&&1/t==-Infinity?"-0":r};var Fe=function(t,r){for(var e=0,n=(r=ke(r,t)).length;null!=t&&e<n;)t=t[Pe(r[e++])];return e&&e==n?t:void 0};var ze=function(t,r,e){var n=null==t?void 0:Fe(t,r);return void 0===n?e:n};function Te(t){return"[object Object]"===Object.prototype.toString.call(t)}function Ie(t){return"[object String]"===Object.prototype.toString.call(t)}function Ce(t){return!(!Ie(t)||""===t)}function Ne(t){var r=Object.prototype.toString.call(t);return"[object Function]"===r||"[object AsyncFunction]"===r}var Ue=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this};var Be=function(t){return this.__data__.has(t)};function Me(t){var r=-1,e=null==t?0:t.length;for(this.__data__=new jt;++r<e;)this.add(t[r])}Me.prototype.add=Me.prototype.push=Ue,Me.prototype.has=Be;var De=Me;var $e=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n;)if(r(t[e],e,t))return!0;return!1};var Ge=function(t,r){return t.has(r)};var Re=function(t,r,e,n,o,a){var i=1&e,c=t.length,u=r.length;if(c!=u&&!(i&&u>c))return!1;var f=a.get(t),s=a.get(r);if(f&&s)return f==r&&s==t;var l=-1,p=!0,v=2&e?new De:void 0;for(a.set(t,r),a.set(r,t);++l<c;){var h=t[l],y=r[l];if(n)var b=i?n(y,h,l,r,t,a):n(h,y,l,t,r,a);if(void 0!==b){if(b)continue;p=!1;break}if(v){if(!$e(r,(function(t,r){if(!Ge(v,r)&&(h===t||o(h,t,e,n,a)))return v.push(r)}))){p=!1;break}}else if(h!==y&&!o(h,y,e,n,a)){p=!1;break}}return a.delete(t),a.delete(r),p};var We=function(t){var r=-1,e=Array(t.size);return t.forEach((function(t,n){e[++r]=[n,t]})),e};var qe=function(t){var r=-1,e=Array(t.size);return t.forEach((function(t){e[++r]=t})),e},Ve=E?E.prototype:void 0,Je=Ve?Ve.valueOf:void 0;var Ye=function(t,r,e,n,o,a,i){switch(e){case"[object DataView]":if(t.byteLength!=r.byteLength||t.byteOffset!=r.byteOffset)return!1;t=t.buffer,r=r.buffer;case"[object ArrayBuffer]":return!(t.byteLength!=r.byteLength||!a(new Wr(t),new Wr(r)));case"[object Boolean]":case"[object Date]":case"[object Number]":return l(+t,+r);case"[object Error]":return t.name==r.name&&t.message==r.message;case"[object RegExp]":case"[object String]":return t==r+"";case"[object Map]":var c=We;case"[object Set]":var u=1&n;if(c||(c=qe),t.size!=r.size&&!u)return!1;var f=i.get(t);if(f)return f==r;n|=2,i.set(t,r);var s=Re(c(t),c(r),n,o,a,i);return i.delete(t),s;case"[object Symbol]":if(Je)return Je.call(t)==Je.call(r)}return!1},He=Object.prototype.hasOwnProperty;var Ke=function(t,r,e,n,o,a){var i=1&e,c=xr(t),u=c.length;if(u!=xr(r).length&&!i)return!1;for(var f=u;f--;){var s=c[f];if(!(i?s in r:He.call(r,s)))return!1}var l=a.get(t),p=a.get(r);if(l&&p)return l==r&&p==t;var v=!0;a.set(t,r),a.set(r,t);for(var h=i;++f<u;){var y=t[s=c[f]],b=r[s];if(n)var d=i?n(b,y,s,r,t,a):n(y,b,s,t,r,a);if(!(void 0===d?y===b||o(y,b,e,n,a):d)){v=!1;break}h||(h="constructor"==s)}if(v&&!h){var g=t.constructor,j=r.constructor;g==j||!("constructor"in t)||!("constructor"in r)||"function"==typeof g&&g instanceof g&&"function"==typeof j&&j instanceof j||(v=!1)}return a.delete(t),a.delete(r),v},Qe="[object Arguments]",Xe="[object Array]",Ze="[object Object]",tn=Object.prototype.hasOwnProperty;var rn=function(t,r,e,n,o,a){var i=Ut(t),c=Ut(r),u=i?Xe:$r(t),f=c?Xe:$r(r),s=(u=u==Qe?Ze:u)==Ze,l=(f=f==Qe?Ze:f)==Ze,p=u==f;if(p&&Mt(t)){if(!Mt(r))return!1;i=!0,s=!1}if(p&&!s)return a||(a=new mt),i||Yt(t)?Re(t,r,e,n,o,a):Ye(t,r,u,e,n,o,a);if(!(1&e)){var v=s&&tn.call(t,"__wrapped__"),h=l&&tn.call(r,"__wrapped__");if(v||h){var y=v?t.value():t,b=h?r.value():r;return a||(a=new mt),o(y,b,e,n,a)}}return!!p&&(a||(a=new mt),Ke(t,r,e,n,o,a))};var en=function t(r,e,n,o,a){return r===e||(null==r||null==e||!Pt(r)&&!Pt(e)?r!=r&&e!=e:rn(r,e,n,o,t,a))};var nn=function(t,r){return en(t,r)};function on(t){return"[object Array]"===Object.prototype.toString.call(t)}function an(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!function(t){if(Te(t)){for(var r in t)return!1;return!0}return!1}(t)||(!!function(t){return!(!Ie(t)||""!==t)}(t)||!!function(t){return!!on(t)&&0===t.length}(t))))}function cn(t,r){function e(t){return on(t)?t:[t]}if(an(t))return!1;if(0===(t=e(t)).length)return!1;if(an(t))return!1;if(0===(r=e(r)).length)return!1;for(var n=0;n<t.length;n++)for(var o=0;o<r.length;o++)if(nn(t[n],r[o]))return!0;return!1}return function(t){(t=he(t)).port||(t.port=8080),t.portWeb||(t.portWeb=t.port+10);var r,n,a=[];function i(r){var e,n,o,a=(o=new Promise((function(){e=arguments[0],n=arguments[1]})),o.resolve=e,o.reject=n,o);return Ne(t.authenticate)?t.authenticate(r).then((function(t){a.resolve(t)})):a.resolve(!0),a}n="funcs",Te(r=t)&&Ce(n)&&n in r&&(a=or(t.funcs));var c={port:t.port,http:{port:t.portWeb,bundle:!0,static:"./"}},u=new e.default.Server(c),s=[];function l(t,r){var e={topic:t,payload:JSON.stringify(r),qos:2,retain:!1};u.publish(e,(function(t){t&&console.log("publish: error:",t)}))}function p(){return(p=o(f.mark((function r(e,n){var o,c,u,s;return f.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=ze(n,"token",""),r.next=3,i(o);case 3:if(!r.sent){r.next=25;break}if(c=ze(n,"func",""),u=ze(n,"input"),"getFuncs"!==c){r.next=15;break}if(!Ne(t.filterFuncs)){r.next=12;break}return r.next=11,t.filterFuncs(o,a);case 11:a=r.sent;case 12:n.output={sys:"sys",funcs:a},r.next=23;break;case 15:if(!cn(a,c)){r.next=22;break}return r.next=18,t.funcs[c](u);case 18:s=r.sent,n.output=s,r.next=23;break;case 22:n.output={err:"can not find: ".concat(c)};case 23:r.next=26;break;case 25:n.output={err:"can not authenticate token: ".concat(o)};case 26:delete n.input,l(e,n);case 28:case"end":return r.stop()}}),r)})))).apply(this,arguments)}u.on("clientConnected",(function(r){s.push(r),Ne(t.onClientChange)&&t.onClientChange(s,t)})),u.on("clientDisconnected",(function(r){s=s.filter((function(t){return t!==r})),Ne(t.onClientChange)&&t.onClientChange(s,t)})),u.on("published",(function(t,r){var e=t.topic,n=t.payload.toString("utf8");n.indexOf('"output"')>=0||e.indexOf("topic|")>=0&&function(t,r){p.apply(this,arguments)}(e,function(t){if(!Ce(t))return{};var r={};try{r=JSON.parse(t)}catch(t){r={}}return r}(n))})),u.on("ready",(function(){u.authenticate=function(){var t=o(f.mark((function t(r,e,n,o){var a,c;return f.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e,t.next=3,i(a);case 3:c=t.sent,o(null,c);case 5:case"end":return t.stop()}}),t)})));return function(r,e,n,o){return t.apply(this,arguments)}}(),console.log("Server running at: mqtt://localhost:".concat(t.port," and [web] mqtt://localhost:").concat(t.portWeb))}))}}));
//# sourceMappingURL=w-comor-mqtt-server.umd.js.map
