---
layout: post
title:  "first-letter uppercase in CSS"
categories: font-end
tags: css
---

[:first-letter (:first-letter))](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter)  
[::first-line (:first-line)](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line)

PS: 

* inline elem will be fake, must be block elem

* Only a small subset of all CSS properties can be used inside a declaration block of a CSS ruleset containing a selector using the ::first-line pseudo-element:

for example:

```css
a.m_title {
    display: block;
}

a.m_title:first-letter {
    text-transform: uppercase;
}
```