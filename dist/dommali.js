!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dommali=e()}(this,(function(){"use strict";var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};function e(t){return"string"==typeof t||t instanceof String}var n=Array.isArray;function r(t){return Array.prototype.slice.call(t)}var i=Object.prototype.hasOwnProperty;function s(t){for(var e in t)if(i.call(t,e))return!1;return!0}function o(t){return t.replace(/-[a-z]/gi,(function(t){return t[1].toUpperCase()}))}var u={};var c=function(){function t(){this.Subjects=[]}return t.ready=function(t){return h&&!a?t():l.push(t),this},Object.defineProperty(t.prototype,"length",{get:function(){return this.Subjects.length},enumerable:!1,configurable:!0}),t.prototype.size=function(){return this.Subjects.length},t.prototype.isEmpty=function(){return 0===this.Subjects.length},t.prototype.subjects=function(){return this.Subjects.slice()},t.prototype.subject=function(t){return this.Subjects[t]},t.prototype.indexOf=function(e){return e instanceof t&&null==(e=e.Subjects[0])?-1:this.Subjects.indexOf(e)},t.prototype.slice=function(t,e){return new f(this.Subjects.slice(t,e))},t.prototype.first=function(){return new f(this.Subjects[0])},t.prototype.last=function(){return new f(this.Subjects[this.Subjects.length-1])},t.prototype.eq=function(t){return new f(this.Subjects[t])},t.prototype.forEach=function(t){var e=this;return this.Subjects.forEach((function(n,r){t(new f(n),r,e)})),this},t.prototype.filter=function(t){var e=this;return new f("function"==typeof t?this.Subjects.filter((function(n,r){return t(new f(n),r,e)})):this.Subjects.filter((function(e){return e.matches(t)})))},t.prototype.matches=function(t){return this.Subjects.every((function(e){return e.matches(t)}))},t.prototype.find=function(t){return new f(0===this.Subjects.length?void 0:r(this.Subjects[0].querySelectorAll(t)))},t.prototype.findFirst=function(t){return new f(0===this.Subjects.length?void 0:this.Subjects[0].querySelector(t))},t.prototype.parent=function(){return new f(0===this.Subjects.length?void 0:this.Subjects[0].parentElement)},t.prototype.closest=function(t){return new f(0===this.Subjects.length?void 0:this.Subjects[0].closest(t))},t.prototype.isAttached=function(){return 0!==this.Subjects.length&&document.contains(this.Subjects[0])},t.prototype.contains=function(t){var e=this;return 0!==this.Subjects.length&&0!==t.Subjects.length&&t.Subjects.every((function(t){return e.Subjects[0].contains(t)}))},t.prototype.children=function(t){var e=0===this.Subjects.length?[]:r(this.Subjects[0].children);return null!=t&&(e=e.filter((function(e){return e.matches(t)}))),new f(e)},t.prototype.firstChild=function(t){return 0===this.Subjects.length?new f:new f(null==t?this.Subjects[0].firstElementChild:r(this.Subjects[0].children).find((function(e){return e.matches(t)})))},t.prototype.lastChild=function(t){if(0===this.Subjects.length)return new f;if(null==t)return new f(this.Subjects[0].lastElementChild);for(var e=r(this.Subjects[0].children),n=e.length-1;n>=0;n--)if(e[n].matches(t))return new f(e[n]);return new f},t.prototype.prev=function(t){if(0===this.Subjects.length)return new f;if(null==t)return new f(this.Subjects[0].previousElementSibling);for(var e=this.Subjects[0].previousElementSibling;null!=e;){if(e.matches(t))return new f(e);e=e.previousElementSibling}return new f},t.prototype.next=function(t){if(0===this.Subjects.length)return new f;if(null==t)return new f(this.Subjects[0].nextElementSibling);for(var e=this.Subjects[0].nextElementSibling;null!=e;){if(e.matches(t))return new f(e);e=e.nextElementSibling}return new f},t.prototype.positionInViewport=function(){if(0!==this.Subjects.length){var t=this.Subjects[0].getBoundingClientRect();return{left:t.left,top:t.top}}},t.prototype.positionInParent=function(){if(0!==this.Subjects.length&&null!=this.Subjects[0].parentElement&&this.Subjects[0]instanceof HTMLElement){var t=this.Subjects[0];return t instanceof HTMLElement?{left:t.offsetLeft,top:t.offsetTop}:void 0}},t.prototype.positionOnPage=function(){if(0!==this.Subjects.length){for(var t=this.Subjects[0],e=0,n=0;t instanceof HTMLElement;)e+=t.offsetLeft,n+=t.offsetTop,t=t.offsetParent;return{left:e,top:n}}},t.prototype.width=function(t){if(void 0===t){var e=this.Subjects[0];return e instanceof HTMLElement?e.offsetWidth:void 0}return this.Subjects.forEach((function(e){e instanceof HTMLElement&&(e.style.width=t+"px")})),this},t.prototype.height=function(t){if(void 0===t){var e=this.Subjects[0];return e instanceof HTMLElement?e.offsetHeight:void 0}return this.Subjects.forEach((function(e){e instanceof HTMLElement&&(e.style.height=t+"px")})),this},t.prototype.innerWidth=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].clientWidth},t.prototype.innerHeight=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].clientHeight},t.prototype.renderWidth=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].getBoundingClientRect().width},t.prototype.renderHeight=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].getBoundingClientRect().height},t.prototype.scrollLeft=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].scrollLeft},t.prototype.scrollTop=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].scrollTop},t.prototype.scrollWidth=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].scrollWidth},t.prototype.scrollHeight=function(){return 0===this.Subjects.length?void 0:this.Subjects[0].scrollHeight},t.prototype.scrollTo=function(t,e,n){void 0===n&&(n="auto");var r={left:t,top:e,behavior:n};return this.Subjects.forEach((function(t){t.scrollTo(r)})),this},t.prototype.show=function(t){return this.Subjects.forEach((function(t){if(t instanceof HTMLElement){var e=getComputedStyle(t);if("none"!==e.display)return;null!=t._preservedDisplay&&(t.style.display=t._preservedDisplay),"none"===e.display&&(t.style.display=function(t){if(t in u)return u[t];var e=document.createElement(t);document.body.appendChild(e);var n=getComputedStyle(e).display;return"none"===n&&(n="block"),u[t]=n,document.body.removeChild(e),n}(t.tagName))}})),this},t.prototype.hide=function(){return this.Subjects.forEach((function(t){if(t instanceof HTMLElement){if("none"===getComputedStyle(t).display)return;t._preservedDisplay=t.style.display,t.style.display="none"}})),this},t.prototype.hasClass=function(t){if(0===this.Subjects.length)return!1;if(""===(t=t.trim().replace(/\s+/g," ")))return!1;var e=this.Subjects[0].classList;return t.split(" ").every((function(t){return e.contains(t)}))},t.prototype.addClass=function(t){return this._processClasses(t,"add")},t.prototype.toggleClass=function(t){return this._processClasses(t,"toggle")},t.prototype.removeClass=function(t){return this._processClasses(t,"remove")},t.prototype._processClasses=function(t,e){if(0===this.Subjects.length)return this;if(""===(t=t.trim().replace(/\s+/g," ")))return this;var n=t.split(" ");return this.Subjects.forEach((function(t){var r=t.classList;n.forEach((function(t){return r[e](t)}))})),this},t.prototype.append=function(t){return this._insert(t,"append")},t.prototype.prepend=function(t){return this._insert(t,"prepend")},t.prototype.insertAfter=function(t){return t._insert(this,"after"),this},t.prototype.insertBefore=function(t){return t._insert(this,"before"),this},t.prototype._insert=function(e,n){return 0===this.Subjects.length?this:(e instanceof t||(e=new f(e)),0===e.Subjects.length||this.Subjects.forEach((function(t){t[n].apply(t,e.Subjects)})),this)},t.prototype.replaceWith=function(e){if(0!==this.Subjects.length)if(e instanceof t||(e=new f(e)),0!==e.Subjects.length){var n=this.Subjects[0];n.replaceWith.apply(n,e.Subjects)}else this.remove()},t.prototype.remove=function(){return 0===this.Subjects.length||this.Subjects.forEach((function(t){t.remove()})),this},t.prototype.prop=function(t,e){return void 0===e?0===this.Subjects.length?void 0:this.Subjects[0][t]:(this.Subjects.forEach((function(n){n[t]=e})),this)},t.prototype.hasProp=function(t){return 0!==this.Subjects.length&&t in this.Subjects[0]},t.prototype.removeProp=function(t){return this.Subjects.forEach((function(e){delete e[t]})),this},t.prototype.data=function(t,e){return void 0===e?0===this.Subjects.length||null==this.Subjects[0]._data?void 0:this.Subjects[0]._data[t]:(this.Subjects.forEach((function(n){null==n._data&&(n._data=Object.create(null)),n._data[t]=e})),this)},t.prototype.hasData=function(t){return this.Subjects.length>0&&null!=this.Subjects[0]._data&&t in this.Subjects[0]._data},t.prototype.removeData=function(t){return this.Subjects.forEach((function(e){null!=e._data&&delete e._data[t]})),this},t.prototype.attr=function(t,e){if(void 0===e){if(0===this.Subjects.length)return;var n=this.Subjects[0].getAttribute(t);return null===n?void 0:n}return null===e?this.removeAttr(t):(this.Subjects.forEach((function(n){n.setAttribute(t,e)})),this)},t.prototype.hasAttr=function(t){return 0!==this.Subjects.length&&this.Subjects[0].hasAttribute(t)},t.prototype.removeAttr=function(t){return this.Subjects.forEach((function(e){e.removeAttribute(t)})),this},t.prototype.css=function(t,e){if(void 0!==e){if("string"==typeof t){var r=o(t);return this.Subjects.forEach((function(t){t instanceof HTMLElement&&(t.style[r]=e)})),this}throw new TypeError("single attribute name expected")}switch(!0){case"string"==typeof t:if(0===this.Subjects.length)return;var i=window.getComputedStyle(this.Subjects[0]);return i[o(t)];case n(t):if(0===this.Subjects.length)return;i=window.getComputedStyle(this.Subjects[0]);var s={};return t.forEach((function(t){s[t]=i[o(t)]})),s;default:if(0===this.Subjects.length)return this;var u=function(n){t.hasOwnProperty(n)&&(e=t[n],n=o(n),c.Subjects.forEach((function(t){t instanceof HTMLElement&&(t.style[n]=e)})))},c=this;for(var h in t)u(h);return this}},t.prototype.html=function(t){return void 0===t?0===this.Subjects.length?void 0:this.Subjects[0].innerHTML:(null===t&&(t=""),this.Subjects.forEach((function(e){e.innerHTML=t})),this)},t.prototype.text=function(t){return void 0===t?0!==this.Subjects.length&&this.Subjects[0]instanceof HTMLElement?this.Subjects[0].innerText:void 0:(null===t&&(t=""),this.Subjects.forEach((function(e){e instanceof HTMLElement&&(e.innerText=t)})),this)},t.prototype.appendText=function(t){return this.Subjects.forEach((function(e){e.insertAdjacentText("beforeend",t)})),this},t.prototype.prependText=function(t){return this.Subjects.forEach((function(e){e.insertAdjacentText("afterbegin",t)})),this},t.prototype.on=function(t,e,n,r){return 0===this.Subjects.length?this:this._registerEventHandler(t,e,n,r)},t.prototype.once=function(t,e,n,r){return 0===this.Subjects.length?this:this._registerEventHandler(t,e,n,r,"once")},t.prototype._registerEventHandler=function(t,n,i,s,o){var u=r(arguments).slice(1);if(""===(t=t.trim().replace(/\s+/g," ")))return this;var c=e(u[0])?u.shift().trim():null==u[0]&&u.shift()||"",h="function"==typeof u[1]?u.shift():void 0;return s=u.shift(),this.__registerEventHandler(t,c,h,s,o)},t.prototype.__registerEventHandler=function(t,e,n,r,i){var s=this;function o(t){switch(e){case"":break;case"@this":if(t.target!==t.currentTarget)return;break;default:if(!t.target.matches(e))return}null!=n&&(t.data=n),i&&new f(t.currentTarget)._unregisterAllEventHandlersMatching(t.type,e,r);var s=[t].concat(t._extraParameters);!1===r.apply(new f(t.currentTarget),s)&&(t.stopPropagation(),t.preventDefault())}return o.isFor=r,t.split(" ").forEach((function(t){s.Subjects.forEach((function(n){var r=n._EventRegistry;null==r&&(r=n._EventRegistry=Object.create(null));var i=r[t];null==i&&(i=r[t]=Object.create(null));var s=i[e];null==s&&(s=i[e]=[]),s.push(o),n.addEventListener(t,o)}))})),this},t.prototype.off=function(t,n,i){if(0===this.Subjects.length)return this;var s=r(arguments).slice(1);if(""===(t=(t||"").trim().replace(/\s+/g," ")))return this._unregisterAllEventHandlersMatching(),this;var o=e(s[0])?s.shift().trim():null===s[0]?s.shift()||"":void 0;return void 0===o?(this._unregisterAllEventHandlersMatching(t),this):null==(i=s.shift())?(this._unregisterAllEventHandlersMatching(t,o),this):(this._unregisterAllEventHandlersMatching(t,o,i),this)},t.prototype._unregisterAllEventHandlersMatching=function(t,e,n){var r=this;return this.Subjects.forEach((function(i){var o=i._EventRegistry;if(null!=o){if(null==t)for(var u in o)r._unregisterHandlersForEventMatching(i,o,u,e,n);else t.split(" ").forEach((function(t){r._unregisterHandlersForEventMatching(i,o,t,e,n)}));s(o)&&delete i._EventRegistry}})),this},t.prototype._unregisterHandlersForEventMatching=function(t,e,n,r,i){var o=e[n];if(null!=o){if(null==r)for(var u in o)this._unregisterHandlersForEventSelectorsMatching(t,o,n,u,i);else this._unregisterHandlersForEventSelectorsMatching(t,o,n,r,i);s(o)&&delete e[n]}},t.prototype._unregisterHandlersForEventSelectorsMatching=function(t,e,n,r,i){var s=e[r];null!=s&&(null==i?(s.forEach((function(e){t.removeEventListener(n,e)})),s.length=0):s.every((function(e,r){return e.isFor!==i||(t.removeEventListener(n,e),s.splice(r,1),!1)})),0===s.length&&delete e[r])},t.prototype.trigger=function(t,r){return 0===this.Subjects.length||(e(t)&&(t=new CustomEvent(t,{bubbles:!0,cancelable:!0})),null!=r&&(t._extraParameters=n(r)?r.slice():[r]),this.Subjects.reduce((function(e,n){return n.dispatchEvent(t)&&e}),!0))},t.prototype.focus=function(){return this.Subjects.length>0&&this.Subjects[0]instanceof HTMLElement&&this.Subjects[0].focus(),this},t.prototype.blur=function(){return this.Subjects.length>0&&this.Subjects[0]instanceof HTMLElement&&this.Subjects[0].blur(),this},t.prototype.hasFocus=function(){return document.activeElement===this.Subjects[0]},t.prototype.transition=function(t,n){if(0===this.Subjects.length)return this;if(s(t))return this;n=Object.assign({},{delay:"0ms",duration:"400ms",easing:"linear",cleanup:!0},n);var r="";for(var i in t)t.hasOwnProperty(i)&&(r+=(""===r?"":",")+i);var u=e(n.duration)?n.duration:n.duration+"ms",c=e(n.delay)?n.delay:n.delay+"ms";return 1==n.cleanup&&this.Subjects.forEach((function(t){if(t instanceof HTMLElement){var e=window.getComputedStyle(t).transition;t.addEventListener("transitionend",(function(n){t.style.transition=e}),{once:!0})}})),this.Subjects.forEach((function(e){if(e instanceof HTMLElement)for(var i in e.style.transitionProperty=r,e.style.transitionDelay=c,e.style.transitionDuration=u,e.style.transitionTimingFunction=n.easing,t)if(t.hasOwnProperty(i)){var s=t[i],h=o(i);e.style[h]=s}})),this},t}();Object.assign(c.prototype,{renderPositionInViewport:c.prototype.positionInViewport,layoutPositionInParent:c.prototype.positionInParent,layoutPositionOnPage:c.prototype.positionOnPage,layoutWidth:c.prototype.width,layoutHeight:c.prototype.height,outerWidth:c.prototype.width,outerHeight:c.prototype.height});var h="loading"!==document.readyState;h||window.addEventListener("DOMContentLoaded",(function(){h=!0,function(){a=!0;for(var t=0;t<l.length;t++)try{l[t]()}catch(t){console.error('registered dommali "ready" handler failed with ',t)}a=!1}()}));var l=[],a=!1;var f=function(i){function s(t){var o=i.call(this)||this;switch(!0){case null==t:o.Subjects=[];break;case n(t):o.Subjects=t;break;case e(t):if(t.startsWith("<")){var u=document.createElement("template");u.innerHTML=t,o.Subjects=r(u.content.children)}else o.Subjects=r(document.querySelectorAll(t));break;case t instanceof s:o.Subjects=t.Subjects.slice();break;case t instanceof Element:o.Subjects=[t];break;default:throw new TypeError('unsupported "dommali" constructor argument')}return o}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}(s,i),s}(c);function p(t){return"function"==typeof t?c.ready(t):new f(t)}return Object.assign(p,{ready:c.ready}),p}));
//# sourceMappingURL=dommali.js.map
