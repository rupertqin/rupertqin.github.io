---
layout: post
title:  prototype and __proto__
tags: js class inheritance
---

[理解JavaScript的原型链和继承](http://blog.oyanglul.us/javascript/understand-prototype.html)

1. 所有函数都是对象，和其他对象区别在于有一个内部成员 [[call]]，你调用函数的时候其实就是调用这个成员
2. 所以函数上可以挂任何成员，prototype 是其中之一，一般会挂上一个对象，这时候就叫prototype 原型对象（所以问题一是这是一样的）
3. 当你调用 new FuncA() 的时候，其实做了这些事情
  a. 生成一个空对象 {}  
  b. 设置这个空对象的内部成员 [[prototype]] 为 FuncA.prototype ，这个内部成员在v8中是可以访问的__proto__  
  c. 以这个空对象为 this 调用 FuncA, 即 FuncA.call(this, xxx)

```js
1: // var a = new A('hehe') =>
2: var a = new Object();
3: a.__proto__ = A.prototype; (proto)
4: A.call(a, 'hehe');
```

![PrototypeGraph](http://www.codeproject.com/KB/scripting/687093/PrototypeGraph.png)

[ECMAScript 继承机制实现](http://www.w3school.com.cn/js/pro_js_inheritance_implementing.asp)

[JavaScript的实例化与继承：请停止使用new关键字](http://www.infoq.com/cn/articles/javascript-instantiation-and-inheritance)
