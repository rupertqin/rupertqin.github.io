---
layout: post
title:  "Function Declarations vs. Function Expressions"
categories: javascript
tags: return
---
## About name
[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

[Function.name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)

```javascript
a = function(){}
a.name = 'rup'
a.namee = 'rupp'
console.log(!!a.name, !!a.namee)

function some(){

  return function go(){
    console.log(arguments.callee.name)
  }
}

a = some()
b = some()
 a()
 b()
a = function go(){
    console.log(arguments.callee.name)
  }
a()
console.log(a.name)
```
