---
layout: post
title:  response design
categories: front-end
tags: css response
---

## vh, vw, vmin, vmax
[Viewport Sized Typography](http://css-tricks.com/viewport-sized-typography/)

when come to `font-size: 10vw`, in some browsers such as safari, when the browswer resized, the font doesn't ajust itself

o fix this issue (allow resizing without page refresh) you need to cause a "repaint" on the element. I used jQuery and just fiddled with each elements (irrelevant, in this case) z-index value, which triggers the repaint.

```js
causeRepaintsOn = $("h1, h2, h3, p");

$(window).resize(function() {
  causeRepaintsOn.css("z-index", 1);
});
```

## 4 works of a three-man
[PARAVEL WORK](http://paravelinc.com/work.php)


[LETTERING.JS - A jQuery plugin for radical web typography](http://letteringjs.com/)

[FitText - A jQuery plugin for inflating web type](http://fittextjs.com/)

[Foldy960 - A responsive 960 grid from Paravel](https://github.com/davatron5000/Foldy960)

[FITVIDS.JS - A lightweight, easy-to-use jQuery plugin for fluid width video embeds.](http://fitvidsjs.com/)

## RESPONSIVE DESIGN TESTING TOOL
[VIEWPORT RESIZER](http://lab.maltewassermann.com/viewport-resizer/)


