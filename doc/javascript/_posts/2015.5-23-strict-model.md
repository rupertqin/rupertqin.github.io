---
layout: post
title:  严格模式
tags: strict model
---

一般来说js 只有函数才能产生作用域， 而没有块级作用域，但在严格模式下是个例外,带上 'use strict'和不带上,结果不同：

```js
'use strict';
function f(){return 'global';}

function test(x){
  var result = [];
  if (x) {
    function f(){return 'local';}
    result.push( f() );
  }
  result.push( f() );
  return result;
}
test(true);
test(false);
```
