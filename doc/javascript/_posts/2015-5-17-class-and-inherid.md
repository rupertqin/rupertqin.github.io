---
layout: post
title:  类与继承
tags: javascript class
---

```js
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

Person.prototype.sayName = function(){
  alert(this.name)
}



function User (name, age, job, color) {
  Person.call(this, name, age, job);
  this.hairColor = color;
}
User.prototype = Person.prototype;
var person1 = new Person('rupert', 30, 'coder');
var person2 = new User('long', 26, 'san hu', 'yellow');

```

不能把 `User.prototype = Person.prototype;` 放入 function User 中,
了解构造函数与对象是不同的，构造函数实例化后才会变成对象，而对象是没有 prototype的:

```js
function User (name, age, job, color) {
  Person.call(this, name, age, job);
  this.prototype = Person.prototype;
  this.hairColor = color;
}
```
