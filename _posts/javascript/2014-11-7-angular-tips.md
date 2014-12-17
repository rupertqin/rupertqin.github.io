---
layout: post
title:  "Angular"
tags: javascript
---
## ng-model not work
[ng-model-undefined-in-the-controller](http://stackoverflow.com/questions/22762725/)

example: [inoic in plnkr](http://plnkr.co/edit/X8CpI0DlHTgSgxHeuptw?p=preview)

solution:
```js
$scope.model = {};
$scope.model.code = "test";

$scope.setCode = function(){
    alert($scope.model.code);
}
```