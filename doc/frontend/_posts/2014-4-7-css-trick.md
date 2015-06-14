---
layout: post
title:  css trick
categories: frontend
tags: css
---

[Sticky Footer](http://css-tricks.com/snippets/css/sticky-footer/)

[如何将页脚固定在页面底部](http://www.w3cplus.com/css/css-sticky-foot-at-bottom-of-the-page)

[再谈等高列布局、水平垂直居中与置顶页脚](http://www.w3cplus.com/css/pure-css-create-equal-height-column-layout-and-certical-horizontal-centers-and-sticky-footer.html)

[八种创建等高列布局](http://www.w3cplus.com/blog/126.html)

[六种实现元素水平居中](http://www.w3cplus.com/css/elements-horizontally-center-with-css.html)

[CSS制作水平垂直居中对齐](http://www.w3cplus.com/css/vertically-center-content-with-css)

[10 Simple & Smart CSS Snippets](http://www.hongkiat.com/blog/simple-css-snippets/)


## 文字过长省略为 “...”
```css
hide-ellipsis{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## 中平居中
```css
.verticalcenter{
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
}
```
