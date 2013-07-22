Sheaf bundles DOM elements together, similar to a document fragment.

Input:
```html
<html>
  <head>
    
  </head>
  <body>
    
    <!-- give loaf something to look for -->
    <div id="loaf-placeholder" style="display:none;"></div>
    <div id="loaf-placeholder2" style="display:none;"></div>
  </body>
</html>
```

Bundle:

```javascript
var loaf = require("loaf"),
loaf1 = loaf(),
loaf2 = loaf();

loaf1.replace($("<div>Hello World!</div>"));
loaf1.attach($("#loaf-placeholder"));


loaf.replace($("#loaf-placeholder"));
loaf2.append($("<div>What a nice day!</div>"));
```

Output:
```html
<html>
  <head>
    
  </head>
  <body>
    
    <!-- give loaf something to look for -->
    <div>Hello World!</div>
    <div>What a nice day!</div>
  </body>
</html>
```
