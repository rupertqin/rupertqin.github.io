---
layout: post
title:  "clone vs property vs anonymous function"
categories: javascript
---
#### When an inner function gains and uses access to its outer function's variables it is known as a closure

[related reading in mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
  ______

  
  * [Closure](http://jsfiddle.net/vnkuZ/2586/)

```javascript

	function makeSizer(size) {
	  return function() {
	    document.body.style.fontSize = size + 'px';
	  };
	}
	
	var size = [12, 14, 16]
	for(var i = 0; i < size.length; i++){
	  var link = document.getElementById('size-' + size[i])
	          //link.i = size[i]
	  link.onclick = makeSizer(size[i])
	}
      
```
    
    
  *[Property](http://jsfiddle.net/vnkuZ/2585/)
   
```javascript

    function makeSizer() {
      //return function() {
        document.body.style.fontSize = this.i + 'px';
      //};
    }
    var size = [12, 14, 16]
    for(var i = 0; i < size.length; i++){
        var link = document.getElementById('size-' + size[i])
            link.i = size[i]
        link.onclick = makeSizer
    } 

```
 
  * [Anonymous function](http://jsfiddle.net/vnkuZ/2587/)

```javascript

    var size = [12, 14, 16]
    for(var i = 0; i < size.length; i++){
        var link = document.getElementById('size-' + size[i]);
        (function(i){
            link.onclick = function () {
                document.body.style.fontSize = i + 'px';
            }
        })(size[i])
    }
    
```

  *[Anonymous function 2](http://jsfiddle.net/vnkuZ/2588/)
   
```javascript

	var size = [12, 14, 16]
	for(var i = 0; i < size.length; i++){
	    var link = document.getElementById('size-' + size[i]);
	    (function(i){
	        var that = this
	        link.onclick = function () {
	            document.body.style.fontSize = that + 'px';
	        }
	    }).call(size[i])
	}
    
```
