# 1. JavaScript

## 1.1 jQuery

```javascript

$(document).ready(function(){

});
```
监听事件
```javascript
$("#ul-test").on('click', function () {
        let this_li = $(this);
        console.log(this_li)
    })
```