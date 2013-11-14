---
layout: post
title:  "Functional javascript"
categories: javascript
---
It’s worth mentioning that unlike in many other languages, **JavaScript object keys can only ever be strings.** This may occasionally cause confusion when using _.invert:

```javascript
_.keys(_.invert({a: 138, b: 9})); 
//=> ['9', '138']    
```