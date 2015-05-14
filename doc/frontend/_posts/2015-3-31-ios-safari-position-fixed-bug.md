---
layout: post
title:  怎么解决 ios safari 中当 focus on input 弹出键盘，fixed element 位置错乱的问题
tags: safari ios html
---

[how-do-i-stop-my-fixed-navigation-from-moving-like-this-when-the-virtual-keyboar](http://stackoverflow.com/questions/15273098/)

```js
$(document).on('focus', 'textarea,input,select', function() {
    $('.navbar.navbar-fixed-top').css('position', 'absolute');
}).on('blur', 'textarea,input,select', function() {
    $('.navbar.navbar-fixed-top').css('position', '');
});
```
