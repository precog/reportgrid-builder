/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function(e){function l(){var e=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),e=!0,window.localStorage.removeItem("_tmptest")}catch(t){}if(e)try{window.localStorage&&(n=window.localStorage,u="localStorage")}catch(i){}else if("globalStorage"in window)try{window.globalStorage&&(n=window.globalStorage[window.location.hostname],u="globalStorage")}catch(s){}else{r=document.createElement("link");if(!r.addBehavior){r=null;return}r.style.behavior="url(#default#userData)",document.getElementsByTagName("head")[0].appendChild(r),r.load("jStorage");var o="{}";try{o=r.getAttribute("jStorage")}catch(a){}n.jStorage=o,u="userDataBehavior"}c(),d()}function c(){if(n.jStorage)try{t=o(String(n.jStorage))}catch(e){n.jStorage="{}"}else n.jStorage="{}";i=n.jStorage?String(n.jStorage).length:0}function h(){try{n.jStorage=s(t),r&&(r.setAttribute("jStorage",n.jStorage),r.save("jStorage")),i=n.jStorage?String(n.jStorage).length:0}catch(e){}}function p(e){if(!e||typeof e!="string"&&typeof e!="number")throw new TypeError("Key name must be string or numeric");if(e=="__jstorage_meta")throw new TypeError("Reserved key name");return!0}function d(){var e,n,r,i=Infinity,s=!1;clearTimeout(a);if(!t.__jstorage_meta||typeof t.__jstorage_meta.TTL!="object")return;e=+(new Date),r=t.__jstorage_meta.TTL;for(n in r)r.hasOwnProperty(n)&&(r[n]<=e?(delete r[n],delete t[n],s=!0):r[n]<i&&(i=r[n]));i!=Infinity&&(a=setTimeout(d,i-e)),s&&h()}if(!e||!(e.toJSON||Object.toJSON||window.JSON))throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");var t={},n={jStorage:"{}"},r=null,i=0,s=e.toJSON||Object.toJSON||window.JSON&&(JSON.encode||JSON.stringify),o=e.evalJSON||window.JSON&&(JSON.decode||JSON.parse)||function(e){return String(e).evalJSON()},u=!1,a,f={isXML:function(e){var t=(e?e.ownerDocument||e:0).documentElement;return t?t.nodeName!=="HTML":!1},encode:function(e){if(!this.isXML(e))return!1;try{return(new XMLSerializer).serializeToString(e)}catch(t){try{return e.xml}catch(n){}}return!1},decode:function(e){var t="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(e){var t=new ActiveXObject("Microsoft.XMLDOM");return t.async="false",t.loadXML(e),t},n;return t?(n=t.call("DOMParser"in window&&new DOMParser||window,e,"text/xml"),this.isXML(n)?n:!1):!1}};e.jStorage={version:"0.1.7.0",set:function(e,n,r){return p(e),r=r||{},f.isXML(n)?n={_is_xml:!0,xml:f.encode(n)}:typeof n=="function"?n=null:n&&typeof n=="object"&&(n=o(s(n))),t[e]=n,isNaN(r.TTL)?h():this.setTTL(e,r.TTL),n},get:function(e,n){return p(e),e in t?t[e]&&typeof t[e]=="object"&&t[e]._is_xml&&t[e]._is_xml?f.decode(t[e].xml):t[e]:typeof n=="undefined"?null:n},deleteKey:function(e){return p(e),e in t?(delete t[e],t.__jstorage_meta&&typeof t.__jstorage_meta.TTL=="object"&&e in t.__jstorage_meta.TTL&&delete t.__jstorage_meta.TTL[e],h(),!0):!1},setTTL:function(e,n){var r=+(new Date);return p(e),n=Number(n)||0,e in t?(t.__jstorage_meta||(t.__jstorage_meta={}),t.__jstorage_meta.TTL||(t.__jstorage_meta.TTL={}),n>0?t.__jstorage_meta.TTL[e]=r+n:delete t.__jstorage_meta.TTL[e],h(),d(),!0):!1},flush:function(){return t={},h(),!0},storageObj:function(){function e(){}return e.prototype=t,new e},index:function(){var e=[],n;for(n in t)t.hasOwnProperty(n)&&n!="__jstorage_meta"&&e.push(n);return e},storageSize:function(){return i},currentBackend:function(){return u},storageAvailable:function(){return!!u},reInit:function(){var e,t;if(r&&r.addBehavior){e=document.createElement("link"),r.parentNode.replaceChild(e,r),r=e,r.style.behavior="url(#default#userData)",document.getElementsByTagName("head")[0].appendChild(r),r.load("jStorage"),t="{}";try{t=r.getAttribute("jStorage")}catch(i){}n.jStorage=t,u="userDataBehavior"}c()}},l()})(window.$||window.jQuery)