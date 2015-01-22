---
layout: post
title:  "the use of closure"
categories: javascript
---
## make flag or counter structure more clean
normally, we use counter or flag as this:

```javascript

	var flag = false;
	function turnTrue(){
		return flag = true;
	}
	function turnFalse(){
		return flag = false;
	}
```
or:
```javascript

	var flag = false;
	function turnTrue(){
		return flag = !flag;
	}
```

then, we can use closure to make it more structive:

```javascript

	function makeTurnBooln(){
		var flag = false;
		return function(){
			return flag = !flag;
		}
	}
	var turnBooln = makeTurnBooln();
	turnBooln() // true
	turnBooln() // false
	turnBooln() // true
```
or:

```javascript

	function makeTurnObj(){
		var flag = false;
		return {
			turnTrue : function(){
				return flag = true;
			},

			turnFalse : function(){
				return flag = false;
			}
		}
	}
	
	var turnBoolnObj = makeTurnObj();	
	turnBoolnObj.turnTure()  // true
	turnBoolnObj.turnFalse()  // false
```

##### object pattern compare to  closure pattern:

```javascript

	makeTurnObj = {
		flag : false,

		turnTrue : function(){
			return flag = true;
		},

		turnFalse : function(){
			return flag = false;
		}
		
	}
	
	makeTurnObj.turnTure()  // true
	makeTurnObj.turnFalse()  // false
```