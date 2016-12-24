---
layout: post
title:  在移动端判断横屏竖屏
tags: orientation
---

## CSS

```css
 @media (orientation: landscape) { }
 @media (orientation: portrait) { }
```

```html  
 <link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css">
 <link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css">
```

## js

```js
function landscapeOrportrait(){  
  if(window.orientation==180||window.orientation==0){
    alert("竖屏状态！")
  }  
  if(window.orientation==90||window.orientation==-90){
    alert("横屏状态！")
  }  
}  
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", landscapeOrportrait, false);  
```
