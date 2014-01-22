---
layout: post
title:  "Chinese css counter"
categories: front-end
tags: css front-end
---
### Mozilla developer:
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type" class="btn btn-yellow"><span>list-style-type</span></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters" class="btn"><span>CSS counters</span></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset" class="btn btn-blue"><span>counter-reset</span></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment" class="btn btn-green"><span>counter-increment</span></a>

### set Chinese counter use `cjk-ideographic`

```html
<style>
  
  h2:before {counter-reset: section 365;content: counter(section, cjk-ideographic);}
  
  .list-style {counter-reset: section 365;list-style-type: cjk-ideographic;}
  .list-style li:before {counter-increment: section 1000;content: counter(section, cjk-ideographic)}
  
  .counter {
    counter-reset: section;
  }
  .counter li:before {
    counter-increment: section;
    content: counter(section, cjk-ideographic);
  }
  
  .start-from {counter-reset: section 100;}
  .start-from li:before {counter-increment: section -10;content: counter(section, cjk-ideographic);}
  
</style>

<h4>specify number:</h4>
<h2>then effect as below</h2>
<h4>list:</h4>
<ul class="list-style">
    <li>Plain ideographic numbers</li>
    <li>(Chinese-Japanese-Korean)</li>
    <li>go home</li>
    <li>climp up the wall</li>
</ul>

<h4>counter:</h4>
<ul class="counter">
    <li>Plain ideographic numbers</li>
    <li>(Chinese-Japanese-Korean)</li>
    <li>go home</li>
    <li>climp up the wall</li>
</ul>

<h4>start from:</h4>
<ul class="start-from">
    <li>Plain ideographic numbers</li>
    <li>(Chinese-Japanese-Korean)</li>
    <li>go home</li>
    <li>climp up the wall</li>
</ul>
```
<a class="jsbin-embed" href="http://jsbin.com/edONIyEC/7/embed?html,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>