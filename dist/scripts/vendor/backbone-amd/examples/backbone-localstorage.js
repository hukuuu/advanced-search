(function(e,t){typeof define=="function"&&define.amd?define(["underscore","backbone"],function(n,r){return e.Store=t(e,n,r)}):e.Store=t(e,_,Backbone)})(this,function(e,t,n){function r(){return((1+Math.random())*65536|0).toString(16).substring(1)}function i(){return r()+r()+"-"+r()+"-"+r()+"-"+r()+"-"+r()+r()+r()}return n.LocalStorage=window.Store=function(e){this.name=e;var t=this.localStorage().getItem(this.name);this.records=t&&t.split(",")||[]},t.extend(n.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(e){return e.id||(e.id=i(),e.set(e.idAttribute,e.id)),this.localStorage().setItem(this.name+"-"+e.id,JSON.stringify(e)),this.records.push(e.id.toString()),this.save(),e.toJSON()},update:function(e){return this.localStorage().setItem(this.name+"-"+e.id,JSON.stringify(e)),t.include(this.records,e.id.toString())||this.records.push(e.id.toString()),this.save(),e.toJSON()},find:function(e){return JSON.parse(this.localStorage().getItem(this.name+"-"+e.id))},findAll:function(){return t(this.records).chain().map(function(e){return JSON.parse(this.localStorage().getItem(this.name+"-"+e))},this).compact().value()},destroy:function(e){return this.localStorage().removeItem(this.name+"-"+e.id),this.records=t.reject(this.records,function(t){return t==e.id.toString()}),this.save(),e},localStorage:function(){return localStorage}}),n.LocalStorage.sync=window.Store.sync=n.localSync=function(e,t,n,r){var i=t.localStorage||t.collection.localStorage;typeof n=="function"&&(n={success:n,error:r});var s;switch(e){case"read":s=t.id!=undefined?i.find(t):i.findAll();break;case"create":s=i.create(t);break;case"update":s=i.update(t);break;case"delete":s=i.destroy(t)}s?n.success(t,s,n):n.error(t,"Record not found",n)},n.ajaxSync=n.sync,n.getSyncMethod=function(e){return e.localStorage||e.collection&&e.collection.localStorage?n.localSync:n.ajaxSync},n.sync=function(e,t,r,i){return n.getSyncMethod(t).apply(this,[e,t,r,i])},Store});