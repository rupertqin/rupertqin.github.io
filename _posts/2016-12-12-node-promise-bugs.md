---
layout: post
title: 关于 node promise 的一个 bug
tags: bug node promise
---


### 写的一个脚本，在数据库插入一个表，发现一直没效果

```js
knex.schema.createTable('articles', function(table) {
    table.increments('id').primary();
    table.string('url');
    table.string('title');
    table.string('ps');
    table.integer('issue');
    table.text('html');
    table.timestamps();
})
```

### 直到在这个代码后面加了 `then`, 才成功

```js
.then(function() {
  console.log('done')
})
```
### 这是什么原因呢？ 

最后发现当执行到 `createTable` 这里时，这个脚本就结束了，返回一个 promise，退出 node 进程！
所以当加了 `then`，进程会等这个 promise 执行结束后才退出。

当然这里用 `async/await` 也可以达到效果

