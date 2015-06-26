---
layout: post
title: interview
categories: frontend
tags: front-end interview
---
## resource

[Interview Questions for front-end-Developer](http://www.thatjsdude.com/interview/index.html)

[Front end Developer Interview Questions](https://github.com/darcyclarke/Front-end-Developer-Interview-Questions)

[前端攻略系列(二) - 前端各种面试题](http://www.cnblogs.com/Darren_code/archive/2012/01/31/questions.html)

[【web前端面试题整理04】阿里一行之大神面对面](http://www.cnblogs.com/yexiaochai/p/3158443.html)

[前端开发面试题整理（JS篇](http://bbs.blueidea.com/thread-3107428-1-1.html)

[百度等多家名企Web前端开发面试题](http://www.hdy4.cn/hi-news/530)

[经典的20道AJAX面试题](http://blog.csdn.net/chow__zh/article/details/9149811)

[某公司前端面试题-大家一起研究](http://www.w3cfuns.com/forum.php?mod=viewthread&tid=5597704&reltid=5597527&pre_thread_id=1585&pre_pos=1&ext=)



## 淘宝网HTML & CSS面试题

1. Doctype? 严格模式与混杂模式-如何触发这两种模式，区分它们有何意义?
2. 行内元素有哪些？块级元素有哪些？CSS的盒模型？
3. CSS引入的方式有哪些? link和@import的区别是?
4. CSS选择符有哪些？哪些属性可以继承？优先级算法如何计算？内联和important哪个优先级高？
5. 前端页面有哪三层构成，分别是什么？作用是什么？
6. css的基本语句构成是？
7. 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?经常遇到的浏览器的兼容性有哪些？怎么会出现？解决方法是什么？
8. 如何居中一个浮动元素?
9. 有没有关注HTML5和CSS3?如有请简单说一些您对它们的了解情况！
10. 你怎么来实现下面这个设计图,主要讲述思路 （效果图省略）
11. 如果让你来制作一个访问量很高的大型网站，你会如何来管理所有CSS文件、JS与图片？


## 从string 'abcdhello123' 中取出 'hello'

```js
'abcdhello123'.substring(4,9)
```

## 从一个string 'iuhuihsdvhihishfihiuashi' 中计算出现次数最多的字母及出现的次数

```js
var str = 'iuhuihsdvhihishfihiuashi';
var json = {};

for (var i = 0; i < str.length; i++) {
        if(!json[str.charAt(i)]){
                json[str.charAt(i)] = 1;
        }else{
                json[str.charAt(i)]++;
        }
};
var iMax = 0;
var iIndex = '';
for(var i in json){
        if(json[i]>iMax){
                iMax = json[i];
                iIndex = i;
        }
}
alert('出现次数最多的是:'+iIndex+'出现'+iMax+'次');
```


## 写一个method, 去掉数组 [1,2,3,1,2,3,4,5,1,2,3,4] 中的重复元素

```js
var arr = [1,2,3,1,2,3,4,5,1,2,3,4];
var json = {};
var arr2 = [];
for (var i = 0; i < arr.length; i++) {
        if(!json[arr[i]]){
                json[arr[i]] = true;
        }else{
                json[arr[i]] = false;
        }

        if(json[arr[i]]){
                arr2.push(arr[i]);
        }
};

for (var i = 0; i < arr.length; i++) {
        if(!aa(arr[i], arr2)){
                arr2.push(arr[i])
        }
};
function aa(obj, arr){
        for (var i = 0; i < arr.length; i++) {
                if(arr[i] == obj) return true;
                else return false;
        };
}
alert(arr2)
```


## 说出3个使用 this 的例子

* 事件： 如onclick  this->发生事件的对象
* 构造函数          this->new 出来的object
* call/apply        改变this


## javascript面向对象中继承实现

```js
function Person(name){
        this.name = name;
}

Person.prototype.showName = function(){
        alert(this.name);
}

function Worker(name, job){
        Person.apply(this,arguments)
        this.job = job;
}
for(var i in Person.prototype){
        Worker.prototype = Person.prototype;
}
new Worker('sl', 'coders').showName();
```


## 写一个Method, 检验一个变量是否为String类型

```js
typeof(obj) == 'string'
obj.constructor == String;
```


## 写一个Method,在browser中实现一个计算当年还剩多少时间的倒数计时程序，实时显示“××××年还剩××天××时××分××秒”

```js
var oDate = new Date();
var oYear = oDate.getFullYear();

var oNewDate = new Date();
oNewDate.setFullYear(oYear, 11, 31, 23, 59, 59);
var iTime = oNewDate.getTime()-oDate.getTime();

var iS = iTime/1000;
var iM = oNewDate.getMonth()-oDate.getMonth();
var iDate =iS
```


## 请说出三种减低页面加载时间的方法

1. 压缩css、js文件
2. 合并js、css文件，减少http请求
3. 外部js、css文件放在最底下
4. 减少dom操作，尽可能用变量替代不必要的dom操作


## 请尽可能详尽的解释AJAX的工作原理。

* 创建ajax对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）
* 判断数据传输方式(GET/POST)
* 打开链接 open()
* 发送 send()
* 当ajax对象完成第四步（onreadystatechange）数据接收完成，判断http响应状态（status）200-300之间或者304（缓存）执行回调函数


## 写一个Method, 深度copy一个js对象

```js
var arr = [1,2,43];
var json = {a:6,b:4,c:[1,2,3]};
var str = 'sdfsdf';

var json2 = clone(json);

alert(json['c'])
function clone(obj){
  var oNew = new obj.constructor(obj.valueOf());
  if(obj.constructor == Object){
    for(var i in obj){
      oNew[i] = obj[i];
      if(typeof(oNew[i]) == 'object'){
        clone(oNew[i]);
      }
    }
  }
  return oNew;
}
```

## 假设页面上10个a标签，给a标签添加点击事件，点击弹出相应的index值

***1. 加索引***

```js
var aLinks=document.getElementsByTagName('a');
for(var i=0,l= aLinks.length;i<l;i++)
{
    aLinks[i].Index=I;
    aLinks[i].onclick=function(){alert(this.Index)};
}
```
***2. 闭包***

```js
var aLinks=document.getElementsByTagName('a');
for(var i=0,l= aLinks.length;i<l;i++)
{
    aLinks[i].Index=I;
    aLinks[i].onclick=function(){alert(this.Index)};
}
```

## 实现左侧规定宽200，右侧自适应宽度的布局

左侧进行绝对定位，右侧设置一个margin-left:200px;


## 在作用域内的变量后置声明问题

with `var`, will look for var first

```js
var aa="out_aa";
function show(){
var cc=aa;
var aa="in_aa";
var dd=aa;
console.log("cc is:" + cc); // undefined
console.log("dd is:" + dd); // in_aa
}
show();
```

without `var` :

```js
var aa="out_aa";
function show(){
var cc=aa;
aa="in_aa";
var dd=aa;
console.log("cc is:" + cc); // out_aa
console.log("dd is:" + dd); // in_aa
}
show();
```
