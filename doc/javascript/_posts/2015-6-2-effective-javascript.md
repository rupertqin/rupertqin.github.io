---
layout: post
title:  << effective javascript >>
tags: effective javascript
---


## “第 40 条： 避免继承标准类” 中的关于创建一个继承数组类的方法， 可以改成这样, 便有了 length 属性：

```js
function Dir(path, entries){
  this.path = path
  for (var i = 0, n = entries.length; i < n; i++){
    this.push(entries[i])
  }

}
```
