---
layout: post
title: 严格模式下的 caller, callee
tags: strict caller callee arguments
---

# callee  的起源

早起版本的 JavaScript 没有具名函数表达式（named function expression），所以在函数表达式里么没有办法实现递归。
比如下面实现阶乘的函数：

```js
function factorial ( n ) {
    return !( n > 1 ) ? 1 : factorial( n - 1 ) * n;
}
[1,2,3,4,5].map(factorial);
```

如果写成函数表达式的话：

```js
[1,2,3,4,5].map( function( n ) {
    return (!(n>1))? 1 : /* 这里要怎样递归？ */ (n-1)*n;
} );
```

所以添加了 arguments.callee 来实现对执行函数本身的调用：

```js
[1,2,3,4,5].map( function( n ) {
    return !( n > 1 ) ? 1 : arguments.callee( n - 1 ) * n;
} );
```

但是现在的JavaScript 支持了具名函数表达式：

```js
[ 1, 2, 3, 4, 5 ].map( function factorial( n ) {
    return !( n > 1 ) ? 1 : factorial( n - 1 ) * n;
} );
```

这样写有以下的好处：

可以像正常一样调用函数
不会在函数外面的作用域创建变量（IE8或者更早的浏览器还是会）
里面的 this 指向不会变化
比起用 arguments 对象来说，性能更加优秀

# 为什么严格模式下不能使用 arguments.caller callee 呢？ 

总的来说，当函数在严格模式下运行时，访问 arguments.callee 会导致错误。ECMA5cript 5 还定义了arguments.caller属性，便在严格模式下访问它也会导致错误，而在非严格模式下这个属性始终是 undefined，定义这个属性是为了分清 arguments.caller 和函数的 caller 属性。以上变化都是为了加强这门语言的安全性、这样第三方代码就不能在相同的环境里窥视其他代码了。

严格模式还有一个限制不能为函数的 caller 属性赋值，否则会导致错误

严格模式下不能调用 caller/callee 还因为以下几个原因：

## this 指向混乱

arguments.callee 从 ES5 严格模式中被移除掉的一个主要原因是递归调用会获取到一个不同的 this值，如：

```js
var global = this;
var sillyFunction = function (recursed) {
  if (!recursed) {
    return arguments.callee(true);
 } 
  if (this !== global) { 
    alert("This is: " + this); 
  } else { 
    alert("This is the global"); 
  }
}
sillyFunction();
```

一般情况下全局调用函数下的 this 指向的是全局 window/global, 而以上代码指向的是 arguments

##  安全原因

先要分清caller和callee，arguments.callee返回当前正在执行的函数，function.caller返回函数的调用体所在函数。

随便弄了个示例代码

```js
function parentCheck() {
    check("");
    function check() {
        subCheck();
        function subCheck() {
            console.log(arguments.callee);
            console.log(subCheck.caller.caller)
        }
    }
}
parentCheck();
```

arguments.callee返回subCheck的函数体，subCheck.caller返回调用subCheck的函数，即check，而再往上一层，subCheck.caller.caller就是返回调用check的函数体，也就是parentCheck。那如果是继续往上一层呢？subCheck.caller.caller.caller？就会变成null。书里也有讲，arguments.caller在非严格模式下永远是undefined。我们就可以判断值是null还是undefined来区分arguments.caller和函数的caller。

JS的函数是可以无限嵌套的，就构成了一棵树，而function.caller就提供了一个访问父节点的方法，通过灵活应用function.caller，我们甚至可以用脚本画出整棵树，只要我们在任意地方成功插入一段JS代码，又或者是，像网站统计之类的第三方代码，我们就能窥视其他代码。
所以为了安全期间，严格模式禁止调用caller、callee、arguments变量，在浏览器中的报错为

``` js
Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```