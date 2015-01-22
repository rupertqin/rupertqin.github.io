---
layout: post
title:  "underscore"
categories: javascript
---

## sumup $PATH:
```javascript
function sumUpString(str, separator){
  var sum = {};
  var list = str.split(separator);
  for(var i in list){
    if(!list[i]) continue;
    if(!sum[list[i]]){
      sum[list[i]]=1
    }else{
      sum[list[i]]++
    } 
  }
  return sum;
}
```