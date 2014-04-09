---
layout: post
title:  "Backbonejs"
categories: javascript
---
## There are a lot of plugin with backbone

[Extensions, Plugins, Resources Dependencies](https://github.com/jashkenas/backbone/wiki/Extensions,-Plugins,-Resources)

[Backbone Plugins](http://backplug.io/)

[10 BACKBONE.JS AND JQUERY USEFUL PLUGINS/ARTICLES](http://www.jquery4u.com/plugins/10-backbone-js-plugins/)

[Top 5 Backbone Plugins](http://tysonlloydcadenhead.com/blog/top-10-backbone-plugins)

[Make Backbone Better With Extensions](http://net.tutsplus.com/tutorials/javascript-ajax/make-backbone-better-with-extensions/)

## Source, books
[Developing Backbone.js Applications](http://addyosmani.github.io/backbone-fundamentals/)

## Relation between View Collection and Model
** the key is only the instance can use then methods of API **

## backbone-patterns
[backbone-patterns](http://ricostacruz.com/backbone-patterns/)

#### Instance a View then set its model, then set edit the model
```javascript

	var Item = Backbone.Model.extend(...);
	var item = new Item();
	var ItemView = Backbone.View.extend(...);
	
	
	var itemView = new ItemView()
    itemView.model = item;
    itemView.model.set({
      part2: item.get('part2') + this.counter // modify item defaults
    });
```

#### And also a View can be set connection with a Model when Building it
```javascript

	var Item = Backbone.Model.extend(...);
	var item = new Item();
	var ItemView = Backbone.View.extend({
		model: item
	});
```

#### It is a little different that set Collection's connection with a Model, you can directly set the Model, without get an instance of Model eight an instance of Model, both!
```javascript

	var Item = Backbone.Model.extend(...);
	var List = Backbone.Collection.extend({
    	model: Item
  });    
```
Or

```javascript

	var Item = Backbone.Model.extend(...);
	var item = Item();
	var List = Backbone.Collection.extend({
    	model: item
  });    
```