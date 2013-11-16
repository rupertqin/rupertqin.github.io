---
layout: post
title:  "Chinese css counter"
categories: font-end
tags: fun
---
### Mozilla developer:
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type" class="btn btn-yellow"><span>list-style-type</span></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters" class="btn"><span>CSS counters</span></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset" class="btn btn-blue"><span>counter-reset</span></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment" class="btn btn-green"><span>counter-increment</span></a>

### set Chinese counter use `cjk-ideographic`

```html
	
	<style>
	.counter {
	  counter-reset: section;
	}
	  
	.counter li:before {
	  counter-increment: section;
	  content: counter(section, cjk-ideographic);
	}
	</style>

	<h2>then effect as below</h3>
	<h4>list:</h4>
	<ul style="list-style-type: cjk-ideographic;">
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
```
<a class="jsbin-embed" href="http://jsbin.com/edONIyEC/4/embed?html,output">css counter</a><script src="http://static.jsbin.com/js/embed.js"></script>