---
layout: post
title:  "regular expressions"
tags: regular
---

## source
reference:  
[Regular Expressions Quick Reference](http://www.regular-expressions.info/refquick.html)
[Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

tutorial:  
[Regular-Expressions.info](http://www.regular-expressions.info/)
[Regular Expression Reference](http://www.araxis.com/merge/documentation-windows/regular-expression-reference)

online tool:   
[RegExr](http://gskinner.com/RegExr/)
[Debuggex](https://www.debuggex.com)

## groups
`(0{1,})|(abs){2}|([1-9][0-9]*)`

email: `^([\w.-]+)@([\da-z\-]+)(\.([a-z]{2,6})){1,2}$`

URL: `^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$`

IP: `^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`

HTML tag: `^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$`