---
layout: post
title:  angularFire chat app
categories: javascript
tags: angularFire
---



<link rel="stylesheet" type="text/css" href="https://www.firebase.com/css/example.css">

<script src="bower_components/angular/angular.min.js"></script>

<div  ng-app="chat" ng-controller="Chat">
  <div>
    <label for="">Your name: </label><input id="name" type="text" ng-model="username">
  </div>
  <p></p>
  <div id="messagesDiv" auto-scroll="messages" style="height:500px;">
    <div ng-cloak ng-repeat="message in messages">
      <em>{{message.from}}: </em>{{message.content}}
    </div>
  </div>
  <form ng-submit="addMessage()">
    <input id="message" type="text" ng-model="message" placeholder="Message...">
    <input id="send" type="submit" id="submit" value="Send" style="font-size:24px;">
  </form>
  
  <script src="bower_components/firebase/firebase.js"></script>
  <script src="lib/angularfire.min.js"></script>
  <script >
    angular.module('chat', ['firebase'])
      .controller('Chat', ['$scope', '$timeout', 'angularFireCollection',
        function($scope, $timeout, angularFireCollection) {
          var url = 'https://brilliant-fire-7912.firebaseio.com/chat';
          $scope.messages = angularFireCollection(new Firebase(url).limit(50));
          $scope.username = 'Guest' + Math.floor(Math.random()*101);
          $scope.addMessage = function() {
            $scope.messages.add({from: $scope.username, content: $scope.message});
            $scope.message = "";
          }
        }
      ])
      .directive('autoScroll', function($timeout) {
        return function(scope, elements, attrs) {
          scope.$watch("messages.length", function() {
            $timeout(function() {
              elements[0].scrollTop = elements[0].scrollHeight
            });
          });
        }
      });
  </script>
</div>
