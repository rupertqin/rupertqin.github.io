---
layout: post
title:  原型中的陷阱
tags: prototype trap
---


给 Number 增加了原型方法，连续的链式调用很方便，但是也要小心这种 `(3).add('4').square()`, 会报 'square is not a function'的错误信息，因为 `(3).add('4')` 返回的值为字符串，不就会有 square方法了

```js
Number.prototype.add = function(x){
  return this + x
}
Number.prototype.square = function(){
  return this * this
}
```
在某些情况下不会报错，就很难觉察出来，比如以下用 `Object.defineProperty` 的方式写原型方法，调用时可以省去圆括号 `(3).deal.square` 

```js
Object.defineProperty(
  Number.prototype, "deal", {
    get: function (){return (this + '')}
  }
);

Object.defineProperty(
  Number.prototype, "square", {
    get: function (){return (this * this)}
  }
);

```
