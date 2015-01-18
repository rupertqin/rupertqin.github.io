---
layout: post
title:  vanilla js vs jquery
tags: javascript vanilla jquery
---


# 现在已经是不是可以不需要jQuery了？

jQuery 4大功能： 1，选择器 2，Dom操作 3，事件绑定 4，Ajax。 我们试试看用原生 js 和 jQuery 对比看看

## 1，选择器

css3 选择器的两种用法：

  选择所有： `document.querySelectorAll(selectors)`

  选择一个： `document.querySelector(selectors)`

此两种又可以延伸为：

选择所有： `element.querySelectorAll(selectors)`

选择一个： `element.querySelector(selectors)`

```javascript
// jQuery
$('#myParent > [ng-click]');

// Vanilla
document.querySelector('#myParent > [ng-click]');
```

```javascript
// jQuery
var divs = $('div')

// Vanilla
var divs = document.querySelectorAll('div')
```

```javascript
// jQuery
var el = $('＃test');
var matches = el.find('div.highlighted > p');

// Vanilla
var el = document.querySelector('#test');
var matches = el.querySelectorAll('div.highlighted > p');
```

排除
```javascript
// jQuery
$('div').not('.ignore');
$('div:not(.ignore)');

// Vanilla
document.querySelectorAll('DIV:not(.ignore)');
```

选择多项
```javascript
// jQuery
$('div, a, p');

// Vanilla
document.querySelectorAll('div, a, p');
```

于是我们可以总结得出一个 function 可以取代 jQuery 的选择器， 可以像用 jQuery 一样去用：
```javascript
window.$ = function(selector) {
    var selectorType = 'querySelectorAll';

    if (selector.indexOf('#') === 0) {
        selectorType = 'getElementById';
        selector = selector.substr(1, selector.length);
    }

    return document[selectorType](selector);
};
```


## 2，Dom 操作

### Transversing

```javascript
// jQuery
var parent = $('#about').parent()

// Vanilla
var parent = document.getElementById('about').parentNode
```

```javascript
// jQuery
if($('#wrap').is(':empty'))

// Vanilla
if(!document.getElementById('wrap').hasChildNodes())
```

```javascript
// jQuery
var nextElement = $('#wrap').next()

// Vanilla
var nextElement = document.getElementById('wrap').nextSibling
```

### 样式

```javascript
// jQuery

$('body').css('width', 100)  //设置

$('body').css('width', '')   //取消设置

// Vanilla
document.querySelector('body').style.width = '100px' //设置
document.querySelector('body').style.width = null //取消设置
```

```javascript
// jQuery
var newDiv = $('<div/>')

// Vanilla
var newDiv = document.createElement('div')
```

### 属性：
```javascript
// jQuery
$('img').filter(':first').attr('alt', 'My image')
$('img').filter(':first').removeAttr('alt')

// Vanilla
document.querySelector('img').setAttribute('alt', 'My image')
document.querySelector('img').removeAttribute('alt')
```

### 类名：
```javascript
// jQuery
newDiv.addClass('foo')
newDiv.removeClass('foo')

// Vanilla
newDiv.classList.add('foo')
newDiv.classList.remove('foo')
```
toggle class:
```javascript
// jQuery
newDiv.toggleClass('foo')

// Vanilla
newDiv.classList.toggle('foo')
```

### 创建元素：
```javascript
// jQuery
var newDiv = $('<div/>');

// Vanilla
var newDiv = document.createElement('div');
```

### 插入元素：
```javascript
// jQuery
$('body').append($('<p/>'));

// Vanilla
document.body.appendChild(document.createElement('p'))
// or
document.body.insertAdjacentHTML('beforeend', document.createElement('p'));
```
```javascript
// jQuery
$('#1').before('<div id="0.9"></div>');

// Vanilla
document.getElementById('1')
    .insertAdjacentHTML('beforebegin', '<div id="0.9"></div>');
```
```javascript
// jQuery
$('#parent').prepend('<div id="newChild"></div>');

// Vanilla
document.getElementById('parent')
    .insertAdjacentHTML('afterbegin', '<div id="newChild"></div>');
```
### 复制元素：
```javascript
// jQuery
var clonedElement = $('#about').clone();

// Vanilla
var clonedElement = document.getElementById('about').cloneNode(true);
```

### 删除元素：

```javascript
// jQuery
$('#top').empty()

// Vanilla
var element = document.getElementById("top");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}

// or
element.innerHTML = '';
element.outerHTML = '';
```

## 3, 事件绑定

### document.ready

其实可以把 js 放到页面底部， 运行的时候， DOM 已经生成
```javascript
// jQuery
$(document).ready(function() {
  // code
})

// Vanilla
document.addEventListener('DOMContentLoaded', function() {
  // code
})
```

### 监听
```javascript
// jQuery
$('a').click(function() {
  // code…
})

// Vanilla
[].forEach.call(document.querySelectorAll('a'), function(el) {
  el.addEventListener('click', function() {
    // code…
  })
})
// or

Element.prototype.on = Element.prototype.addEventListener;
NodeList.prototype.on = function (event, fn) {
  []['forEach'].call(this, function (el) {
    el.on(event, fn);
  });
  return this;
};
```
### 触发

```javascript
// jQuery
$('a').click(function() {
  // code…
})

// Vanilla
Element.prototype.trigger = function (type, data) {
　　var event = document.createEvent('HTMLEvents');
　　event.initEvent(type, true, true);
　　event.data = data || {};
　　event.eventName = type;
　　event.target = this;
　　this.dispatchEvent(event);
　　return this;
};

NodeList.prototype.trigger = function (event) {
　　[]['forEach'].call(this, function (el) {
　　　　el['trigger'](event);
　　});
　　return this;
};

```


## 4， AJAX

### GET
```javascript
// jQuery
$.get('//example.com', function (data) {
  // code
})

// Vanilla
var httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function (data) {
  // code
}
httpRequest.open('GET', url)
httpRequest.send()
```

### a fn mix with GET & POST
```js
function request(type, url, opts, callback) {
  var xhr = new XMLHttpRequest();
  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }
  xhr.open(type, url);
  var fd = new FormData();
  if (type === 'POST' && opts) {
    for (var key in opts) {
      fd.append(key, JSON.stringify(opts[key]));
    }
  }
  xhr.onload = function () {
    callback(JSON.parse(xhr.response));
  };
  xhr.send(opts ? fd : null);
}

var get = request.bind(this, 'GET');
var post = request.bind(this, 'POST');
```

### POST
```javascript
// jQuery
$.post('//example.com', { username: username }, function (data) {
  // code
})

// Vanilla
var httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function (data) {
  // code
}
httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
httpRequest.open('POST', url)
httpRequest.send('username=' + encodeURIComponent(username))
```

### JSONP
```javascript
// jQuery
$.ajax('http://jsonp-aware-endpoint.com/user', {
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
        id: 123
    }
}).then(function(response) {
    // handle requested data from server
});

// Vanilla
window.myJsonpCallback = function(data) {
    // handle requested data from server
};

var scriptEl = document.createElement('script');
scriptEl.setAttribute('src',
    'http://jsonp-aware-endpoint.com/user?callback=myJsonpCallback&id=123');
document.body.appendChild(scriptEl);
```

### 上传文件

```javascript
// jQuery
var file = $('#test-input')[0].files[0],
    formData = new FormData();

formData.append('file', file);

$.ajax('myserver/uploads', {
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData
});

// or
var file = $('#test-input')[0].files[0];

$.ajax('myserver/uploads', {
    method: 'POST',
    contentType: file.type,
    processData: false,
    data: file
});

// Vanilla
var formData = new FormData(),
    file = document.getElementById('test-input').files[0],
    xhr = new XMLHttpRequest();

formData.append('file', file);
xhr.open('POST', 'myserver/uploads');
xhr.send(formData);

// or
var file = document.getElementById('test-input').files[0],
    xhr = new XMLHttpRequest();

xhr.open('POST', 'myserver/uploads');
xhr.setRequestHeader('Content-Type', file.type);
xhr.send(file);

```

参考：  
[Github: vanilla query](https://github.com/makesites/vanilla-query)  
[You Don't Need jQuery (anymore)](http://blog.garstasio.com/you-dont-need-jquery/)
[Element.insertAdjacentHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML)
[如何做到 jQuery-free？](http://www.ruanyifeng.com/blog/2013/05/jquery-free.html)
