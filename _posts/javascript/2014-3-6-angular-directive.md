---
layout: post
title:  angular directive
tags: javascript angular directive
---

[Checklist-model](http://vitalets.github.io/checklist-model/)

## make a required function in a group set of checkbox
[angularjs group check box validation](http://stackoverflow.com/questions/19632933/angularjs-group-check-box-validation)

```js
$scope.someSelected = function (object) {
  return Object.keys(object).some(function (key) {
    return object[key];
  });
}
```

```html
<input
    type="checkbox"
    value="{ {val.id} }"
    ng-model="formData.selectedFruits[val.id]"
    ng-required="!someSelected(formData.selectedFruits)"
>
```
