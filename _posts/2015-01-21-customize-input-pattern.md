---
layout: post
title: 如何在 angular 中验证中英混合字符的长度
tags:  angular javascript
---

在 js 中我们通常用此方法获取长度：

(如果不太精确, 不是混合的话可以用： `^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$` )

```js
// 西文常用字符集由空格“ ”(0x20)到“~”(0x7e)构成，汉字会落在这个字符集外，而正则表达式[^ -~]表示除空格到“~”外的字符集。
// 或者 [^\x00-\xFF] 表示中文;
var len = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length;

// 或者
var len = str.replace(/[^\x00-\xFF]/g,'**').length;
```

但在 angular 中，如用 ngParttern, 在文档中，只能输入正则表达式， 所以上面的方法行不通
不过我们可以看 ngParttern 中的源码片断

```js
var patternDirective = function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elm, attr, ctrl) {
      if (!ctrl) return;

      var regexp, patternExp = attr.ngPattern || attr.pattern;
      attr.$observe('pattern', function(regex) {
        if (isString(regex) && regex.length > 0) {
          regex = new RegExp('^' + regex + '$');
        }

        if (regex && !regex.test) {
          throw minErr('ngPattern')('noregexp',
            'Expected {0} to be a RegExp but was {1}. Element: {2}', patternExp,
            regex, startingTag(elm));
        }

        regexp = regex || undefined;
        ctrl.$validate();
      });

      ctrl.$validators.pattern = function(value) {
        return ctrl.$isEmpty(value) || isUndefined(regexp) || regexp.test(value);
      };
    }
  };
};

```

#### 最后用的是 `.test()` 方法，只要我们重写这个 `.test()` 方法就可以了

```js
$scope.pattern = {
    min: (function() {
      return {
          test: function(str) {
              var len = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length;
              return len < 11;
          }
      };
  })()
};
```

#### 当然还有一种方法，就是通过 angular 强大的 directive, 注意要继承原生 ngModel 的方法，这个方法比前一个的优势是在 directive 中自定长度：

```html
<input type='text' mix-min-length='10'>

```

```js
.directive('mixMinLength', function(){
  return {
    restrict: "A",
    require: "ngModel",
    link:function(scope,ele,attrs,ctrl) {
      var minLen = +attrs.mixMinLength;
      //View - >Model的更新
      ctrl.$parsers.unshift(function (str) {
        var len = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length;
        if( len >= minLen ){
          ctrl.$setValidity("mixMinLength", true);
          return str;
        } else{
          ctrl.$setValidity("mixMinLength", false);
          return undefined;
        }
      });
    }
  };
})
```
