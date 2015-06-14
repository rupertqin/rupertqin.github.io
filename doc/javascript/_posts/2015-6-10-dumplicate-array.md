---
layout: post
title:  去掉数组重复元素或取得重复元素
tags: array dumplicate
---

[取出js数组中的重复元素](http://f2e.im/t/954)

[JavaScript 数组去重谈性能优化](https://github.com/lifesinger/lifesinger.github.com/issues/113)

{}.toString.call(item) 不能换成 typeof(item), 因为这样会分不出 `unique(new String('1'), new Number(1))`

```js
function unique(arr) {
 var ret = []
 var more = []
 var hash = {}

 for (var i = 0; i < arr.length; i++) {
   var item = arr[i]
   var key = {}.toString.call(item) + item
   if (hash[key] !== 1) {
     ret.push(item)
     hash[key] = 1
   } else {
     more.push(item)
   }
 }

 return {
   ret: ret,
   more: more
 }
```
