---
layout: post
title:  给 input[type=file], select 自定义样式
tags: select file input
---

## 1, 实现原理是把 input/select 设为透明，置于按钮顶层，js 监听 onchange 事件，把 value 取出放于页面内

```html
<div class="wrapper btn btn-primary">
    <span>Upload</span>
    <input type="file" class="upload" id="uploadBtn" />
</div>
<div id="uploadFile"></div>
```

注意一个bug: input/select 一定加上 border 属性，否则无法实现 100% 覆盖:

```css
.wrapper {
	position: relative;
	overflow: hidden;
	margin: 10px;
}

.wrapper input.upload {
	position: absolute;
	top: 0;
	right: 0;
	margin: 0;
	padding: 0;
	font-size: 20px;
	cursor: pointer;
	opacity: 0;
  border: none;
}
```


```js
document.getElementById("uploadBtn").onchange = function () {
    document.getElementById("uploadFile").innerHTML = this.value;
};
```

## 2, 用webkit 内置属性 支持 chrome 和 safari， select 标签不在此列：

```css
input[type=”file”]::-webkit-file-upload-button
input[type=number]::-webkit-inner-spin-button
input[type=number]::-webkit-outer-spin-button
input[type=range]::-webkit-slider-thumb
```

## 3, 纯 css 做 select 类似第一种方法， 不同的是 要把 select 右边的三角隐藏， 设置超过 100% 的百分比，外面的 wrapper 比内部的 select 宽度小， overflow: hidden  

[例子](http://jsfiddle.net/keu0c29w/5/)
