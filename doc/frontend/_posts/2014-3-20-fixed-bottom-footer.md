---
layout: post
title:  a footer fixed to bottom
categories: frontend
tags: front-end footer
---

[Sticky Footer](http://css-tricks.com/snippets/css/sticky-footer/)

[如何将页脚固定在页面底部](http://www.w3cplus.com/css/css-sticky-foot-at-bottom-of-the-page)

## resource

```html
<style type="text/css">
* {
        padding: 0;
        margin: 0;
}
html,
body {
        height: 100%;
}
.section {
        min-height: 100%;
}
.footer {
        height: 60px;
        background: #000;
        margin-top: -60px;
        color: #FFF;
}
</style>
<div class="section">section</div>
<div class="footer">footer</div>
```