---
layout: post
title:  file upload
tags: javascript
---

## Preview an image before it is uploaded
[preview-an-image-before-it-is-uploaded](http://stackoverflow.com/questions/4459379/)

```js
function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#blah').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function(){
  readURL(this);
});
```

```html
<form id="form1" runat="server">
  <input type='file' id="imgInp" />
  <img id="blah" src="#" alt="your image" />
</form>
```

## Reading files in JavaScript using the File APIs
[Reading files in JavaScript using the File APIs](http://www.html5rocks.com/en/tutorials/file/dndfiles/)