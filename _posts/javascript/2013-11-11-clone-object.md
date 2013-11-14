---
layout: post
title:  "clone an object"
categories: javascript
---
## 3 kind of clone an Object in javascript

#### type 1:  
[fiddle](http://jsfiddle.net/VcrvB/)

```javascript

	clone = function(obj) {
	  var clone, property, value;
	  if (!obj || typeof obj !== 'object') {
	    return obj;
	  }
	  clone = typeof obj.pop === 'function' ? [] : {};
	  clone.__proto__ = obj.__proto__;
	  for (property in obj) {
	    if (obj.hasOwnProperty(property)) {
	      value = obj.property;
	      if (value && typeof value === 'object') {
	        clone[property] = Object._clone(value);
	      } else {
	        clone[property] = obj[property];
	      }
	    }
	  }
	  return clone;
	};
	var Tom = {a:1,b:2}
	var Bill = clone(Tom)
	Tom.a = 2;
	console.log(Tom)
	console.log(Bill)	
```

#### type 2:  
[fiddle](http://jsfiddle.net/VcrvB/1/)

```javascript

	function clone(obj) {
	    var clone = {};
	 
	    for (var i in obj) {
	        if (typeof obj[i] == 'object') {
	            clone[i] = cloneObj(obj[i]);
	        } else {
	            clone[i] = obj[i];
	        }
	    }
	 
	    return clone;
	}
	var Tom = {a:1,b:2}
	var Bill = clone(Tom)
	Tom.a = 2;
	console.log(Tom)
	console.log(Bill)
```

#### type 3:  
[fiddle](http://jsfiddle.net/xSWD2/)

```javascript

	var Tom = {a:1,b:2}
	 
	var Bill = jQuery.extend({}, Tom);
	// or   var Bill = jQuery.extend( true,{}, Tom);
	Tom.a = 2;
	console.log(Tom)
	console.log(Bill)
```

