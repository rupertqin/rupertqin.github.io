---
layout: post
title:  怎么取消 iOS 的 safari 浏览器中 select, link, input等 默认的样式
tags: safari ios html
---

## iOS 的 safari 浏览器中 select, link, input等都有一些默认样式，我们怎么取消呢？

```css
-webkit-appearance: none;
```

## 对 link, label[for] 点击会闪一下背景色，这样设置取消:

```css
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
```

## 取消iOS 的 safari 自动识别电话号码样式
```html
<meta name="format-detection" content="telephone=no">
```
