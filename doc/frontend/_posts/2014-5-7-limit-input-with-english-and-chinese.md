---
layout: post
title:  limit input with both english and chinese
categories: frontend
tags: validation
---

## get the length of field's text

```js
var textLength = fieldValue.replace(/[^\x00-\xFF]/g,'**').length;
```

show you the example:

```js
$('#firend-msg').on('keyup change', function(event){
    var currentText = $(this).val();
    var lastText = $(this).data( 'lastText' );
    var len = currentText.replace(/[^\x00-\xFF]/g,'**').length;
    if(len > 28){
        $(this).val( lastText );
        $(this).validationEngine( 'showPrompt', '一句话就够啦！', 'error' );
    }else{
        $(this).data( 'lastText', currentText );
    }
});
```
