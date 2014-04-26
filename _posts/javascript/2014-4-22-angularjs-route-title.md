---
layout: post
title:  update title base on route in angularjs
tags: javascript angularjs route title
---

[vojtajina / angular-bind-title.html](https://gist.github.com/vojtajina/1022724) real answer in comments below the main code in the gist.

## ps: `ng-app` must in tag `html`, the code below:

```html
<html ng-app="myApp">
<title ng-bind="title + ' - Suffix'"><title>
```

```js
var app= angular.module( 'myApp', [] )
.config( function( $routeProvider ){

    $routeProvider.when('/', {
        title: "Access",
        templateUrl: 'partials/login.html',
    });

    $routeProvider.otherwise({ redirectTo: '/' });

})
.run( [ '$location', '$rootScope', function( $location, $rootScope ){

    $rootScope.$on( '$routeChangeSuccess', function( event, current, previous ){
        //console.log( current.$$route.title );
        $rootScope.title= _.isUndefined( current.$$route.title ) ? 'MyApp' : current.$$route.title;
    });

}]);
```