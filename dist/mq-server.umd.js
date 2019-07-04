/*!
 * mq-server v1.0.1
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("mosca")):"function"==typeof define&&define.amd?define(["mosca"],t):(e=e||self,e["mq-server"]=t(e.mosca))})(this,function(e){'use strict';function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function o(e,t){return t={exports:{}},e(t,t.exports),t.exports}function r(e,t,o,r,n,a,c){try{var p=e[a](c),i=p.value}catch(e){return void o(e)}p.done?t(i):Promise.resolve(i).then(r,n)}function n(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var r=e[t];this.set(r[0],r[1])}}function a(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":be&&be in Object(e)?de(e):ue(e)}function c(e){var o=t(e);return null!=e&&("object"==o||"function"==o)}function p(e){return!!me&&me in e}function i(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var r=e[t];this.set(r[0],r[1])}}function l(e){var o=t(e);return"string"==o||"number"==o||"symbol"==o||"boolean"==o?"__proto__"!==e:null===e}function d(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var r=e[t];this.set(r[0],r[1])}}function s(e){var t=this.__data__=new Z(e);this.size=t.size}function y(e,t,o){var r=e[t];Xe.call(e,t)&&Q(r,o)&&(o!==void 0||t in e)||Je(e,t,o)}function u(e){return null!=e&&"object"==t(e)}function b(e,o){var r=t(e);return o=null==o?9007199254740991:o,!!o&&("number"==r||"symbol"!=r&&st.test(e))&&-1<e&&0==e%1&&e<o}function h(e,t,o,r,n,a){var c,p=1&t,i=2&t;if(o&&(c=n?o(e,r,n,a):o(e)),void 0!==c)return c;if(!ge(e))return e;var l=it(e);if(!l){var d=wo(e),s="[object Function]"==d||"[object GeneratorFunction]"==d;if(dt(e))return Mt(e,p);if("[object Object]"!=d&&"[object Arguments]"!=d&&(!s||n)){if(!Yo[d])return n?e:{};c=Mo(e,d,p)}else if(c=i||s?{}:Do(e),!p)return i?Kt(e,Ct(c,e)):$t(e,Tt(c,e))}else if(c=Oo(e),!p)return Nt(e,c);a||(a=new Ve);var y=a.get(e);if(y)return y;if(a.set(e,c),$o(e))return e.forEach(function(r){c.add(h(r,t,o,r,e,a))}),c;if(qo(e))return e.forEach(function(r,n){c.set(n,h(r,t,o,n,e,a))}),c;var u=4&t?i?oo:to:i?keysIn:Et,b=l?void 0:u(e);return $e(b||e,function(r,n){b&&(n=r,r=e[n]),Ze(c,n,h(r,t,o,n,e,a))}),c}function g(){var e,t,o=new Promise(function(){e=arguments[0],t=arguments[1]});return o.resolve=e,o.reject=t,o}function f(e){var t=Object.prototype.toString.call(e);return"[object Object]"===t}function _(e){var t=Object.prototype.toString.call(e);return"[object String]"===t}function m(e){return!!(_(e)&&""!==e)}function x(e,t){return!!f(e)&&!!m(t)&&t in e}function S(e){return"symbol"==t(e)||tt(e)&&he(e)=="[object Symbol]"}function w(e,o){if(it(e))return!1;var r=t(e);return!!("number"==r||"symbol"==r||"boolean"==r||null==e||Jo(e))||Xo.test(e)||!Ho.test(e)||null!=o&&e in Object(o)}function A(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var o=function o(){var r=arguments,n=t?t.apply(this,r):r[0],a=o.cache;if(a.has(n))return a.get(n);var c=e.apply(this,r);return o.cache=a.set(n,c)||a,c};return o.cache=new(A.Cache||Re),o}function v(e){if("string"==typeof e)return e;if(it(e))return tr(e,v)+"";if(Jo(e))return nr?nr.call(e):"";var t=e+"";return"0"==t&&1/e==-or?"-0":t}function O(e){if(f(e)){for(var t in e)return!0;return!1}return!1}function L(e,t){return O(e)?m(t)?lr(e,t,""):"":""}function k(e){var t=Object.prototype.toString.call(e);return"[object Number]"===t}function E(e){var t=!1;return m(e)?t=!isNaN(+e):k(e)&&(t=!0),t}function T(e){if(!m(e)&&!E(e))return"";return e+""}function P(e,t){var o=L(e,t);return o=T(o),o}function F(e){if(!m(e))return{};var t={};try{t=JSON.parse(e)}catch(e){t={}}return t}function z(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t||"[object AsyncFunction]"===t}function I(e){var t=Object.prototype.toString.call(e);return"[object Array]"===t}function U(e){var t=Object.prototype.toString.call(e);return"[object Undefined]"===t}function C(e){var t=Object.prototype.toString.call(e);return"[object Null]"===t}function M(e){if(f(e)){for(var t in e)return!1;return!0}return!1}function N(e){return!!(_(e)&&""===e)}function G(e){return!!I(e)&&0===e.length}function D(e){return!!U(e)||!!C(e)||!!M(e)||!!N(e)||!!G(e)}function B(e){return!!I(e)&&0!==e.length&&!(1===e.length&&D(e[0]))}function W(e,t){if(m(e))e=[e];else if(B(e));else return!1;if(m(t))t=[t];else if(B(t));else return!1;for(var o=0;o<e.length;o++)for(var r=0;r<t.length;r++)if(e[o]===t[r])return!0;return!1}function q(t){function o(e){var o=g();return z(t.authenticate)?t.authenticate(e).then(function(e){o.resolve(e)}):o.resolve(!0),o}function r(e,t){var o={topic:e,payload:JSON.stringify(t),qos:2,retain:!1};l.publish(o,function(e){e&&console.log("publish: error:",e)})}function n(){return a.apply(this,arguments)}function a(){return a=Y($.mark(function e(n,a){var c,i,l,d,s;return $.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Server[port:".concat(t.port,"]: "),"topicUQid: "+n,a),c=P(a,"token"),e.next=4,o(c);case 4:if(i=e.sent,!i){e.next=26;break}if(l=P(a,"func"),d=L(a,"input"),"getFuncs"!==l){e.next=16;break}if(!z(t.filterFuncs)){e.next=13;break}return e.next=12,t.filterFuncs(c,p);case 12:p=e.sent;case 13:a={output:{sys:"sys",funcs:p}},e.next=24;break;case 16:if(!W(p,l)){e.next=23;break}return e.next=19,t.funcs[l](d);case 19:s=e.sent,a.output=s,e.next=24;break;case 23:a.output={err:"can not find: ".concat(l)};case 24:e.next=27;break;case 26:a.output={err:"can not authenticate token: ".concat(c)};case 27:r(n,a);case 28:case"end":return e.stop();}},e)})),a.apply(this,arguments)}function c(){l.authenticate=function(){var e=Y($.mark(function e(t,r,n,a){var c,p;return $.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return c=r,e.next=3,o(c);case 3:p=e.sent,a(null,p);case 5:case"end":return e.stop();}},e)}));return function(){return e.apply(this,arguments)}}(),console.log("Server running at: mqtt://localhost:".concat(t.port," and [web] mqtt://localhost:").concat(t.portWeb))}t=Qo(t),t.port||(t.port=8080),t.portWeb||(t.portWeb=t.port+10);var p=[];x(t,"funcs")&&(p=Et(t.funcs));var i={port:t.port,http:{port:t.portWeb,bundle:!0,static:"./"}},l=new e.Server(i),d=[];l.on("clientConnected",function(e){d.push(e),z(t.onClientChange)&&t.onClientChange(d,t)}),l.on("clientDisconnected",function(e){d=d.filter(function(t){return t!==e}),z(t.onClientChange)&&t.onClientChange(d,t)}),l.on("published",function(e){var t=e.topic,o=e.payload.toString("utf8");if(!(0<=o.indexOf("\"output\""))&&0<=t.indexOf("topic|")){var r=F(o);n(t,r)}}),l.on("ready",c)}e=e&&e.hasOwnProperty("default")?e["default"]:e;var R="undefined"==typeof globalThis?"undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?{}:self:global:window:globalThis,V=o(function(e){var o=function(e){function o(e,t,o,r){var a=t&&t.prototype instanceof n?t:n,c=Object.create(a.prototype),p=new u(r||[]);return c._invoke=l(e,o,p),c}function r(e,t,o){try{return{type:"normal",arg:e.call(t,o)}}catch(e){return{type:"throw",arg:e}}}function n(){}function a(){}function c(){}function p(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function i(e){function o(n,a,c,p){var i=r(e[n],e,a);if("throw"===i.type)p(i.arg);else{var l=i.arg,d=l.value;return d&&"object"===t(d)&&_.call(d,"__await")?Promise.resolve(d.__await).then(function(e){o("next",e,c,p)},function(e){o("throw",e,c,p)}):Promise.resolve(d).then(function(e){l.value=e,c(l)},function(e){return o("throw",e,c,p)})}}function n(e,t){function r(){return new Promise(function(r,n){o(e,t,r,n)})}return a=a?a.then(r,r):r()}var a;this._invoke=n}function l(e,t,o){var n="suspendedStart";return function(a,c){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw c;return h()}for(o.method=a,o.arg=c;;){var p=o.delegate;if(p){var i=d(p,o);if(i){if(i===w)continue;return i}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if("suspendedStart"===n)throw n="completed",o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);n="executing";var l=r(e,t,o);if("normal"===l.type){if(n=o.done?"completed":"suspendedYield",l.arg===w)continue;return{value:l.arg,done:o.done}}"throw"===l.type&&(n="completed",o.method="throw",o.arg=l.arg)}}}function d(e,t){var o=e.iterator[t.method];if(o===g){if(t.delegate=null,"throw"===t.method){if(e.iterator["return"]&&(t.method="return",t.arg=g,d(e,t),"throw"===t.method))return w;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return w}var n=r(o,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,w;var a=n.arg;if(!a)return t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,w;if(a.done)t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=g);else return a;return t.delegate=null,w}function s(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function y(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function u(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(s,this),this.reset(!0)}function b(e){if(e){var t=e[m];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,r=function t(){for(;++o<e.length;)if(_.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=g,t.done=!0,t};return r.next=r}}return{next:h}}function h(){return{value:g,done:!0}}var g,f=Object.prototype,_=f.hasOwnProperty,j="function"==typeof Symbol?Symbol:{},m=j.iterator||"@@iterator",x=j.asyncIterator||"@@asyncIterator",S=j.toStringTag||"@@toStringTag";e.wrap=o;var w={},A={};A[m]=function(){return this};var v=Object.getPrototypeOf,O=v&&v(v(b([])));O&&O!==f&&_.call(O,m)&&(A=O);var L=c.prototype=n.prototype=Object.create(A);return a.prototype=L.constructor=c,c.constructor=a,c[S]=a.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===a||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,c):(e.__proto__=c,!(S in e)&&(e[S]="GeneratorFunction")),e.prototype=Object.create(L),e},e.awrap=function(e){return{__await:e}},p(i.prototype),i.prototype[x]=function(){return this},e.AsyncIterator=i,e.async=function(t,r,n,a){var c=new i(o(t,r,n,a));return e.isGeneratorFunction(r)?c:c.next().then(function(e){return e.done?e.value:c.next()})},p(L),L[S]="Generator",L[m]=function(){return this},L.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var o in e)t.push(o);return t.reverse(),function o(){for(;t.length;){var r=t.pop();if(r in e)return o.value=r,o.done=!1,o}return o.done=!0,o}},e.values=b,u.prototype={constructor:u,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=g,this.done=!1,this.delegate=null,this.method="next",this.arg=g,this.tryEntries.forEach(y),!e)for(var t in this)"t"===t.charAt(0)&&_.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=g)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){function t(t,r){return a.type="throw",a.arg=e,o.next=t,r&&(o.method="next",o.arg=g),!!r}if(this.done)throw e;for(var o=this,r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r],a=n.completion;if("root"===n.tryLoc)return t("end");if(n.tryLoc<=this.prev){var c=_.call(n,"catchLoc"),p=_.call(n,"finallyLoc");if(c&&p){if(this.prev<n.catchLoc)return t(n.catchLoc,!0);if(this.prev<n.finallyLoc)return t(n.finallyLoc)}else if(c){if(this.prev<n.catchLoc)return t(n.catchLoc,!0);}else if(!p)throw new Error("try statement without catch or finally");else if(this.prev<n.finallyLoc)return t(n.finallyLoc)}}},abrupt:function(e,t){for(var o,r=this.tryEntries.length-1;0<=r;--r)if(o=this.tryEntries[r],o.tryLoc<=this.prev&&_.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}n&&("break"===e||"continue"===e)&&n.tryLoc<=t&&t<=n.finallyLoc&&(n=null);var a=n?n.completion:{};return a.type=e,a.arg=t,n?(this.method="next",this.next=n.finallyLoc,w):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),w},finish:function(e){for(var t,o=this.tryEntries.length-1;0<=o;--o)if(t=this.tryEntries[o],t.finallyLoc===e)return this.complete(t.completion,t.afterLoc),y(t),w},catch:function(e){for(var t,o=this.tryEntries.length-1;0<=o;--o)if(t=this.tryEntries[o],t.tryLoc===e){var r=t.completion;if("throw"===r.type){var n=r.arg;y(t)}return n}throw new Error("illegal catch attempt")},delegateYield:function(e,t,o){return this.delegate={iterator:b(e),resultName:t,nextLoc:o},"next"===this.method&&(this.arg=g),w}},e}(e.exports);try{regeneratorRuntime=o}catch(e){Function("r","regeneratorRuntime = r")(o)}}),$=V,Y=function(e){return function(){var t=this,o=arguments;return new Promise(function(n,a){function c(e){r(i,n,a,c,p,"next",e)}function p(e){r(i,n,a,c,p,"throw",e)}var i=e.apply(t,o);c(void 0)})}},Q=function(e,t){return e===t||e!==e&&t!==t},J=function(e,t){for(var o=e.length;o--;)if(Q(e[o][0],t))return o;return-1},H=Array.prototype,X=H.splice;n.prototype.clear=function(){this.__data__=[],this.size=0},n.prototype["delete"]=function(e){var t=this.__data__,o=J(t,e);if(0>o)return!1;var r=t.length-1;return o==r?t.pop():X.call(t,o,1),--this.size,!0},n.prototype.get=function(e){var t=this.__data__,o=J(t,e);return 0>o?void 0:t[o][1]},n.prototype.has=function(e){return-1<J(this.__data__,e)},n.prototype.set=function(e,t){var o=this.__data__,r=J(o,e);return 0>r?(++this.size,o.push([e,t])):o[r][1]=t,this};var Z=n,K="object"==t(R)&&R&&R.Object===Object&&R,ee=K,te="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,oe=ee||te||Function("return this")(),re=oe,ne=re.Symbol,ae=ne,ce=Object.prototype,pe=ce.hasOwnProperty,ie=ce.toString,le=ae?ae.toStringTag:void 0,de=function(e){var t=pe.call(e,le),o=e[le];try{e[le]=void 0;var r=!0}catch(t){}var n=ie.call(e);return r&&(t?e[le]=o:delete e[le]),n},se=Object.prototype,ye=se.toString,ue=function(e){return ye.call(e)},be=ae?ae.toStringTag:void 0,he=a,ge=c,fe=function(e){if(!ge(e))return!1;var t=he(e);return t=="[object Function]"||t=="[object GeneratorFunction]"||t=="[object AsyncFunction]"||t=="[object Proxy]"},_e=re["__core-js_shared__"],je=_e,me=function(){var e=/[^.]+$/.exec(je&&je.keys&&je.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),xe=Function.prototype,Se=xe.toString,we=function(e){if(null!=e){try{return Se.call(e)}catch(t){}try{return e+""}catch(t){}}return""},Ae=/[\\^$.*+?()[\]{}|]/g,ve=/^\[object .+?Constructor\]$/,Oe=Function.prototype,Le=Object.prototype,ke=Oe.toString,Ee=Le.hasOwnProperty,Te=RegExp("^"+ke.call(Ee).replace(Ae,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Pe=function(e){if(!ge(e)||p(e))return!1;var t=fe(e)?Te:ve;return t.test(we(e))},Fe=function(e,t){return null==e?void 0:e[t]},ze=function(e,t){var o=Fe(e,t);return Pe(o)?o:void 0},Ie=ze(re,"Map"),Ue=Ie,Ce=ze(Object,"create"),Me=Ce,Ne=Object.prototype,Ge=Ne.hasOwnProperty,De=Object.prototype,Be=De.hasOwnProperty;i.prototype.clear=function(){this.__data__=Me?Me(null):{},this.size=0},i.prototype["delete"]=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},i.prototype.get=function(e){var t=this.__data__;if(Me){var o=t[e];return o==="__lodash_hash_undefined__"?void 0:o}return Ge.call(t,e)?t[e]:void 0},i.prototype.has=function(e){var t=this.__data__;return Me?t[e]!==void 0:Be.call(t,e)},i.prototype.set=function(e,t){var o=this.__data__;return this.size+=this.has(e)?0:1,o[e]=Me&&void 0===t?"__lodash_hash_undefined__":t,this};var We=i,qe=function(e,t){var o=e.__data__;return l(t)?o["string"==typeof t?"string":"hash"]:o.map};d.prototype.clear=function(){this.size=0,this.__data__={hash:new We,map:new(Ue||Z),string:new We}},d.prototype["delete"]=function(e){var t=qe(this,e)["delete"](e);return this.size-=t?1:0,t},d.prototype.get=function(e){return qe(this,e).get(e)},d.prototype.has=function(e){return qe(this,e).has(e)},d.prototype.set=function(e,t){var o=qe(this,e),r=o.size;return o.set(e,t),this.size+=o.size==r?0:1,this};var Re=d;s.prototype.clear=function(){this.__data__=new Z,this.size=0},s.prototype["delete"]=function(e){var t=this.__data__,o=t["delete"](e);return this.size=t.size,o},s.prototype.get=function(e){return this.__data__.get(e)},s.prototype.has=function(e){return this.__data__.has(e)},s.prototype.set=function(e,t){var o=this.__data__;if(o instanceof Z){var r=o.__data__;if(!Ue||199>r.length)return r.push([e,t]),this.size=++o.size,this;o=this.__data__=new Re(r)}return o.set(e,t),this.size=o.size,this};var Ve=s,$e=function(e,t){for(var o=-1,r=null==e?0:e.length;++o<r&&!(!1===t(e[o],o,e)););return e},Ye=function(){try{var e=ze(Object,"defineProperty");return e({},"",{}),e}catch(t){}}(),Qe=Ye,Je=function(e,t,o){"__proto__"==t&&Qe?Qe(e,t,{configurable:!0,enumerable:!0,value:o,writable:!0}):e[t]=o},He=Object.prototype,Xe=He.hasOwnProperty,Ze=y,Ke=function(e,t,o,r){var n=!o;o||(o={});for(var a=-1,c=t.length;++a<c;){var p=t[a],i=r?r(o[p],e[p],p,o,e):void 0;i===void 0&&(i=e[p]),n?Je(o,p,i):Ze(o,p,i)}return o},et=function(e,t){for(var o=-1,r=Array(e);++o<e;)r[o]=t(o);return r},tt=u,ot=function(e){return tt(e)&&he(e)=="[object Arguments]"},rt=Object.prototype,nt=rt.hasOwnProperty,at=rt.propertyIsEnumerable,ct=ot(function(){return arguments}())?ot:function(e){return tt(e)&&nt.call(e,"callee")&&!at.call(e,"callee")},pt=Array.isArray,it=pt,lt=function(){return!1},dt=o(function(e,t){var o=t&&!t.nodeType&&t,r=o&&!0&&e&&!e.nodeType&&e,n=r&&r.exports===o,a=n?re.Buffer:void 0,c=a?a.isBuffer:void 0;e.exports=c||lt}),st=/^(?:0|[1-9]\d*)$/,yt=function(e){return"number"==typeof e&&-1<e&&0==e%1&&e<=9007199254740991},ut={};ut["[object Float32Array]"]=ut["[object Float64Array]"]=ut["[object Int8Array]"]=ut["[object Int16Array]"]=ut["[object Int32Array]"]=ut["[object Uint8Array]"]=ut["[object Uint8ClampedArray]"]=ut["[object Uint16Array]"]=ut["[object Uint32Array]"]=!0,ut["[object Arguments]"]=ut["[object Array]"]=ut["[object ArrayBuffer]"]=ut["[object Boolean]"]=ut["[object DataView]"]=ut["[object Date]"]=ut["[object Error]"]=ut["[object Function]"]=ut["[object Map]"]=ut["[object Number]"]=ut["[object Object]"]=ut["[object RegExp]"]=ut["[object Set]"]=ut["[object String]"]=ut["[object WeakMap]"]=!1;var bt=function(e){return function(t){return e(t)}},ht=o(function(e,t){var o=t&&!t.nodeType&&t,r=o&&!0&&e&&!e.nodeType&&e,n=r&&r.exports===o,a=n&&ee.process,c=function(){try{var e=r&&r.require&&r.require("util").types;return e?e:a&&a.binding&&a.binding("util")}catch(t){}}();e.exports=c}),gt=ht&&ht.isTypedArray,ft=gt?bt(gt):function(e){return tt(e)&&yt(e.length)&&!!ut[he(e)]},_t=Object.prototype,jt=_t.hasOwnProperty,mt=function(e,t){var o=it(e),r=!o&&ct(e),n=!o&&!r&&dt(e),a=!o&&!r&&!n&&ft(e),c=o||r||n||a,p=c?et(e.length,String):[],i=p.length;for(var l in e)(t||jt.call(e,l))&&!(c&&("length"==l||n&&("offset"==l||"parent"==l)||a&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||b(l,i)))&&p.push(l);return p},xt=Object.prototype,St=function(e){var t=e&&e.constructor,o="function"==typeof t&&t.prototype||xt;return e===o},wt=function(e,t){return function(o){return e(t(o))}},At=wt(Object.keys,Object),vt=Object.prototype,Ot=vt.hasOwnProperty,Lt=function(e){if(!St(e))return At(e);var t=[];for(var o in Object(e))Ot.call(e,o)&&"constructor"!=o&&t.push(o);return t},kt=function(e){return null!=e&&yt(e.length)&&!fe(e)},Et=function(e){return kt(e)?mt(e):Lt(e)},Tt=function(e,t){return e&&Ke(t,Et(t),e)},Pt=function(e){var t=[];if(null!=e)for(var o in Object(e))t.push(o);return t},Ft=Object.prototype,zt=Ft.hasOwnProperty,It=function(e){if(!ge(e))return Pt(e);var t=St(e),o=[];for(var r in e)("constructor"!=r||!t&&zt.call(e,r))&&o.push(r);return o},Ut=function(e){return kt(e)?mt(e,!0):It(e)},Ct=function(e,t){return e&&Ke(t,Ut(t),e)},Mt=o(function(e,t){var o=t&&!t.nodeType&&t,r=o&&!0&&e&&!e.nodeType&&e,n=r&&r.exports===o,a=n?re.Buffer:void 0,c=a?a.allocUnsafe:void 0;e.exports=function(e,t){if(t)return e.slice();var o=e.length,r=c?c(o):new e.constructor(o);return e.copy(r),r}}),Nt=function(e,t){var o=-1,r=e.length;for(t||(t=Array(r));++o<r;)t[o]=e[o];return t},Gt=function(e,t){for(var o=-1,r=null==e?0:e.length,n=0,a=[];++o<r;){var c=e[o];t(c,o,e)&&(a[n++]=c)}return a},Dt=function(){return[]},Bt=Object.prototype,Wt=Bt.propertyIsEnumerable,qt=Object.getOwnPropertySymbols,Rt=qt?function(e){return null==e?[]:(e=Object(e),Gt(qt(e),function(t){return Wt.call(e,t)}))}:Dt,Vt=Rt,$t=function(e,t){return Ke(e,Vt(e),t)},Yt=function(e,t){for(var o=-1,r=t.length,n=e.length;++o<r;)e[n+o]=t[o];return e},Qt=wt(Object.getPrototypeOf,Object),Jt=Qt,Ht=Object.getOwnPropertySymbols,Xt=Ht?function(e){for(var t=[];e;)Yt(t,Vt(e)),e=Jt(e);return t}:Dt,Zt=Xt,Kt=function(e,t){return Ke(e,Zt(e),t)},eo=function(e,t,o){var r=t(e);return it(e)?r:Yt(r,o(e))},to=function(e){return eo(e,Et,Vt)},oo=function(e){return eo(e,Ut,Zt)},ro=ze(re,"DataView"),no=ro,ao=ze(re,"Promise"),co=ao,po=ze(re,"Set"),io=po,lo=ze(re,"WeakMap"),so=lo,yo="[object Map]",uo="[object Promise]",bo="[object Set]",ho="[object WeakMap]",go="[object DataView]",fo=we(no),_o=we(Ue),jo=we(co),mo=we(io),xo=we(so),So=he;(no&&So(new no(new ArrayBuffer(1)))!=go||Ue&&So(new Ue)!=yo||co&&So(co.resolve())!=uo||io&&So(new io)!=bo||so&&So(new so)!=ho)&&(So=function(e){var t=he(e),o=t=="[object Object]"?e.constructor:void 0,r=o?we(o):"";if(r)switch(r){case fo:return go;case _o:return yo;case jo:return uo;case mo:return bo;case xo:return ho;}return t});var wo=So,Ao=Object.prototype,vo=Ao.hasOwnProperty,Oo=function(e){var t=e.length,o=new e.constructor(t);return t&&"string"==typeof e[0]&&vo.call(e,"index")&&(o.index=e.index,o.input=e.input),o},Lo=re.Uint8Array,ko=Lo,Eo=function(e){var t=new e.constructor(e.byteLength);return new ko(t).set(new ko(e)),t},To=function(e,t){var o=t?Eo(e.buffer):e.buffer;return new e.constructor(o,e.byteOffset,e.byteLength)},Po=/\w*$/,Fo=function(e){var t=new e.constructor(e.source,Po.exec(e));return t.lastIndex=e.lastIndex,t},zo=ae?ae.prototype:void 0,Io=zo?zo.valueOf:void 0,Uo=function(e){return Io?Object(Io.call(e)):{}},Co=function(e,t){var o=t?Eo(e.buffer):e.buffer;return new e.constructor(o,e.byteOffset,e.length)},Mo=function(e,t,o){var r=e.constructor;return"[object ArrayBuffer]"===t?Eo(e):"[object Boolean]"===t||"[object Date]"===t?new r(+e):"[object DataView]"===t?To(e,o):"[object Float32Array]"===t||"[object Float64Array]"===t||"[object Int8Array]"===t||"[object Int16Array]"===t||"[object Int32Array]"===t||"[object Uint8Array]"===t||"[object Uint8ClampedArray]"===t||"[object Uint16Array]"===t||"[object Uint32Array]"===t?Co(e,o):"[object Map]"===t?new r:"[object Number]"===t||"[object String]"===t?new r(e):"[object RegExp]"===t?Fo(e):"[object Set]"===t?new r:"[object Symbol]"===t?Uo(e):void 0},No=Object.create,Go=function(){function e(){}return function(t){if(!ge(t))return{};if(No)return No(t);e.prototype=t;var o=new e;return e.prototype=void 0,o}}(),Do=function(e){return"function"!=typeof e.constructor||St(e)?{}:Go(Jt(e))},Bo=ht&&ht.isMap,Wo=Bo?bt(Bo):function(e){return tt(e)&&wo(e)=="[object Map]"},qo=Wo,Ro=ht&&ht.isSet,Vo=Ro?bt(Ro):function(e){return tt(e)&&wo(e)=="[object Set]"},$o=Vo,Yo={};Yo["[object Arguments]"]=Yo["[object Array]"]=Yo["[object ArrayBuffer]"]=Yo["[object DataView]"]=Yo["[object Boolean]"]=Yo["[object Date]"]=Yo["[object Float32Array]"]=Yo["[object Float64Array]"]=Yo["[object Int8Array]"]=Yo["[object Int16Array]"]=Yo["[object Int32Array]"]=Yo["[object Map]"]=Yo["[object Number]"]=Yo["[object Object]"]=Yo["[object RegExp]"]=Yo["[object Set]"]=Yo["[object String]"]=Yo["[object Symbol]"]=Yo["[object Uint8Array]"]=Yo["[object Uint8ClampedArray]"]=Yo["[object Uint16Array]"]=Yo["[object Uint32Array]"]=!0,Yo["[object Error]"]=Yo["[object Function]"]=Yo["[object WeakMap]"]=!1;var Qo=function(e){return h(e,5)},Jo=S,Ho=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Xo=/^\w*$/;A.Cache=Re;var Zo=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Ko=/\\(\\)?/g,er=function(e){var t=A(e,function(e){return 500===o.size&&o.clear(),e}),o=t.cache;return t}(function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(Zo,function(e,o,r,n){t.push(r?n.replace(Ko,"$1"):o||e)}),t}),tr=function(e,t){for(var o=-1,r=null==e?0:e.length,n=Array(r);++o<r;)n[o]=t(e[o],o,e);return n},or=1/0,rr=ae?ae.prototype:void 0,nr=rr?rr.toString:void 0,ar=function(e){return null==e?"":v(e)},cr=function(e,t){return it(e)?e:w(e,t)?[e]:er(ar(e))},pr=function(e){if("string"==typeof e||Jo(e))return e;var t=e+"";return"0"==t&&1/e==-(1/0)?"-0":t},ir=function(e,t){t=cr(t,e);for(var o=0,r=t.length;null!=e&&o<r;)e=e[pr(t[o++])];return o&&o==r?e:void 0},lr=function(e,t,o){var r=null==e?void 0:ir(e,t);return r===void 0?o:r};return q});
//# sourceMappingURL=mq-server.umd.js.map
