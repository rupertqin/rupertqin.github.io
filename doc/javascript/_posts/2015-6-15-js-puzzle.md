---
layout: post
title:  js 的几道面试题
tags: js puzzle
---


[前端技能挑战](http://www.nowcoder.com/ta/front-end)

## dom 节点查找

```js

```

## 获取 url 参数
获取 url 中的参数
1. 指定参数名称，返回该参数的值 或者 空字符串
2. 不指定参数名称，返回全部的参数对象 或者 {}
3. 如果存在多个同名参数，则返回数组
输入例子:
getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe', 'key')

输出例子:
['1', '2', '3']

```js
function getUrlParam(sUrl, sKey) {
    var str = sUrl.split('?')[1];
    str = str.split('#')[0];
    if(!str) return;
    var obj = {};
    var strArr = str.split('&');
    while (strArr.length) {
        var pair = strArr[0].split('=');
        var key = pair[0];
        var val = pair[1];
        if (!obj[key]) {
            obj[key] = val;
        } else {
            if ( Object.prototype.toString.call(obj[key]) !== '[object Array]' ) {
                obj[key] = [obj[key], val];
            } else {
                obj[key].push(val);
            }
        }
        strArr.shift();
    }
    if (sKey === undefined) {
        return obj;
    } else {
        return obj[sKey] || '';
    }
}
```

## 修改 this 指向
封装函数 f，使 f 的 this 指向指定的对象
输入例子:
bindThis(function(a, b){return this.test + a + b}, {test: 1})(2, 3)

输出例子:
6

```js
function bindThis(f, oTarget) {
    return function() {
        return f.apply(oTarget, arguments)
    }
}
```

## 根据包名，在指定空间中创建对象
根据包名，在指定空间中创建对象
输入描述:
namespace({a: {test: 1, b: 2}}, 'a.b.c.d')


输出描述:
{a: {test: 1, b: {c: {d: {}}}}}

```js
function namespace(oNamespace, sPackage) {
    for (var i= 0, n = sPackage.length; i < n; i++) {
        var str = sPackage.slice(0, i*2+1);
        if (Object.prototype.toString.call( eval('oNamespace.' + str)) !== '[object Object]') {
            eval('oNamespace.' + str + '={}');
        }
    }
    return oNamespace;
}
```

## 数组去重
为 Array 对象添加一个去除重复项的方法
输入例子:
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq()

输出例子:
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']

```js
Array.prototype.uniq = function () {
    var arr = this;
    var newArr = [];
    var obj = {};
    for (var i = 0, n = arr.length; i < n; i++) {
        var key = {}.toString.call(arr[i]) + arr[i]
        if (!obj[key]) {
            newArr.push(arr[i]);
            obj[key] = 1;
        } else if ({}.toString.call(arr[i]) === '[object Object]'){
          newArr.push(arr[i]);
        }

    }
    return newArr;
};
```

## 斐波那契数列
用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等

```js
function fibonacci(n) {
    if (n == 1 || n == 2) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}
```


## 时间格式化输出
按所给的时间格式输出指定的时间
格式说明
对于 2014.09.05 13:14:20
yyyy: 年份，2014  
yy: 年份，14  
MM: 月份，补满两位，09  
M: 月份, 9  
dd: 日期，补满两位，05  
d: 日期, 5  
HH: 24制小时，补满两位，13  
H: 24制小时，13  
hh: 12制小时，补满两位，01  
h: 12制小时，1  
mm: 分钟，补满两位，14  
m: 分钟，14  
ss: 秒，补满两位，20  
s: 秒，20  
w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个，本 demo 结果为 五
输入例子:  
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')  

输出例子:  
2014-09-05 13:14:20 星期五  

```js
function formatDate(oDate, sFormation) {
    var twoFill = function(num){
        return num < 10 ? '0' + num : num;
    }
    var obj = {
      yyyy: oDate.getFullYear(),
      yy: oDate.getFullYear().toString().slice(2,4),
      MM: twoFill( oDate.getMonth() + 1 ),
      M: oDate.getMonth() + 1,
      dd: twoFill( oDate.getDate() ),
      d: oDate.getDate(),
      HH: twoFill( oDate.getHours() ),
      H: oDate.getHours(),
      hh: twoFill( oDate.getHours()%12 || 12 ),
      h: oDate.getHours()%12 || 12,
      mm: twoFill( oDate.getMinutes() ),
      m: oDate.getMinutes(),
      ss: twoFill( oDate.getSeconds() ),
      s: oDate.getSeconds(),
      w:  ['日', '一', '二', '三', '四', '五', '六'][oDate.getDay()]
    };
    for (key in obj) {
        if (sFormation.indexOf(key) !== -1) {
            var reg = new RegExp(key, 'g');
            sFormation = sFormation.replace(reg, obj[key]);
        }
    }
    return sFormation;
}

function formatDate(oDate, sFormation) {
    var twoFill = function(num){
        return num < 10 ? '0' + num : num;
    }
    var obj = {
      yyyy: oDate.getFullYear(),
      yy: oDate.getFullYear().toString().slice(2,4),
      MM: twoFill( oDate.getMonth() + 1 ),
      M: oDate.getMonth() + 1,
      dd: twoFill( oDate.getDate() ),
      d: oDate.getDate(),
      HH: twoFill( oDate.getHours() ),
      H: oDate.getHours(),
      hh: twoFill( oDate.getHours()%12 || 12 ),
      h: oDate.getHours()%12 || 12,
      mm: twoFill( oDate.getMinutes() ),
      m: oDate.getMinutes(),
      ss: twoFill( oDate.getSeconds() ),
      s: oDate.getSeconds(),
      w:  ['日', '一', '二', '三', '四', '五', '六'][oDate.getDay()]
    };

    var token = /(yy){1,2}|(([HhMdms])\1){1,2}|w/g;
    return sFormation.replace(token, function ($0) {
        return $0 in obj ? obj[$0] : $0.slice(1, $0.length - 1);
    });
}
```


## 获取字符串的长度

如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
否则如果字符 Unicode 编码 > 255 则长度为 2
输入例子:
strLength('hello world, 牛客', false)

输出例子:
17

```js
function strLength(s, bUnicode255For1) {
    if(bUnicode255For1) return s.length;
    var extro = 0;
    for (var i = 0, n = s.length; i < n; i++) {
        if (s.charCodeAt(i)>255) extro++;
    }
    return s.length + extro;

}
```

## 邮箱字符串判断
判断输入是否是正确的邮箱格式
输入描述:  
邮箱字符串  


输出描述:  
true表示格式正确  

```js
function isAvailableEmail(sEmail) {
    return  /^\w+@(\[A-Za-z0-9].){2,3}$/.test(sEmail);

}
```
