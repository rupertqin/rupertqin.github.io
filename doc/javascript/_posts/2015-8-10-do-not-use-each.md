---
layout: post
title:  避免使用 forEach
tags: forEach
---

### forEach vs for

遍历用 for 有时会产生一些问题，比如循环里用 setTimeout, 或者如绑定事件这样延迟执行的代码：

```js
var size = [12, 14, 16]
for(var i = 0; i < size.length; i++){
  var link = document.getElementById('size-' + size[i])
          // link.i = size[i];
  link.onclick = function makeSizer() {
    document.body.style.fontSize = size[i] + 'px';
  };
}
```

解决的办法通常创建闭包：

```js
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size = [12, 14, 16]
for(var i = 0; i < size.length; i++){
  var link = document.getElementById('size-' + size[i])
          // link.i = size[i];
  link.onclick = makeSizer(size[i]);
}
```

当然更好的解决办法是用 forEach 这样的方法（当然，原理也是通过创建闭包），而且语义好很多:

```js
var size = [12, 14, 16]
size.forEach(function(i, v){
  var link = document.getElementById('size-' + v)
  link.onclick = function(){
    document.body.style.fontSize = v + 'px';
  }
})
```

### forEach vs reduce

相对于 reduce、filter、 every、 map、 some, forEach 隐藏了迭代的意图,

```js
var obj = {};

arr.forEach(function (item) {
    obj[item.key] = item;
});
```
这种写法， 内部迭代函数与外部 obj 耦合在一起了，不利于以后扩展，如提取个抽象普适的方法， obj 不能放到内部迭代函数中，所有这个可以用 reduce 改造：

```js
var obj = arr.reduce(function (newObj, item) {
    newObj[item.key] = item;
    return newObj;
}, {});
```
用 lodash 的话可以这样写: `var obj  = _.zipObject(_.pluck(arr, 'key'), arr);` 或 `var obj = _.indexBy(arr, 'key');`


### forEach vs map ect.
看如何优化一个多重判断的代码：

```js
// widget
_.each(widget.values, function (value) {
    if (!touchEnabled) {
        var tooltip = value.getTooltip();
        if (tooltip) {
            widget.tooltips.push(tooltip);
        }
    }
});
```

```js
var dot = _.curry(function (methodName, object) {
    return object[methodName]();
});

// ...
widget.tooltips = this.tooltips.concat(
    widget.values
        .map(dot('getTooltip'))
        .filter(_.identity)
);
```


[避免使用 forEach](http://efe.baidu.com/blog/avoid-foreach/)
