
> 只挑了一些重点，其他的默认 airbnb javascript style


## 空格

```js
// 缩进： 空两格，不用tab
function baz() {
∙∙let name;
}

// 大括号前空一格， （if, else, while, typeof）关键字后面空一格
if (isJedi) {
  fight();
}

for (var i = 0; i < Things.length; i++) {
  Things[i]
}

const x = y + 5;

// bad 多余的空白行
function bar() {

  console.log(foo);

}

// bad 多余的空白行
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// 数组两头无空格，对象有空格
// 字符串用单引号
// 对象 key 用字符串
const foo = [1, 2, 3];
var obj = { 'foo': 42 };

// 对象值对齐
const getters = {
  'sidebar': state => state.app.sidebar,
  'device':  state => state.app.device,
  'token':   state => state.user.token,
  'avatar':  state => state.user.avatar,
  'name':    state => state.user.name,
  'roles':   state => state.user.roles,
}

// 合理的行内空格
function foo() { return true; }
if (foo) { bar = 0; }
// bad
var foo = 1,bar = 2;
// good
var foo = 1, bar = 2;
```

## 逗号 ***comma***

```js
// 对象尾部加逗号，原因：1、统一 2、对 Git diff 友好
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};
```

## 解构

```js
// bad
const options = {
  name: this.formModel.name,
  id: this.formModel.id,
  password: this.formModel.password,
  description: this.formModel.description,
};

// good
const { name, id, password, description } = this.formModel;
const options = { name, id, password, description };
```

## 箭头函数
- 箭头函数取代一般函数

```js
// 单行单个参数不用花括号
[1, 2, 3].map(x => x * x);
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// 不要和 >= <= 混用
const itemHeight = item => item.height <= 256 ? item.largeSize : item.smallSize;
```

## 对象属性

属性名带引号
airbnb 不推荐，因为可能的性能问题 (https://github.com/airbnb/javascript#objects--quoted-props)[objects--quoted-props], 但是可以用 Uglify 把引号去掉
> Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

```js
const luke = {
  'jedi': true,
  'age': 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
````

## 排列整齐

```js
// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;

// bad
const {
  name: 'yu',
  id,
  password: 'oiopp',
  description,
}
// good
const {
  id,
  description,
  name: 'yu',
  password: 'oiopp',
}
````

```html
<el-date-picker
  unlink-panels
  required 
  v-model="dateValue"
  type="datetimerange"
  align="right"
  range-separator="至"
  start-placeholder="开始时间"
  end-placeholder="结束时间"
  class="el-date-picker__picker"
  @change="changeDate"
/>
```

## var let const

```js
// 使用 const let, 而不是 var
// var 的变量提升会使情况复杂

function deal() {
  var age = 1;
  if (!name) {
    return age;
  }
  for (var name = 0;name < 10; name++) {
    var age = 8
  }
}
```

## 大写下划线变量

```js
// 只在引用外部文件这么用
// CONST.js
export const MAPPING = {
  'KEY': 'value',
  'KEY_PHONE_ID': 'value',
};
```

## 条件判断

```js
// bad
if (name !== undefined) {
  //
}

// bad
if (name === true) {
  //
}

// bad
if (list.length > 0) {
  //
}

// good
if (name) {
  //
}

// good
if (list.length) {
  //
}

// bad
if ( jsonData && jsonData.foo &&
  jsonData.foo.bar &&
  jsonData.foo.bar.baz &&
  jsonData.foo.bar.baz.quux &&
  jsonData.foo.bar.baz.quux.xyzz)

// good
if ( jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzz)


```


## 不使用 switch

```js
// 不同的 case 重复定义的问题
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    let x = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class x {}
}
```

## 复杂深度

```js
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// good
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2
    ? "baz"
    : null;

// bad
if (value1 > value2) {
  if (value1 > value2) {
    if (value1 > value2) {
      if (value1 > value2) {
        // 
      } else {

      }
    }
  }
} else {

}

// bad
fetchCurrentUser((error, currentUser) => {
    if(error) throw Error;
    fetchArticles(currentUser.id, (error, articles) => {
        if(error) throw Error;
        // articles here...
    });
});

```


