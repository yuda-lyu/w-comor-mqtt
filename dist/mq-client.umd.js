/*!
 * mq-client v1.0.7
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("mqtt")):"function"==typeof define&&define.amd?define(["mqtt"],t):(e=e||self,e["mq-client"]=t(e.mqtt))})(this,function(e){'use strict';function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,t){return t={exports:{}},e(t,t.exports),t.exports}function o(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":ie&&ie in Object(e)?te(e):re(e)}function r(e){return null!=e&&"object"==t(e)}function i(e){return"symbol"==t(e)||ce(e)&&de(e)=="[object Symbol]"}function d(e,n){if(R(e))return!1;var o=t(e);return!!("number"==o||"symbol"==o||"boolean"==o||null==e||ae(e))||le.test(e)||!pe.test(e)||null!=n&&e in Object(n)}function c(e){var n=t(e);return null!=e&&("object"==n||"function"==n)}function a(e){return!!be&&be in e}function p(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}function l(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}function s(e){var n=t(e);return"string"==n||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==e:null===e}function u(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}function y(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var n=function n(){var o=arguments,r=t?t.apply(this,o):o[0],i=n.cache;if(i.has(r))return i.get(r);var d=e.apply(this,o);return n.cache=i.set(r,d)||i,d};return n.cache=new(y.Cache||Re),n}function f(e){if("string"==typeof e)return e;if(R(e))return Ve(e,f)+"";if(ae(e))return Xe?Xe.call(e):"";var t=e+"";return"0"==t&&1/e==-Qe?"-0":t}function b(e,t,n){var o=e[t];it.call(e,t)&&Ne(o,n)&&(n!==void 0||t in e)||ot(e,t,n)}function _(e,n){var o=t(e);return n=null==n?9007199254740991:n,!!n&&("number"==o||"symbol"!=o&&dt.test(e))&&-1<e&&0==e%1&&e<n}function g(){var e,t,n=new Promise(function(){e=arguments[0],t=arguments[1]});return n.resolve=e,n.reject=t,n}function h(e){var t=Object.prototype.toString.call(e);return"[object String]"===t}function m(e){return!!(h(e)&&""!==e)}function S(e){var t=Object.prototype.toString.call(e);return"[object Number]"===t}function x(e){var t=!1;return m(e)?t=!isNaN(+e):S(e)&&(t=!0),t}function k(e){if(!x(e))return 0;var t=Ht(e);return t}function A(e){return!!x(e)&&(e=k(e),Yt(e))}function O(e){if(!x(e))return 0;e=k(e);var t=en(e);return"0"===t+""?0:t}function T(e){if(!A(e))return!1;var t=0<O(e);return t}function z(){var e,t=0<arguments.length&&arguments[0]!==void 0?arguments[0]:32,n=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],o=[],d=n.length;if(T(t))for(e=0;e<t;e++)o[e]=n[0|Math.random()*d];else if("rfc4122"===t){o[8]=o[13]=o[18]=o[23]="-",o[14]="4";var c;for(e=0;36>e;e++)o[e]||(c=0|16*Math.random(),o[e]=n[19===e?8|3&c:c])}else return"";var a=o.join("");return a}function P(e){if(!m(e))return{};var t={};try{t=JSON.parse(e)}catch(e){t={}}return t}function w(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t||"[object AsyncFunction]"===t}function F(e){var t=Object.prototype.toString.call(e);return"[object Array]"===t}function q(e){var t=Object.prototype.toString.call(e);return"[object Undefined]"===t}function U(e){var t=Object.prototype.toString.call(e);return"[object Null]"===t}function I(e){var t=Object.prototype.toString.call(e);return"[object Object]"===t}function E(e){if(I(e)){for(var t in e)return!1;return!0}return!1}function N(e){return!!(h(e)&&""===e)}function B(e){return!!F(e)&&0===e.length}function C(e){return!!q(e)||!!U(e)||!!E(e)||!!N(e)||!!B(e)}function M(e){return!!F(e)&&0!==e.length&&!(1===e.length&&C(e[0]))}function $(e,t){if(m(e))e=[e];else if(M(e));else return!1;if(m(t))t=[t];else if(M(t));else return!1;for(var n=0;n<e.length;n++)for(var o=0;o<t.length;o++)if(e[n]===t[o])return!0;return!1}e=e&&e.hasOwnProperty("default")?e["default"]:e;var D=Array.isArray,R=D,W="undefined"==typeof globalThis?"undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?{}:self:global:window:globalThis,G="object"==t(W)&&W&&W.Object===Object&&W,L=G,V="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,Q=L||V||Function("return this")(),H=Q,X=H.Symbol,Y=X,Z=Object.prototype,K=Z.hasOwnProperty,J=Z.toString,ee=Y?Y.toStringTag:void 0,te=function(e){var t=K.call(e,ee),n=e[ee];try{e[ee]=void 0;var o=!0}catch(t){}var r=J.call(e);return o&&(t?e[ee]=n:delete e[ee]),r},ne=Object.prototype,oe=ne.toString,re=function(e){return oe.call(e)},ie=Y?Y.toStringTag:void 0,de=o,ce=r,ae=i,pe=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,le=/^\w*$/,se=c,ue=function(e){if(!se(e))return!1;var t=de(e);return t=="[object Function]"||t=="[object GeneratorFunction]"||t=="[object AsyncFunction]"||t=="[object Proxy]"},ye=H["__core-js_shared__"],fe=ye,be=function(){var e=/[^.]+$/.exec(fe&&fe.keys&&fe.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),_e=Function.prototype,ge=_e.toString,he=function(e){if(null!=e){try{return ge.call(e)}catch(t){}try{return e+""}catch(t){}}return""},je=/[\\^$.*+?()[\]{}|]/g,me=/^\[object .+?Constructor\]$/,Se=Function.prototype,xe=Object.prototype,ke=Se.toString,Ae=xe.hasOwnProperty,Oe=RegExp("^"+ke.call(Ae).replace(je,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Te=function(e){if(!se(e)||a(e))return!1;var t=ue(e)?Oe:me;return t.test(he(e))},ze=function(e,t){return null==e?void 0:e[t]},Pe=function(e,t){var n=ze(e,t);return Te(n)?n:void 0},we=Pe(Object,"create"),Fe=we,qe=Object.prototype,ve=qe.hasOwnProperty,Ue=Object.prototype,Ie=Ue.hasOwnProperty;p.prototype.clear=function(){this.__data__=Fe?Fe(null):{},this.size=0},p.prototype["delete"]=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},p.prototype.get=function(e){var t=this.__data__;if(Fe){var n=t[e];return n==="__lodash_hash_undefined__"?void 0:n}return ve.call(t,e)?t[e]:void 0},p.prototype.has=function(e){var t=this.__data__;return Fe?t[e]!==void 0:Ie.call(t,e)},p.prototype.set=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=Fe&&void 0===t?"__lodash_hash_undefined__":t,this};var Ee=p,Ne=function(e,t){return e===t||e!==e&&t!==t},Be=function(e,t){for(var n=e.length;n--;)if(Ne(e[n][0],t))return n;return-1},Ce=Array.prototype,Me=Ce.splice;l.prototype.clear=function(){this.__data__=[],this.size=0},l.prototype["delete"]=function(e){var t=this.__data__,n=Be(t,e);if(0>n)return!1;var o=t.length-1;return n==o?t.pop():Me.call(t,n,1),--this.size,!0},l.prototype.get=function(e){var t=this.__data__,n=Be(t,e);return 0>n?void 0:t[n][1]},l.prototype.has=function(e){return-1<Be(this.__data__,e)},l.prototype.set=function(e,t){var n=this.__data__,o=Be(n,e);return 0>o?(++this.size,n.push([e,t])):n[o][1]=t,this};var $e=Pe(H,"Map"),De=function(e,t){var n=e.__data__;return s(t)?n["string"==typeof t?"string":"hash"]:n.map};u.prototype.clear=function(){this.size=0,this.__data__={hash:new Ee,map:new($e||l),string:new Ee}},u.prototype["delete"]=function(e){var t=De(this,e)["delete"](e);return this.size-=t?1:0,t},u.prototype.get=function(e){return De(this,e).get(e)},u.prototype.has=function(e){return De(this,e).has(e)},u.prototype.set=function(e,t){var n=De(this,e),o=n.size;return n.set(e,t),this.size+=n.size==o?0:1,this};var Re=u;y.Cache=Re;var We=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Ge=/\\(\\)?/g,Le=function(e){var t=y(e,function(e){return 500===n.size&&n.clear(),e}),n=t.cache;return t}(function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(We,function(e,n,o,r){t.push(o?r.replace(Ge,"$1"):n||e)}),t}),Ve=function(e,t){for(var n=-1,o=null==e?0:e.length,r=Array(o);++n<o;)r[n]=t(e[n],n,e);return r},Qe=1/0,He=Y?Y.prototype:void 0,Xe=He?He.toString:void 0,Ye=function(e){return null==e?"":f(e)},Ze=function(e,t){return R(e)?e:d(e,t)?[e]:Le(Ye(e))},Ke=function(e){if("string"==typeof e||ae(e))return e;var t=e+"";return"0"==t&&1/e==-(1/0)?"-0":t},Je=function(e,t){t=Ze(t,e);for(var n=0,o=t.length;null!=e&&n<o;)e=e[Ke(t[n++])];return n&&n==o?e:void 0},et=function(e,t,n){var o=null==e?void 0:Je(e,t);return o===void 0?n:o},tt=function(){try{var e=Pe(Object,"defineProperty");return e({},"",{}),e}catch(t){}}(),nt=tt,ot=function(e,t,n){"__proto__"==t&&nt?nt(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n},rt=Object.prototype,it=rt.hasOwnProperty,dt=/^(?:0|[1-9]\d*)$/,ct=_,at=function(e,t,n,o){if(!se(e))return e;t=Ze(t,e);for(var r=-1,i=t.length,d=e;null!=d&&++r<i;){var c=Ke(t[r]),a=n;if(r!=i-1){var p=d[c];a=o?o(p,c,d):void 0,a===void 0&&(a=se(p)?p:ct(t[r+1])?[]:{})}b(d,c,a),d=d[c]}return e},pt=function(e,t,n){return null==e?e:at(e,t,n)},lt=function(e,t){for(var n=-1,o=null==e?0:e.length;++n<o&&!(!1===t(e[n],n,e)););return e},st=function(e){return function(t,n,o){for(var r=-1,i=Object(t),d=o(t),c=d.length;c--;){var a=d[e?c:++r];if(!1===n(i[a],a,i))break}return t}}(),ut=function(e,t){for(var n=-1,o=Array(e);++n<e;)o[n]=t(n);return o},yt=function(e){return ce(e)&&de(e)=="[object Arguments]"},ft=Object.prototype,bt=ft.hasOwnProperty,_t=ft.propertyIsEnumerable,gt=yt(function(){return arguments}())?yt:function(e){return ce(e)&&bt.call(e,"callee")&&!_t.call(e,"callee")},ht=function(){return!1},jt=n(function(e,t){var n=t&&!t.nodeType&&t,o=n&&!0&&e&&!e.nodeType&&e,r=o&&o.exports===n,i=r?H.Buffer:void 0,d=i?i.isBuffer:void 0;e.exports=d||ht}),mt=function(e){return"number"==typeof e&&-1<e&&0==e%1&&e<=9007199254740991},St={};St["[object Float32Array]"]=St["[object Float64Array]"]=St["[object Int8Array]"]=St["[object Int16Array]"]=St["[object Int32Array]"]=St["[object Uint8Array]"]=St["[object Uint8ClampedArray]"]=St["[object Uint16Array]"]=St["[object Uint32Array]"]=!0,St["[object Arguments]"]=St["[object Array]"]=St["[object ArrayBuffer]"]=St["[object Boolean]"]=St["[object DataView]"]=St["[object Date]"]=St["[object Error]"]=St["[object Function]"]=St["[object Map]"]=St["[object Number]"]=St["[object Object]"]=St["[object RegExp]"]=St["[object Set]"]=St["[object String]"]=St["[object WeakMap]"]=!1;var xt=n(function(e,t){var n=t&&!t.nodeType&&t,o=n&&!0&&e&&!e.nodeType&&e,r=o&&o.exports===n,i=r&&L.process,d=function(){try{var e=o&&o.require&&o.require("util").types;return e?e:i&&i.binding&&i.binding("util")}catch(t){}}();e.exports=d}),kt=xt&&xt.isTypedArray,At=kt?function(e){return function(t){return e(t)}}(kt):function(e){return ce(e)&&mt(e.length)&&!!St[de(e)]},Ot=Object.prototype,Tt=Ot.hasOwnProperty,zt=function(e,t){var n=R(e),o=!n&&gt(e),r=!n&&!o&&jt(e),i=!n&&!o&&!r&&At(e),d=n||o||r||i,c=d?ut(e.length,String):[],a=c.length;for(var p in e)(t||Tt.call(e,p))&&!(d&&("length"==p||r&&("offset"==p||"parent"==p)||i&&("buffer"==p||"byteLength"==p||"byteOffset"==p)||ct(p,a)))&&c.push(p);return c},Pt=Object.prototype,wt=function(e){var t=e&&e.constructor,n="function"==typeof t&&t.prototype||Pt;return e===n},Ft=function(e,t){return function(n){return e(t(n))}}(Object.keys,Object),qt=Object.prototype,vt=qt.hasOwnProperty,Ut=function(e){if(!wt(e))return Ft(e);var t=[];for(var n in Object(e))vt.call(e,n)&&"constructor"!=n&&t.push(n);return t},It=function(e){return null!=e&&mt(e.length)&&!ue(e)},Et=function(e){return It(e)?zt(e):Ut(e)},Nt=function(e,t){return function(n,o){if(null==n)return n;if(!It(n))return e(n,o);for(var r=n.length,i=t?r:-1,d=Object(n);(t?i--:++i<r)&&!(!1===o(d[i],i,d)););return n}}(function(e,t){return e&&st(e,t,Et)}),Bt=function(e){return e},Ct=function(e){return"function"==typeof e?e:Bt},Mt=function(e,t){var n=R(e)?lt:Nt;return n(e,Ct(t))},$t=0/0,Dt=/^\s+|\s+$/g,Rt=/^[-+]0x[0-9a-f]+$/i,Wt=/^0b[01]+$/i,Gt=/^0o[0-7]+$/i,Lt=parseInt,Vt=function(e){if("number"==typeof e)return e;if(ae(e))return $t;if(se(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=se(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(Dt,"");var n=Wt.test(e);return n||Gt.test(e)?Lt(e.slice(2),n?2:8):Rt.test(e)?$t:+e},Qt=1/0,Ht=function(e){if(!e)return 0===e?e:0;if(e=Vt(e),e===Qt||e===-Qt){var t=0>e?-1:1;return 1.7976931348623157e+308*t}return e===e?e:0},Xt=function(e){var t=Ht(e),n=t%1;return t===t?n?t-n:t:0},Yt=function(e){return"number"==typeof e&&e==Xt(e)},Zt=H.isFinite,Kt=Math.min,Jt=function(e){var t=Math[e];return function(e,n){if(e=Vt(e),n=null==n?0:Kt(Xt(n),292),n&&Zt(e)){var o=(Ye(e)+"e").split("e"),r=t(o[0]+"e"+(+o[1]+n));return o=(Ye(r)+"e").split("e"),+(o[0]+"e"+(+o[1]-n))}return t(e)}}("round"),en=Jt;return function(n){function o(){function o(e){var t=g();return y.connected?y.subscribe(e,{qos:2},function(e){e?t.reject("subscribe error: no send"):t.resolve()}):t.reject("subscribe error: no connect"),t}function r(e){i(u,e)}function i(e,t){y.connected&&y.publish(e,JSON.stringify(t),{qos:2,retain:!1})}function c(e){var o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,i=g(),d=z(),c={token:n.token,_id:d,func:e,input:o};a[d]=null,r(c);var p=setInterval(function(){if(null!==a[d]){var e=et(a[d],"output");delete a[d],i.resolve(e),clearInterval(p)}},1e3);return i}var p=g(),l={},s=z();t=s,n.url||(n.url="mqtt://localhost:8080"),n.token||(n.token="*");var u="topic|"+z(),y=null;try{y=e.connect(n.url,{username:n.token})}catch(e){return d(),p.reject(),p}return y.on("connect",function(){t===s?(w(n.open)&&n.open(),o(u).then(function(){return c("getFuncs",null)})["catch"](function(e){w(n.error)&&n.error(e)})):y.end()}),y.on("message",function(e,n){if(t===s){var o=P(n.toString("utf8"));if("sys"===et(o,"output.sys")&&et(o,"output.funcs")){for(var r=o.output.funcs,d=function(e){var t=r[e];pt(l,t,function(e){return c(t,e)})},u=0;u<r.length;u++)d(u);p.resolve(l)}et(o,"_id")&&et(o,"output")&&(a[o._id]=o)}else y.end()}),y.on("reconnect",function(){}),y.on("offline",function(){y.end(),w(n.close)&&n.close(),d()}),y.on("error",function(e){w(n.error)&&n.error(e)}),p}function r(e){if(0===l)l++,p=e,c.resolve(p);else{var t=Et(p),n=Et(e);Mt(n,function(t){p[t]=e[t]}),Mt(t,function(e){$(n,e)||delete p[e]})}}function i(){new o().then(function(e){r(e)})["catch"](function(){})}function d(){setTimeout(function(){w(n.reconn)&&n.reconn(),i()},5e3)}var c=g(),t="",a={},p={},l=0;return i(),c}});
//# sourceMappingURL=mq-client.umd.js.map
