---
layout: post
title: 惰性函数和单例模式
tags: design pattern lazy function
---


在编写跨浏览器库的时候，我发现这种模式在JavaScript中非常有用。

## 需求

我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。

### 方案一： 上古方法

这个简单的解决方案使用全局变量t来保存Date对象。第一次运行它，它将时间保存在t中。在随后的执行中，foo只是返回存储在t中的值。

```js
var t;
function foo() {
    if (t) return t;
    t = new Date()
    return t;
}
```

上面的代码有两个问题。首先，变量t是一个额外的全局变量，可以在对foo的调用之间进行更改。第二，在运行时，代码不是最佳效率，因为每次调用foo时都必须评估条件。在这个例子中，评估条件是便宜的，但在实际的例子中，if-else-else -...结构中经常有几个昂贵的条件。

### 方案二： 模块模式

我们可以使用归因于Cornford和Crockford的模块模式来解决第一个解决方案中的一个问题。通过使用闭包，我们可以隐藏全局t变量，以便只有foo中的代码才能访问。

```js
var foo = (function() {
    var t;
    return function() {
        if (t) {
            return t;
        }
        t = new Date();
        return t;
    }
})();
```

这在运行时仍然不是最佳的，因为每次调用foo都必须评估条件。

模块模式是非常强大的工具，但在这种情况下是错误的，我相信。 

### 方案三： 函数对象

通过识别JavaScript函数是可以具有属性的对象，我们可以实现与模块模式解决方案类似的质量解决方案。

```js
function foo() {
    if (foo.t) {
        return foo.t;
    }
    foo.t = new Date();
    return foo.t;
}
```

在某些情况下，函数对象可以具有属性的事实导致非常干净的解决方案。在我看来，这个解决方案在概念上比这种情况下的模块模式解决方案更简单。

该解决方案避免了第一个解决方案的t全局变量;然而，条件仍然运行与每个执行的foo。


### 方案四：惰性函数

这次是我给你们介绍的最终方案：

```js
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
};
```

当foo第一次被调用时，我们实例化一个新的Date对象，并将foo重新分配给一个新的函数，该函数在它的闭包中具有该Date对象。然后在foo的第一次调用结束之前，调用foo的新函数值并提供返回值。

对foo的后续调用只是返回存储在其中的t的值。这是一个快速查找和高效率，特别是如果以前的解决方案中使用的条件是很多和复杂的。

另一种思考这种模式的方法是，首先分配给foo的外部函数是一个承诺。它承诺，第一次运行它将重新定义foo到更有用的功能。 “承诺”一词宽松地来自“计划”懒惰评估机制。任何JavaScript程序员真的应该学习Scheme，因为有更多的关于Scheme的功能编程的书面，然后存在于JavaScript。

惰性函数很好理解，假如同一个函数被大量范围，并且这个函数内部又有许多判断来来检测函数，这样对于一个调用会浪费时间和浏览器资源，所有当第一次判断完成后，直接把这个函数改写，不在需要判断。

## 实用例子: 创建 XHR 对象

```js
function createXHR(){
     var xmlhttp;
     try{
          //firfox,opear,safari
          xmlHttp=new XMLHttpRequest();
     }catch(e){
          try{
               xmlHttp=new ActiveXobject('Msxm12.XMLHTTP');
          }catch (e){
               try{
                    xmlHttp=new ActiveXobject("Microsoft.XMLHTTP")
               }catch(e){
                 alert("您的浏览器不支持AJAX")
                  return false;
               }
          }
     }
     return xmlHttp;
}

// 惰性函数写法
function createXHR(){
     var xhr=null;
     if(typeof XMLHttpRequest!='undefined'){
          xhr=new XMLHttpRequest();
         createXHR=function(){
               return XMLHttpRequest();  //直接返回一个懒函数，这样不必在往下走
          }
      }else{
          try{
               xhr=new ActiveXObject("Msxml2.XMLHTTP");
              createXHR=function(){
                    return new ActiveXObject("Msxml2.XMLHTTP");
               }
          }catche(e){
               try{
                    xhr =new ActiveXObject("Microsoft.XMLHTTP");
                    createXHR=function(){
                         return new ActiveXObject("Microsoft.XMLHTTP");
                    }
               }catch(e){
                    createXHR=function(){
                         return null
                    }
               }        
         }
     }
}
```

## 实用例子: 在 drag&drop 库中跨浏览器的获取 scrollY 数值 

```js
var getScrollY = function() {

    if (typeof window.pageYOffset == 'number') {

        getScrollY = function() {
            return window.pageYOffset;
        };

    } else if ((typeof document.compatMode == 'string') &&
               (document.compatMode.indexOf('CSS') >= 0) &&
               (document.documentElement) &&
               (typeof document.documentElement.scrollTop == 'number')) {

        getScrollY = function() {
            return document.documentElement.scrollTop;
        };

    } else if ((document.body) &&
               (typeof document.body.scrollTop == 'number')) {

      getScrollY = function() {
          return document.body.scrollTop;
      }

    } else {

      getScrollY = function() {
          return NaN;
      };

    }

    return getScrollY();
}

// 惰性函数写法
var getScrollY = function() {
  return window.pageYOffset ||
         (document.documentElement && document.documentElement.scrollTop) ||
         (document.body && document.body.scrollTop);
}
```

## 实用例子: 跨浏览器的监听事件

```js
// 简化写法, 每次都要判断
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
}

// 惰性函数写法
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
}

// 闭包写法
var addEvent = (function(){
    if (window.addEventListener) {
        return function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        return function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
})();
```


# getter 方法可以惰性取值，并且获取方法可以不必是 function

```js
this.__defineGetter__("foo", function() {
  var t = new Date();
  this.__defineGetter__("foo", function() {
    return t;
  });
  return t;
});

// To the user, foo appears as a plain old
// non-function valued property of the global object.
console.log(this.foo);
setTimeout(function(){console.log(this.foo);}, 3000);
```