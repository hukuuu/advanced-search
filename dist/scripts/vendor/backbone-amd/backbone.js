//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.

//     Backbone may be freely distributed under the MIT license.

(function(e,t){typeof exports!="undefined"?t(e,exports,require("underscore")):typeof define=="function"&&define.amd?define(["underscore","jquery","exports"],function(n,r,i){e.Backbone=t(e,i,n,r)}):e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender)})(this,function(e,t,n,r){var i=e.Backbone,s=[],o=s.push,u=s.slice,a=s.splice;t.VERSION="0.9.10",t.$=r,t.noConflict=function(){return e.Backbone=i,this},t.emulateHTTP=!1,t.emulateJSON=!1;var f=/\s+/,l=function(e,t,n,r){if(!n)return!0;if(typeof n=="object")for(var i in n)e[t].apply(e,[i,n[i]].concat(r));else{if(!f.test(n))return!0;var s=n.split(f);for(var o=0,u=s.length;o<u;o++)e[t].apply(e,[s[o]].concat(r))}},c=function(e,t){var n,r=-1,i=e.length;switch(t.length){case 0:while(++r<i)(n=e[r]).callback.call(n.ctx);return;case 1:while(++r<i)(n=e[r]).callback.call(n.ctx,t[0]);return;case 2:while(++r<i)(n=e[r]).callback.call(n.ctx,t[0],t[1]);return;case 3:while(++r<i)(n=e[r]).callback.call(n.ctx,t[0],t[1],t[2]);return;default:while(++r<i)(n=e[r]).callback.apply(n.ctx,t)}},h=t.Events={on:function(e,t,n){if(!l(this,"on",e,[t,n])||!t)return this;this._events||(this._events={});var r=this._events[e]||(this._events[e]=[]);return r.push({callback:t,context:n,ctx:n||this}),this},once:function(e,t,r){if(!l(this,"once",e,[t,r])||!t)return this;var i=this,s=n.once(function(){i.off(e,s),t.apply(this,arguments)});return s._callback=t,this.on(e,s,r),this},off:function(e,t,r){var i,s,o,u,a,f,c,h;if(!this._events||!l(this,"off",e,[t,r]))return this;if(!e&&!t&&!r)return this._events={},this;u=e?[e]:n.keys(this._events);for(a=0,f=u.length;a<f;a++){e=u[a];if(i=this._events[e]){o=[];if(t||r)for(c=0,h=i.length;c<h;c++)s=i[c],(t&&t!==s.callback&&t!==s.callback._callback||r&&r!==s.context)&&o.push(s);this._events[e]=o}}return this},trigger:function(e){if(!this._events)return this;var t=u.call(arguments,1);if(!l(this,"trigger",e,t))return this;var n=this._events[e],r=this._events.all;return n&&c(n,t),r&&c(r,arguments),this},listenTo:function(e,t,r){var i=this._listeners||(this._listeners={}),s=e._listenerId||(e._listenerId=n.uniqueId("l"));return i[s]=e,e.on(t,typeof t=="object"?this:r,this),this},stopListening:function(e,t,n){var r=this._listeners;if(!r)return;if(e)e.off(t,typeof t=="object"?this:n,this),!t&&!n&&delete r[e._listenerId];else{typeof t=="object"&&(n=this);for(var i in r)r[i].off(t,n,this);this._listeners={}}return this}};h.bind=h.on,h.unbind=h.off,n.extend(t,h);var p=t.Model=function(e,t){var r,i=e||{};this.cid=n.uniqueId("c"),this.attributes={},t&&t.collection&&(this.collection=t.collection),t&&t.parse&&(i=this.parse(i,t)||{});if(r=n.result(this,"defaults"))i=n.defaults({},i,r);this.set(i,t),this.changed={},this.initialize.apply(this,arguments)};n.extend(p.prototype,h,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(e){return n.clone(this.attributes)},sync:function(){return t.sync.apply(this,arguments)},get:function(e){return this.attributes[e]},escape:function(e){return n.escape(this.get(e))},has:function(e){return this.get(e)!=null},set:function(e,t,r){var i,s,o,u,a,f,l,c;if(e==null)return this;typeof e=="object"?(s=e,r=t):(s={})[e]=t,r||(r={});if(!this._validate(s,r))return!1;o=r.unset,a=r.silent,u=[],f=this._changing,this._changing=!0,f||(this._previousAttributes=n.clone(this.attributes),this.changed={}),c=this.attributes,l=this._previousAttributes,this.idAttribute in s&&(this.id=s[this.idAttribute]);for(i in s)t=s[i],n.isEqual(c[i],t)||u.push(i),n.isEqual(l[i],t)?delete this.changed[i]:this.changed[i]=t,o?delete c[i]:c[i]=t;if(!a){u.length&&(this._pending=!0);for(var h=0,p=u.length;h<p;h++)this.trigger("change:"+u[h],this,c[u[h]],r)}if(f)return this;if(!a)while(this._pending)this._pending=!1,this.trigger("change",this,r);return this._pending=!1,this._changing=!1,this},unset:function(e,t){return this.set(e,void 0,n.extend({},t,{unset:!0}))},clear:function(e){var t={};for(var r in this.attributes)t[r]=void 0;return this.set(t,n.extend({},e,{unset:!0}))},hasChanged:function(e){return e==null?!n.isEmpty(this.changed):n.has(this.changed,e)},changedAttributes:function(e){if(!e)return this.hasChanged()?n.clone(this.changed):!1;var t,r=!1,i=this._changing?this._previousAttributes:this.attributes;for(var s in e){if(n.isEqual(i[s],t=e[s]))continue;(r||(r={}))[s]=t}return r},previous:function(e){return e==null||!this._previousAttributes?null:this._previousAttributes[e]},previousAttributes:function(){return n.clone(this._previousAttributes)},fetch:function(e){e=e?n.clone(e):{},e.parse===void 0&&(e.parse=!0);var t=e.success;return e.success=function(e,n,r){if(!e.set(e.parse(n,r),r))return!1;t&&t(e,n,r)},this.sync("read",this,e)},save:function(e,t,r){var i,s,o,u,a=this.attributes;return e==null||typeof e=="object"?(i=e,r=t):(i={})[e]=t,i&&(!r||!r.wait)&&!this.set(i,r)?!1:(r=n.extend({validate:!0},r),this._validate(i,r)?(i&&r.wait&&(this.attributes=n.extend({},a,i)),r.parse===void 0&&(r.parse=!0),s=r.success,r.success=function(e,t,r){e.attributes=a;var o=e.parse(t,r);r.wait&&(o=n.extend(i||{},o));if(n.isObject(o)&&!e.set(o,r))return!1;s&&s(e,t,r)},o=this.isNew()?"create":r.patch?"patch":"update",o==="patch"&&(r.attrs=i),u=this.sync(o,this,r),i&&r.wait&&(this.attributes=a),u):!1)},destroy:function(e){e=e?n.clone(e):{};var t=this,r=e.success,i=function(){t.trigger("destroy",t,t.collection,e)};e.success=function(e,t,n){(n.wait||e.isNew())&&i(),r&&r(e,t,n)};if(this.isNew())return e.success(this,null,e),!1;var s=this.sync("delete",this,e);return e.wait||i(),s},url:function(){var e=n.result(this,"urlRoot")||n.result(this.collection,"url")||_();return this.isNew()?e:e+(e.charAt(e.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(e,t){return e},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(e){return!this.validate||!this.validate(this.attributes,e)},_validate:function(e,t){if(!t.validate||!this.validate)return!0;e=n.extend({},this.attributes,e);var r=this.validationError=this.validate(e,t)||null;return r?(this.trigger("invalid",this,r,t||{}),!1):!0}});var d=t.Collection=function(e,t){t||(t={}),t.model&&(this.model=t.model),t.comparator!==void 0&&(this.comparator=t.comparator),this.models=[],this._reset(),this.initialize.apply(this,arguments),e&&this.reset(e,n.extend({silent:!0},t))};n.extend(d.prototype,h,{model:p,initialize:function(){},toJSON:function(e){return this.map(function(t){return t.toJSON(e)})},sync:function(){return t.sync.apply(this,arguments)},add:function(e,t){e=n.isArray(e)?e.slice():[e],t||(t={});var r,i,s,u,f,l,c,h,p,d;c=[],h=t.at,p=this.comparator&&h==null&&t.sort!=0,d=n.isString(this.comparator)?this.comparator:null;for(r=0,i=e.length;r<i;r++){if(!(s=this._prepareModel(u=e[r],t))){this.trigger("invalid",this,u,t);continue}if(f=this.get(s)){t.merge&&(f.set(u===s?s.attributes:u,t),p&&!l&&f.hasChanged(d)&&(l=!0));continue}c.push(s),s.on("all",this._onModelEvent,this),this._byId[s.cid]=s,s.id!=null&&(this._byId[s.id]=s)}c.length&&(p&&(l=!0),this.length+=c.length,h!=null?a.apply(this.models,[h,0].concat(c)):o.apply(this.models,c)),l&&this.sort({silent:!0});if(t.silent)return this;for(r=0,i=c.length;r<i;r++)(s=c[r]).trigger("add",s,this,t);return l&&this.trigger("sort",this,t),this},remove:function(e,t){e=n.isArray(e)?e.slice():[e],t||(t={});var r,i,s,o;for(r=0,i=e.length;r<i;r++){o=this.get(e[r]);if(!o)continue;delete this._byId[o.id],delete this._byId[o.cid],s=this.indexOf(o),this.models.splice(s,1),this.length--,t.silent||(t.index=s,o.trigger("remove",o,this,t)),this._removeReference(o)}return this},push:function(e,t){return e=this._prepareModel(e,t),this.add(e,n.extend({at:this.length},t)),e},pop:function(e){var t=this.at(this.length-1);return this.remove(t,e),t},unshift:function(e,t){return e=this._prepareModel(e,t),this.add(e,n.extend({at:0},t)),e},shift:function(e){var t=this.at(0);return this.remove(t,e),t},slice:function(e,t){return this.models.slice(e,t)},get:function(e){return e==null?void 0:(this._idAttr||(this._idAttr=this.model.prototype.idAttribute),this._byId[e.id||e.cid||e[this._idAttr]||e])},at:function(e){return this.models[e]},where:function(e){return n.isEmpty(e)?[]:this.filter(function(t){for(var n in e)if(e[n]!==t.get(n))return!1;return!0})},sort:function(e){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return e||(e={}),n.isString(this.comparator)||this.comparator.length===1?this.models=this.sortBy(this.comparator,this):this.models.sort(n.bind(this.comparator,this)),e.silent||this.trigger("sort",this,e),this},pluck:function(e){return n.invoke(this.models,"get",e)},update:function(e,t){t=n.extend({add:!0,merge:!0,remove:!0},t),t.parse&&(e=this.parse(e,t));var r,i,s,o,u=[],a=[],f={};n.isArray(e)||(e=e?[e]:[]);if(t.add&&!t.remove)return this.add(e,t);for(i=0,s=e.length;i<s;i++)r=e[i],o=this.get(r),t.remove&&o&&(f[o.cid]=!0),(t.add&&!o||t.merge&&o)&&u.push(r);if(t.remove)for(i=0,s=this.models.length;i<s;i++)r=this.models[i],f[r.cid]||a.push(r);return a.length&&this.remove(a,t),u.length&&this.add(u,t),this},reset:function(e,t){t||(t={}),t.parse&&(e=this.parse(e,t));for(var r=0,i=this.models.length;r<i;r++)this._removeReference(this.models[r]);return t.previousModels=this.models.slice(),this._reset(),e&&this.add(e,n.extend({silent:!0},t)),t.silent||this.trigger("reset",this,t),this},fetch:function(e){e=e?n.clone(e):{},e.parse===void 0&&(e.parse=!0);var t=e.success;return e.success=function(e,n,r){var i=r.update?"update":"reset";e[i](n,r),t&&t(e,n,r)},this.sync("read",this,e)},create:function(e,t){t=t?n.clone(t):{};if(!(e=this._prepareModel(e,t)))return!1;t.wait||this.add(e,t);var r=this,i=t.success;return t.success=function(e,t,n){n.wait&&r.add(e,n),i&&i(e,t,n)},e.save(null,t),e},parse:function(e,t){return e},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models.length=0,this._byId={}},_prepareModel:function(e,t){if(e instanceof p)return e.collection||(e.collection=this),e;t||(t={}),t.collection=this;var n=new this.model(e,t);return n._validate(e,t)?n:!1},_removeReference:function(e){this===e.collection&&delete e.collection,e.off("all",this._onModelEvent,this)},_onModelEvent:function(e,t,n,r){if((e==="add"||e==="remove")&&n!==this)return;e==="destroy"&&this.remove(t,r),t&&e==="change:"+t.idAttribute&&(delete this._byId[t.previous(t.idAttribute)],t.id!=null&&(this._byId[t.id]=t)),this.trigger.apply(this,arguments)},sortedIndex:function(e,t,r){t||(t=this.comparator);var i=n.isFunction(t)?t:function(e){return e.get(t)};return n.sortedIndex(this.models,e,i,r)}});var v=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];n.each(v,function(e){d.prototype[e]=function(){var t=u.call(arguments);return t.unshift(this.models),n[e].apply(n,t)}});var m=["groupBy","countBy","sortBy"];n.each(m,function(e){d.prototype[e]=function(t,r){var i=n.isFunction(t)?t:function(e){return e.get(t)};return n[e](this.models,i,r)}});var g=t.Router=function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},y=/\((.*?)\)/g,b=/(\(\?)?:\w+/g,w=/\*\w+/g,E=/[\-{}\[\]+?.,\\\^$|#\s]/g;n.extend(g.prototype,h,{initialize:function(){},route:function(e,r,i){return n.isRegExp(e)||(e=this._routeToRegExp(e)),i||(i=this[r]),t.history.route(e,n.bind(function(n){var s=this._extractParameters(e,n);i&&i.apply(this,s),this.trigger.apply(this,["route:"+r].concat(s)),this.trigger("route",r,s),t.history.trigger("route",this,r,s)},this)),this},navigate:function(e,n){return t.history.navigate(e,n),this},_bindRoutes:function(){if(!this.routes)return;var e,t=n.keys(this.routes);while((e=t.pop())!=null)this.route(e,this.routes[e])},_routeToRegExp:function(e){return e=e.replace(E,"\\$&").replace(y,"(?:$1)?").replace(b,function(e,t){return t?e:"([^/]+)"}).replace(w,"(.*?)"),new RegExp("^"+e+"$")},_extractParameters:function(e,t){return e.exec(t).slice(1)}});var S=t.History=function(){this.handlers=[],n.bindAll(this,"checkUrl"),typeof window!="undefined"&&(this.location=window.location,this.history=window.history)},x=/^[#\/]|\s+$/g,T=/^\/+|\/+$/g,N=/msie [\w.]+/,C=/\/$/;S.started=!1,n.extend(S.prototype,h,{interval:50,getHash:function(e){var t=(e||this).location.href.match(/#(.*)$/);return t?t[1]:""},getFragment:function(e,t){if(e==null)if(this._hasPushState||!this._wantsHashChange||t){e=this.location.pathname;var n=this.root.replace(C,"");e.indexOf(n)||(e=e.substr(n.length))}else e=this.getHash();return e.replace(x,"")},start:function(e){if(S.started)throw new Error("Backbone.history has already been started");S.started=!0,this.options=n.extend({},{root:"/"},this.options,e),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var r=this.getFragment(),i=document.documentMode,s=N.exec(navigator.userAgent.toLowerCase())&&(!i||i<=7);this.root=("/"+this.root+"/").replace(T,"/"),s&&this._wantsHashChange&&(this.iframe=t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(r)),this._hasPushState?t.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!s?t.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=r;var o=this.location,u=o.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!u)return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&u&&o.hash&&(this.fragment=this.getHash().replace(x,""),this.history.replaceState({},document.title,this.root+this.fragment+o.search));if(!this.options.silent)return this.loadUrl()},stop:function(){t.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),S.started=!1},route:function(e,t){this.handlers.unshift({route:e,callback:t})},checkUrl:function(e){var t=this.getFragment();t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe)));if(t===this.fragment)return!1;this.iframe&&this.navigate(t),this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(e){var t=this.fragment=this.getFragment(e),r=n.any(this.handlers,function(e){if(e.route.test(t))return e.callback(t),!0});return r},navigate:function(e,t){if(!S.started)return!1;if(!t||t===!0)t={trigger:t};e=this.getFragment(e||"");if(this.fragment===e)return;this.fragment=e;var n=this.root+e;if(this._hasPushState)this.history[t.replace?"replaceState":"pushState"]({},document.title,n);else{if(!this._wantsHashChange)return this.location.assign(n);this._updateHash(this.location,e,t.replace),this.iframe&&e!==this.getFragment(this.getHash(this.iframe))&&(t.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,e,t.replace))}t.trigger&&this.loadUrl(e)},_updateHash:function(e,t,n){if(n){var r=e.href.replace(/(javascript:|#).*$/,"");e.replace(r+"#"+t)}else e.hash="#"+t}}),t.history=new S;var k=t.View=function(e){this.cid=n.uniqueId("view"),this._configure(e||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},L=/^(\S+)\s*(.*)$/,A=["model","collection","el","id","attributes","className","tagName","events"];n.extend(k.prototype,h,{tagName:"div",$:function(e){return this.$el.find(e)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(e,n){return this.$el&&this.undelegateEvents(),this.$el=e instanceof t.$?e:t.$(e),this.el=this.$el[0],n!==!1&&this.delegateEvents(),this},delegateEvents:function(e){if(!e&&!(e=n.result(this,"events")))return;this.undelegateEvents();for(var t in e){var r=e[t];n.isFunction(r)||(r=this[e[t]]);if(!r)throw new Error('Method "'+e[t]+'" does not exist');var i=t.match(L),s=i[1],o=i[2];r=n.bind(r,this),s+=".delegateEvents"+this.cid,o===""?this.$el.on(s,r):this.$el.on(s,o,r)}},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid)},_configure:function(e){this.options&&(e=n.extend({},n.result(this,"options"),e)),n.extend(this,n.pick(e,A)),this.options=e},_ensureElement:function(){if(!this.el){var e=n.extend({},n.result(this,"attributes"));this.id&&(e.id=n.result(this,"id")),this.className&&(e["class"]=n.result(this,"className"));var r=t.$("<"+n.result(this,"tagName")+">").attr(e);this.setElement(r,!1)}else this.setElement(n.result(this,"el"),!1)}});var O={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};t.sync=function(e,r,i){var s=O[e];n.defaults(i||(i={}),{emulateHTTP:t.emulateHTTP,emulateJSON:t.emulateJSON});var o={type:s,dataType:"json"};i.url||(o.url=n.result(r,"url")||_()),i.data==null&&r&&(e==="create"||e==="update"||e==="patch")&&(o.contentType="application/json",o.data=JSON.stringify(i.attrs||r.toJSON(i))),i.emulateJSON&&(o.contentType="application/x-www-form-urlencoded",o.data=o.data?{model:o.data}:{});if(i.emulateHTTP&&(s==="PUT"||s==="DELETE"||s==="PATCH")){o.type="POST",i.emulateJSON&&(o.data._method=s);var u=i.beforeSend;i.beforeSend=function(e){e.setRequestHeader("X-HTTP-Method-Override",s);if(u)return u.apply(this,arguments)}}o.type!=="GET"&&!i.emulateJSON&&(o.processData=!1);var a=i.success;i.success=function(e){a&&a(r,e,i),r.trigger("sync",r,e,i)};var f=i.error;i.error=function(e){f&&f(r,e,i),r.trigger("error",r,e,i)};var l=i.xhr=t.ajax(n.extend(o,i));return r.trigger("request",r,l,i),l},t.ajax=function(){return t.$.ajax.apply(t.$,arguments)};var M=function(e,t){var r=this,i;e&&n.has(e,"constructor")?i=e.constructor:i=function(){return r.apply(this,arguments)},n.extend(i,r,t);var s=function(){this.constructor=i};return s.prototype=r.prototype,i.prototype=new s,e&&n.extend(i.prototype,e),i.__super__=r.prototype,i};p.extend=d.extend=g.extend=k.extend=S.extend=M;var _=function(){throw new Error('A "url" property or function must be specified')};return t});