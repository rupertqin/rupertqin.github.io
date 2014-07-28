---
layout: post
title:  easy two-way data binding 
tags: javascript
---

## a library
[DataBind.js](https://github.com/grnadav/databind)

## Easy Two-Way Data Binding in JavaScript
[Easy Two-Way Data Binding in JavaScript](http://www.lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript/)

PS: the jQuery version should be 1.X.X, coz $.data is not work in version 2.X.X to access attr.


```js
function DataBinder( object_id ) {
  // Use a jQuery object as simple PubSub
  var pubSub = jQuery({});

  // We expect a `data` element specifying the binding
  // in the form: data-bind-<object_id>="<property_name>"
  var data_attr = "data-bind-" + object_id,
      message = object_id + ":change";

  // Listen to change events on elements with the data-binding attribute and proxy
  // them to the PubSub, so that the change is "broadcasted" to all connected objects
  jQuery( document ).on( "change keyup", "[" + data_attr + "]", function( evt ) {
    var $input = jQuery( this );

    pubSub.trigger( message, [ $input.attr( data_attr ), $input.val() ] );
  });

  // PubSub propagates changes to all bound elements, setting value of
  // input tags or HTML content of other tags
  pubSub.on( message, function( evt, prop_name, new_val ) {
    jQuery( "[" + data_attr + "=" + prop_name + "]" ).each( function() {
      var $bound = jQuery( this );

      console.log("change!")
      if ( $bound.is("input, textarea, select") ) {
        $bound.val( new_val );
      } else {
        $bound.html( new_val );
      }
    });
  });

  return pubSub;
}

function DataBinderY( object_id ) {
  // Create a simple PubSub object
  var pubSub = {
        callbacks: {},

        on: function( msg, callback ) {
          this.callbacks[ msg ] = this.callbacks[ msg ] || [];
          this.callbacks[ msg ].push( callback );
        },

        publish: function( msg ) {
          this.callbacks[ msg ] = this.callbacks[ msg ] || []
          for ( var i = 0, len = this.callbacks[ msg ].length; i < len; i++ ) {
            this.callbacks[ msg ][ i ].apply( this, arguments );
          }
        }
      },

      data_attr = "data-bind-" + object_id,
      message = object_id + ":change",

      changeHandler = function( evt ) {
        var target = evt.target || evt.srcElement, // IE8 compatibility
            prop_name = target.getAttribute( data_attr );

        if ( prop_name && prop_name !== "" ) {
          pubSub.publish( message, prop_name, target.value );
        }
      };

  // Listen to change events and proxy to PubSub
  if ( document.addEventListener ) {
    document.addEventListener( "change", changeHandler, false );
  } else {
    // IE8 uses attachEvent instead of addEventListener
    document.attachEvent( "onchange", changeHandler );
  }

  // PubSub propagates changes to all bound elements
  pubSub.on( message, function( evt, prop_name, new_val ) {
    var elements = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]"),
        tag_name;

    for ( var i = 0, len = elements.length; i < len; i++ ) {
      tag_name = elements[ i ].tagName.toLowerCase();

      if ( tag_name === "input" || tag_name === "textarea" || tag_name === "select" ) {
        elements[ i ].value = new_val;
      } else {
        elements[ i ].innerHTML = new_val;
      }
    }
  });

  return pubSub;
}

function User( uid ) {
  var binder = new DataBinder( uid ),

      user = {
        attributes: {},

        // The attribute setter publish changes using the DataBinder PubSub
        set: function( attr_name, val ) {
          this.attributes[ attr_name ] = val;
          // binder.publish( uid + ":change", attr_name, val, this );
          binder.trigger( uid + ":change", [ attr_name, val, this ] );
        },

        get: function( attr_name ) {
          return this.attributes[ attr_name ];
        },

        _binder: binder
      };

  // Subscribe to the PubSub
  binder.on( uid + ":change", function( evt, attr_name, new_val, initiator ) {
    if ( initiator !== user ) {
      user.set( attr_name, new_val );
    }
  });

  return user;
}

// javascript
var user = new User( 123 );
user.set( "name", "Wolfgang" );

```

and the mockup: 

```html
<input type="text" data-bind-123="name" />
<input type="number" data-bind-123="id" />
<input type="number" data-bind-123="id" />
<div data-bind-123="name" ></div>
<div data-bind-123="id" ></div>
```

### examples 

__jQuery:__
<a class="jsbin-embed" href="http://jsbin.com/matopuwe/3/embed?html,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

__valilla:__
<a class="jsbin-embed" href="http://jsbin.com/matopuwe/2/embed?html,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>