/*!
 * w-comor-mqtt-server v1.0.26
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("mosca")):"function"==typeof define&&define.amd?define(["mosca"],r):(t=t||self)["w-comor-mqtt-server"]=r(t.mosca)}(this,(function(t){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,r){return t(r={exports:{}},r.exports),r.exports}var n=e((function(t){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r})),o=e((function(t){var r=function(t){var r=Object.prototype,e=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,r,e,n){var o=r&&r.prototype instanceof l?r:l,a=Object.create(o.prototype),i=new O(n||[]);return a._invoke=function(t,r,e){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return A()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=_(i,e);if(c){if(c===s)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var u=f(t,r,e);if("normal"===u.type){if(n=e.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n="completed",e.method="throw",e.arg=u.arg)}}}(t,e,i),a}function f(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var s={};function l(){}function p(){}function v(){}var h={};h[a]=function(){return this};var y=Object.getPrototypeOf,b=y&&y(y(x([])));b&&b!==r&&e.call(b,a)&&(h=b);var d=v.prototype=l.prototype=Object.create(h);function j(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function g(t,r){var o;this._invoke=function(a,i){function c(){return new r((function(o,c){!function o(a,i,c,u){var s=f(t[a],t,i);if("throw"!==s.type){var l=s.arg,p=l.value;return p&&"object"===n(p)&&e.call(p,"__await")?r.resolve(p.__await).then((function(t){o("next",t,c,u)}),(function(t){o("throw",t,c,u)})):r.resolve(p).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,u)}))}u(s.arg)}(a,i,o,c)}))}return o=o?o.then(c,c):c()}}function _(t,r){var e=t.iterator[r.method];if(void 0===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=void 0,_(t,r),"throw"===r.method))return s;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=f(e,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,s;var o=n.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,s):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,s)}function w(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function m(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function x(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){for(;++n<t.length;)if(e.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=void 0,r.done=!0,r};return o.next=o}}return{next:A}}function A(){return{value:void 0,done:!0}}return p.prototype=d.constructor=v,v.constructor=p,v[c]=p.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===p||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(d),t},t.awrap=function(t){return{__await:t}},j(g.prototype),g.prototype[i]=function(){return this},t.AsyncIterator=g,t.async=function(r,e,n,o,a){void 0===a&&(a=Promise);var i=new g(u(r,e,n,o),a);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},j(d),d[c]="Generator",d[a]=function(){return this},d.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=x,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(m),!t)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(e,n){return i.type="throw",i.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=e.call(a,"catchLoc"),u=e.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,s):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),s},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),m(e),s}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;m(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:x(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}}));function a(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}var i=function(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function c(t){a(i,n,o,c,u,"next",t)}function u(t){a(i,n,o,c,u,"throw",t)}c(void 0)}))}};var c=function(){this.__data__=[],this.size=0};var u=function(t,r){return t===r||t!=t&&r!=r};var f=function(t,r){for(var e=t.length;e--;)if(u(t[e][0],r))return e;return-1},s=Array.prototype.splice;var l=function(t){var r=this.__data__,e=f(r,t);return!(e<0)&&(e==r.length-1?r.pop():s.call(r,e,1),--this.size,!0)};var p=function(t){var r=this.__data__,e=f(r,t);return e<0?void 0:r[e][1]};var v=function(t){return f(this.__data__,t)>-1};var h=function(t,r){var e=this.__data__,n=f(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this};function y(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}y.prototype.clear=c,y.prototype.delete=l,y.prototype.get=p,y.prototype.has=v,y.prototype.set=h;var b=y;var d=function(){this.__data__=new b,this.size=0};var j=function(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e};var g=function(t){return this.__data__.get(t)};var _=function(t){return this.__data__.has(t)},w="object"==n(r)&&r&&r.Object===Object&&r,m="object"==("undefined"==typeof self?"undefined":n(self))&&self&&self.Object===Object&&self,O=w||m||Function("return this")(),x=O.Symbol,A=Object.prototype,S=A.hasOwnProperty,E=A.toString,L=x?x.toStringTag:void 0;var P=function(t){var r=S.call(t,L),e=t[L];try{t[L]=void 0;var n=!0}catch(t){}var o=E.call(t);return n&&(r?t[L]=e:delete t[L]),o},k=Object.prototype.toString;var F=function(t){return k.call(t)},z=x?x.toStringTag:void 0;var I=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":z&&z in Object(t)?P(t):F(t)};var T=function(t){var r=n(t);return null!=t&&("object"==r||"function"==r)};var C,U=function(t){if(!T(t))return!1;var r=I(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r},N=O["__core-js_shared__"],M=(C=/[^.]+$/.exec(N&&N.keys&&N.keys.IE_PROTO||""))?"Symbol(src)_1."+C:"";var $=function(t){return!!M&&M in t},B=Function.prototype.toString;var D=function(t){if(null!=t){try{return B.call(t)}catch(t){}try{return t+""}catch(t){}}return""},G=/^\[object .+?Constructor\]$/,W=Function.prototype,q=Object.prototype,R=W.toString,V=q.hasOwnProperty,J=RegExp("^"+R.call(V).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var Y=function(t){return!(!T(t)||$(t))&&(U(t)?J:G).test(D(t))};var H=function(t,r){return null==t?void 0:t[r]};var K=function(t,r){var e=H(t,r);return Y(e)?e:void 0},Q=K(O,"Map"),X=K(Object,"create");var Z=function(){this.__data__=X?X(null):{},this.size=0};var tt=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},rt=Object.prototype.hasOwnProperty;var et=function(t){var r=this.__data__;if(X){var e=r[t];return"__lodash_hash_undefined__"===e?void 0:e}return rt.call(r,t)?r[t]:void 0},nt=Object.prototype.hasOwnProperty;var ot=function(t){var r=this.__data__;return X?void 0!==r[t]:nt.call(r,t)};var at=function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=X&&void 0===r?"__lodash_hash_undefined__":r,this};function it(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}it.prototype.clear=Z,it.prototype.delete=tt,it.prototype.get=et,it.prototype.has=ot,it.prototype.set=at;var ct=it;var ut=function(){this.size=0,this.__data__={hash:new ct,map:new(Q||b),string:new ct}};var ft=function(t){var r=n(t);return"string"==r||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t};var st=function(t,r){var e=t.__data__;return ft(r)?e["string"==typeof r?"string":"hash"]:e.map};var lt=function(t){var r=st(this,t).delete(t);return this.size-=r?1:0,r};var pt=function(t){return st(this,t).get(t)};var vt=function(t){return st(this,t).has(t)};var ht=function(t,r){var e=st(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this};function yt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}yt.prototype.clear=ut,yt.prototype.delete=lt,yt.prototype.get=pt,yt.prototype.has=vt,yt.prototype.set=ht;var bt=yt;var dt=function(t,r){var e=this.__data__;if(e instanceof b){var n=e.__data__;if(!Q||n.length<199)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new bt(n)}return e.set(t,r),this.size=e.size,this};function jt(t){var r=this.__data__=new b(t);this.size=r.size}jt.prototype.clear=d,jt.prototype.delete=j,jt.prototype.get=g,jt.prototype.has=_,jt.prototype.set=dt;var gt=jt;var _t=function(t,r){for(var e=-1,n=null==t?0:t.length;++e<n&&!1!==r(t[e],e,t););return t},wt=function(){try{var t=K(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var mt=function(t,r,e){"__proto__"==r&&wt?wt(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e},Ot=Object.prototype.hasOwnProperty;var xt=function(t,r,e){var n=t[r];Ot.call(t,r)&&u(n,e)&&(void 0!==e||r in t)||mt(t,r,e)};var At=function(t,r,e,n){var o=!e;e||(e={});for(var a=-1,i=r.length;++a<i;){var c=r[a],u=n?n(e[c],t[c],c,e,t):void 0;void 0===u&&(u=t[c]),o?mt(e,c,u):xt(e,c,u)}return e};var St=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n};var Et=function(t){return null!=t&&"object"==n(t)};var Lt=function(t){return Et(t)&&"[object Arguments]"==I(t)},Pt=Object.prototype,kt=Pt.hasOwnProperty,Ft=Pt.propertyIsEnumerable,zt=Lt(function(){return arguments}())?Lt:function(t){return Et(t)&&kt.call(t,"callee")&&!Ft.call(t,"callee")},It=Array.isArray;var Tt=function(){return!1},Ct=e((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?O.Buffer:void 0,a=(o?o.isBuffer:void 0)||Tt;t.exports=a})),Ut=/^(?:0|[1-9]\d*)$/;var Nt=function(t,r){var e=n(t);return!!(r=null==r?9007199254740991:r)&&("number"==e||"symbol"!=e&&Ut.test(t))&&t>-1&&t%1==0&&t<r};var Mt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},$t={};$t["[object Float32Array]"]=$t["[object Float64Array]"]=$t["[object Int8Array]"]=$t["[object Int16Array]"]=$t["[object Int32Array]"]=$t["[object Uint8Array]"]=$t["[object Uint8ClampedArray]"]=$t["[object Uint16Array]"]=$t["[object Uint32Array]"]=!0,$t["[object Arguments]"]=$t["[object Array]"]=$t["[object ArrayBuffer]"]=$t["[object Boolean]"]=$t["[object DataView]"]=$t["[object Date]"]=$t["[object Error]"]=$t["[object Function]"]=$t["[object Map]"]=$t["[object Number]"]=$t["[object Object]"]=$t["[object RegExp]"]=$t["[object Set]"]=$t["[object String]"]=$t["[object WeakMap]"]=!1;var Bt=function(t){return Et(t)&&Mt(t.length)&&!!$t[I(t)]};var Dt=function(t){return function(r){return t(r)}},Gt=e((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e&&w.process,a=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=a})),Wt=Gt&&Gt.isTypedArray,qt=Wt?Dt(Wt):Bt,Rt=Object.prototype.hasOwnProperty;var Vt=function(t,r){var e=It(t),n=!e&&zt(t),o=!e&&!n&&Ct(t),a=!e&&!n&&!o&&qt(t),i=e||n||o||a,c=i?St(t.length,String):[],u=c.length;for(var f in t)!r&&!Rt.call(t,f)||i&&("length"==f||o&&("offset"==f||"parent"==f)||a&&("buffer"==f||"byteLength"==f||"byteOffset"==f)||Nt(f,u))||c.push(f);return c},Jt=Object.prototype;var Yt=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||Jt)};var Ht=function(t,r){return function(e){return t(r(e))}},Kt=Ht(Object.keys,Object),Qt=Object.prototype.hasOwnProperty;var Xt=function(t){if(!Yt(t))return Kt(t);var r=[];for(var e in Object(t))Qt.call(t,e)&&"constructor"!=e&&r.push(e);return r};var Zt=function(t){return null!=t&&Mt(t.length)&&!U(t)};var tr=function(t){return Zt(t)?Vt(t):Xt(t)};var rr=function(t,r){return t&&At(r,tr(r),t)};var er=function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r},nr=Object.prototype.hasOwnProperty;var or=function(t){if(!T(t))return er(t);var r=Yt(t),e=[];for(var n in t)("constructor"!=n||!r&&nr.call(t,n))&&e.push(n);return e};var ar=function(t){return Zt(t)?Vt(t,!0):or(t)};var ir=function(t,r){return t&&At(r,ar(r),t)},cr=e((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?O.Buffer:void 0,a=o?o.allocUnsafe:void 0;t.exports=function(t,r){if(r)return t.slice();var e=t.length,n=a?a(e):new t.constructor(e);return t.copy(n),n}}));var ur=function(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r};var fr=function(t,r){for(var e=-1,n=null==t?0:t.length,o=0,a=[];++e<n;){var i=t[e];r(i,e,t)&&(a[o++]=i)}return a};var sr=function(){return[]},lr=Object.prototype.propertyIsEnumerable,pr=Object.getOwnPropertySymbols,vr=pr?function(t){return null==t?[]:(t=Object(t),fr(pr(t),(function(r){return lr.call(t,r)})))}:sr;var hr=function(t,r){return At(t,vr(t),r)};var yr=function(t,r){for(var e=-1,n=r.length,o=t.length;++e<n;)t[o+e]=r[e];return t},br=Ht(Object.getPrototypeOf,Object),dr=Object.getOwnPropertySymbols?function(t){for(var r=[];t;)yr(r,vr(t)),t=br(t);return r}:sr;var jr=function(t,r){return At(t,dr(t),r)};var gr=function(t,r,e){var n=r(t);return It(t)?n:yr(n,e(t))};var _r=function(t){return gr(t,tr,vr)};var wr=function(t){return gr(t,ar,dr)},mr=K(O,"DataView"),Or=K(O,"Promise"),xr=K(O,"Set"),Ar=K(O,"WeakMap"),Sr=D(mr),Er=D(Q),Lr=D(Or),Pr=D(xr),kr=D(Ar),Fr=I;(mr&&"[object DataView]"!=Fr(new mr(new ArrayBuffer(1)))||Q&&"[object Map]"!=Fr(new Q)||Or&&"[object Promise]"!=Fr(Or.resolve())||xr&&"[object Set]"!=Fr(new xr)||Ar&&"[object WeakMap]"!=Fr(new Ar))&&(Fr=function(t){var r=I(t),e="[object Object]"==r?t.constructor:void 0,n=e?D(e):"";if(n)switch(n){case Sr:return"[object DataView]";case Er:return"[object Map]";case Lr:return"[object Promise]";case Pr:return"[object Set]";case kr:return"[object WeakMap]"}return r});var zr=Fr,Ir=Object.prototype.hasOwnProperty;var Tr=function(t){var r=t.length,e=new t.constructor(r);return r&&"string"==typeof t[0]&&Ir.call(t,"index")&&(e.index=t.index,e.input=t.input),e},Cr=O.Uint8Array;var Ur=function(t){var r=new t.constructor(t.byteLength);return new Cr(r).set(new Cr(t)),r};var Nr=function(t,r){var e=r?Ur(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)},Mr=/\w*$/;var $r=function(t){var r=new t.constructor(t.source,Mr.exec(t));return r.lastIndex=t.lastIndex,r},Br=x?x.prototype:void 0,Dr=Br?Br.valueOf:void 0;var Gr=function(t){return Dr?Object(Dr.call(t)):{}};var Wr=function(t,r){var e=r?Ur(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)};var qr=function(t,r,e){var n=t.constructor;switch(r){case"[object ArrayBuffer]":return Ur(t);case"[object Boolean]":case"[object Date]":return new n(+t);case"[object DataView]":return Nr(t,e);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return Wr(t,e);case"[object Map]":return new n;case"[object Number]":case"[object String]":return new n(t);case"[object RegExp]":return $r(t);case"[object Set]":return new n;case"[object Symbol]":return Gr(t)}},Rr=Object.create,Vr=function(){function t(){}return function(r){if(!T(r))return{};if(Rr)return Rr(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();var Jr=function(t){return"function"!=typeof t.constructor||Yt(t)?{}:Vr(br(t))};var Yr=function(t){return Et(t)&&"[object Map]"==zr(t)},Hr=Gt&&Gt.isMap,Kr=Hr?Dt(Hr):Yr;var Qr=function(t){return Et(t)&&"[object Set]"==zr(t)},Xr=Gt&&Gt.isSet,Zr=Xr?Dt(Xr):Qr,te={};te["[object Arguments]"]=te["[object Array]"]=te["[object ArrayBuffer]"]=te["[object DataView]"]=te["[object Boolean]"]=te["[object Date]"]=te["[object Float32Array]"]=te["[object Float64Array]"]=te["[object Int8Array]"]=te["[object Int16Array]"]=te["[object Int32Array]"]=te["[object Map]"]=te["[object Number]"]=te["[object Object]"]=te["[object RegExp]"]=te["[object Set]"]=te["[object String]"]=te["[object Symbol]"]=te["[object Uint8Array]"]=te["[object Uint8ClampedArray]"]=te["[object Uint16Array]"]=te["[object Uint32Array]"]=!0,te["[object Error]"]=te["[object Function]"]=te["[object WeakMap]"]=!1;var re=function t(r,e,n,o,a,i){var c,u=1&e,f=2&e,s=4&e;if(n&&(c=a?n(r,o,a,i):n(r)),void 0!==c)return c;if(!T(r))return r;var l=It(r);if(l){if(c=Tr(r),!u)return ur(r,c)}else{var p=zr(r),v="[object Function]"==p||"[object GeneratorFunction]"==p;if(Ct(r))return cr(r,u);if("[object Object]"==p||"[object Arguments]"==p||v&&!a){if(c=f||v?{}:Jr(r),!u)return f?jr(r,ir(c,r)):hr(r,rr(c,r))}else{if(!te[p])return a?r:{};c=qr(r,p,u)}}i||(i=new gt);var h=i.get(r);if(h)return h;i.set(r,c),Zr(r)?r.forEach((function(o){c.add(t(o,e,n,o,r,i))})):Kr(r)&&r.forEach((function(o,a){c.set(a,t(o,e,n,a,r,i))}));var y=s?f?wr:_r:f?keysIn:tr,b=l?void 0:y(r);return _t(b||r,(function(o,a){b&&(o=r[a=o]),xt(c,a,t(o,e,n,a,r,i))})),c};var ee=function(t){return re(t,5)};var ne=function(t){return"symbol"==n(t)||Et(t)&&"[object Symbol]"==I(t)},oe=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ae=/^\w*$/;var ie=function(t,r){if(It(t))return!1;var e=n(t);return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=t&&!ne(t))||(ae.test(t)||!oe.test(t)||null!=r&&t in Object(r))};function ce(t,r){if("function"!=typeof t||null!=r&&"function"!=typeof r)throw new TypeError("Expected a function");var e=function e(){var n=arguments,o=r?r.apply(this,n):n[0],a=e.cache;if(a.has(o))return a.get(o);var i=t.apply(this,n);return e.cache=a.set(o,i)||a,i};return e.cache=new(ce.Cache||bt),e}ce.Cache=bt;var ue=ce;var fe=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,se=/\\(\\)?/g,le=function(t){var r=ue(t,(function(t){return 500===e.size&&e.clear(),t})),e=r.cache;return r}((function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(fe,(function(t,e,n,o){r.push(n?o.replace(se,"$1"):e||t)})),r}));var pe=function(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o},ve=x?x.prototype:void 0,he=ve?ve.toString:void 0;var ye=function t(r){if("string"==typeof r)return r;if(It(r))return pe(r,t)+"";if(ne(r))return he?he.call(r):"";var e=r+"";return"0"==e&&1/r==-1/0?"-0":e};var be=function(t){return null==t?"":ye(t)};var de=function(t,r){return It(t)?t:ie(t,r)?[t]:le(be(t))};var je=function(t){if("string"==typeof t||ne(t))return t;var r=t+"";return"0"==r&&1/t==-1/0?"-0":r};var ge=function(t,r){for(var e=0,n=(r=de(r,t)).length;null!=t&&e<n;)t=t[je(r[e++])];return e&&e==n?t:void 0};var _e=function(t,r,e){var n=null==t?void 0:ge(t,r);return void 0===n?e:n};function we(t){return"[object Object]"===Object.prototype.toString.call(t)}function me(t){return"[object String]"===Object.prototype.toString.call(t)}function Oe(t){return!(!me(t)||""===t)}function xe(t){var r=Object.prototype.toString.call(t);return"[object Function]"===r||"[object AsyncFunction]"===r}function Ae(t){return"[object Array]"===Object.prototype.toString.call(t)}function Se(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!function(t){if(we(t)){for(var r in t)return!1;return!0}return!1}(t)||(!!function(t){return!(!me(t)||""!==t)}(t)||!!function(t){return!!Ae(t)&&0===t.length}(t))))}function Ee(t){return!!Ae(t)&&(0!==t.length&&(1!==t.length||!Se(t[0])))}function Le(t,r){if(Oe(t))t=[t];else if(!Ee(t))return!1;if(Oe(r))r=[r];else if(!Ee(r))return!1;for(var e=0;e<t.length;e++)for(var n=0;n<r.length;n++)if(t[e]===r[n])return!0;return!1}return function(r){(r=ee(r)).port||(r.port=8080),r.portWeb||(r.portWeb=r.port+10);var e,n,a=[];function c(t){var e,n,o,a=((o=new Promise((function(){e=arguments[0],n=arguments[1]}))).resolve=e,o.reject=n,o);return xe(r.authenticate)?r.authenticate(t).then((function(t){a.resolve(t)})):a.resolve(!0),a}n="funcs",we(e=r)&&Oe(n)&&n in e&&(a=tr(r.funcs));var u={port:r.port,http:{port:r.portWeb,bundle:!0,static:"./"}},f=new t.Server(u),s=[];function l(t,r){var e={topic:t,payload:JSON.stringify(r),qos:2,retain:!1};f.publish(e,(function(t){t&&console.log("publish: error:",t)}))}function p(){return(p=i(o.mark((function t(e,n){var i,u,f,s;return o.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=_e(n,"token",""),t.next=3,c(i);case 3:if(!t.sent){t.next=25;break}if(u=_e(n,"func",""),f=_e(n,"input"),"getFuncs"!==u){t.next=15;break}if(!xe(r.filterFuncs)){t.next=12;break}return t.next=11,r.filterFuncs(i,a);case 11:a=t.sent;case 12:n.output={sys:"sys",funcs:a},t.next=23;break;case 15:if(!Le(a,u)){t.next=22;break}return t.next=18,r.funcs[u](f);case 18:s=t.sent,n.output=s,t.next=23;break;case 22:n.output={err:"can not find: ".concat(u)};case 23:t.next=26;break;case 25:n.output={err:"can not authenticate token: ".concat(i)};case 26:delete n.input,l(e,n);case 28:case"end":return t.stop()}}),t)})))).apply(this,arguments)}f.on("clientConnected",(function(t){s.push(t),xe(r.onClientChange)&&r.onClientChange(s,r)})),f.on("clientDisconnected",(function(t){s=s.filter((function(r){return r!==t})),xe(r.onClientChange)&&r.onClientChange(s,r)})),f.on("published",(function(t,r){var e=t.topic,n=t.payload.toString("utf8");n.indexOf('"output"')>=0||e.indexOf("topic|")>=0&&function(t,r){p.apply(this,arguments)}(e,function(t){if(!Oe(t))return{};var r={};try{r=JSON.parse(t)}catch(t){r={}}return r}(n))})),f.on("ready",(function(){f.authenticate=function(){var t=i(o.mark((function t(r,e,n,a){var i,u;return o.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=e,t.next=3,c(i);case 3:u=t.sent,a(null,u);case 5:case"end":return t.stop()}}),t)})));return function(r,e,n,o){return t.apply(this,arguments)}}(),console.log("Server running at: mqtt://localhost:".concat(r.port," and [web] mqtt://localhost:").concat(r.portWeb))}))}}));
//# sourceMappingURL=w-comor-mqtt-server.umd.js.map
