---
layout: post
title: how to handle promise's errors
tags: promise error
---


### what is the log sequence？

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => console.log("Promise ready"))
  .then(result => {
    console.log(result);
    return '3333'
  })
  .finally(() => console.log("Promise ready22"))
  .then(result => console.log('second then:', result));
```

### how to error handle exactly the 'init', and handle in the 'then' definitively the 'result' bind to the 'init'.

the wrong way:

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("init"), Math.random() * 1000);
  setTimeout(() => reject("init"), Math.random() * 1000);
})
  .catch(err => {
    console.log(err)
  })
  .then((result) => {
    console.log('in then: ', result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("then"), Math.random() * 1000);
      setTimeout(() => reject("then"), Math.random() * 1000);
    })
  })
  .catch(err => {
    console.log(err)
  });
```

the correct way:
'then' has tow parameters, first is success, second is error handler

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("init"), Math.random() * 1000);
  setTimeout(() => reject("init"), Math.random() * 1000);
})
  .then((result) => {
    console.log('in then: ', result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("then"), Math.random() * 1000);
      setTimeout(() => reject("then"), Math.random() * 1000);
    })
  }, (err) => {
    console.log('error: ', err)
  })
  .then(result => {
    console.log('result2: ', result)
  })
```

### `resolve/reject` doesn't prevent the rest of excution
guess the log visible's value.

```js
let visible = false;
new Promise((resolve, reject) => {
  resolve();
  visible = true;
}).then(() => {
  console.log(visible);
})
```
### the differance between Promise.all and Promise.allSettled


### the differance between Promise.any and Promise.race

handle the first resolve promise, .any only handle success promise, never run into catch
```js
Promise.any(promises).then().catch()
```

handle the first reject promise: use .race.catch(), if has any reject promise, run into catch

```js
Promise.race(promises).then().catch()
```

### how to catch error in setTimeout function:

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);

```
