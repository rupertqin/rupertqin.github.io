---
layout: post
title:  "writing better jquery code"
categories: javascript
tags: jquery
---
[Writing performant and quality Jquery code](http://blog.mathewdesign.com/2013/11/14/writing-performant-and-quality-jquery-code/)

[10 Ways to Instantly Increase Your jQuery Performance](http://net.tutsplus.com/tutorials/javascript-ajax/10-ways-to-instantly-increase-your-jquery-performance/)


## Cache always
Do not make the mistake or reusing your selectors time and time again. Instead, you should cache it in a variable. That way, the DOM doesn’t have to track down your element over and over again.
Never select elements multiple times inside a loop EVER! It’d be a speed-killer!

```js
$('#item').css ('color', '#123456');  
$('#item').html ('hello');  
$('#item').css ('background-color', '#ffffff');  
  
// you could use this instead  
$('#item').css ('color', '#123456').html ('hello').css ('background-color', '#ffffff');  
  
// or even  
var item = $('#item');  
item.css ('color', '#123456');  
item.html ('hello');  
item.css ('background-color', '#ffffff');  
  
  
// as for loops, this is a big no-no  
console.time('no cache');  
for (var i=0; i<1000; i++) {  
    $('#list').append (i);  
}  
console.timeEnd('no cache');  
  
// much better this way  
console.time('cache');  
var item = $('#list');  
  
for (var i=0; i<1000; i++) {  
    item.append (i);  
}  
console.timeEnd('cache'); 
```

## Avoid DOM Manipulation
DOM manipulation should be as limited as possible, since insert operations like prepend(), append(), after() are rather time-consuming.
The above example could be quickened using html() and building the list beforehand.

```js
var list = '';  
  
for (var i=0; i<1000; i++) {  
    list += '<li>'+i+'</li>';  
}  
  
('#list').html (list);  

```

## AVOID UNIVERSAL SELECTORS

```js
// bad
$('.container > *'); 

// better
$('.container').children();
```

## KEEP THE CODE READABLE

```js
// bad
$second.html(value);
$second.on('click',function(){
	alert('hello everybody');
}).fadeIn('slow').animate({height:'120px'},500);

// better
$second.html(value);
$second
	.on('click',function(){ alert('hello everybody');})
	.fadeIn('slow')
	.animate({height:'120px'},500);
```

### DETACH ELEMENTS WHEN DOING HEAVY MANIPULATIONS

```js
//bad
var 
	$container = $("#container"),
	$containerLi = $("#container li"),
	$element = null;

$element = $containerLi.first(); 
... a lot of complicated things

// better
var 
	$container = $("#container"),
	$containerLi = $container.find("li"),
	$element = null;

$element = $containerLi.first().detach(); 
...a lot of complicated things

$container.append($element);
```
