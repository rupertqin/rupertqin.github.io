---
layout: post
title:  "how browser read code with closure"
categories: javascript
---
## It's funny to see how the browser report the error with closure, see the difference between these:

1:

```javascript
  a = p;
  a = {name: p}  
```

2:

```javascript
  function(){
    a = p;
  }

  a = {name: function(){ b = p } }        
```

the second one don't throw an error, and see this you will understand why it does:


```javascript
var t = setTimeout(function(){ a = p}, 2000)  
```

then you could understand how the count can store in the closure, but the 'this' is defined by the environment:

```javascript
var generator = {
		count: 0,
		uniqueString: function(prefix) {
			return [prefix, this.count++].join(''); }
    };

generator.uniqueString("bohr");//=> bohr0
generator.uniqueString("bohr"); //=> bohr1
```

so above is different from in the return function closure as this:

```javascript
function makeUniqueStringFunction(start) {
	var COUNTER = start;
	return function(prefix) {
		return [prefix, COUNTER++].join('');
	}
};
var uniqueString = makeUniqueStringFunction(0);

uniqueString("dari");//=> "dari0"
uniqueString("dari"); //=> "dari1"
```
