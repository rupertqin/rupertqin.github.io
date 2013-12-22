---
layout: post
title:  "how javascript return value"
categories: javascript
tags: return
---
it's ok below:

```javascript
function some(a, b){
	a && b
}
var obj = {};
b = 'other';
some(obj, b)
```

but pass the direct reference, it reports an error **'SyntaxError: Unexpected token ||'**:

```javascript
{} || 'other'
```

why this happen?

compare these:

report error

```javascript
function some(){} || 'other'
function (){} || 'other'
```
and belowe don't:

```javascript
a = {}
a || 'other'

b = function(){}
b || 'other'
```

what're the differences?

when you think of the **execute** and **return value** of code:

```javascript
{} 
=> undefined

a = {}
a 
=> Object {}
```
so you can see the difference, and these will correct it:

```javascript
({}) || 'other'

(function(){}) || 'other'
```

`(function(){}) ` is known as anoymous function, then `({})` is anoymous Object?

Conclude: always think about **return value**
