---
layout: post
title:  filter ordering object in angular
tags: javascript angular
---
## filter 'orderBy' don't work in object, so build a filter, the important is to return an Array
[AngularJS Filter for Ordering Objects (Associative Arrays or Hashes) with ngRepeat](http://justinklemm.com/angularjs-filter-ordering-objects-ngrepeat/)

```js
myApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field]);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
```

```html
<ul ng-controller="scartter">
  <li ng-repeat="(key, item) in items | orderObjectBy:'color':true">{{ item.color }}</li>
</ul>
```

<a class="jsbin-embed" href="http://jsbin.com/bopufoji/1/embed?html,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>