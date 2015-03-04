---
layout: post
title:  在浏览器中生成文件并下载
tags: javascript
---

## 利用 a 标签的 [download](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download) 属性, 然后 trigger 点击事件，实现下载

```js
function downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}
```

保存图片的一个[例子](http://jsfiddle.net/codepo8/V6ufG/2/)：

```js
var link = document.createElement('a');
link.innerHTML = 'download image';
link.addEventListener('click', function(ev) {
    link.href = canvas.toDataURL();
    link.download = "mypainting.png";
}, false);
document.body.appendChild(link);
```
