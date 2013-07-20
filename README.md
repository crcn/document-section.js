Sheaf bundles DOM elements together, similar to a document fragment.

Input:
```html
<html>
  <head>
    
  </head>
  <body>
    
    <!-- give sheaf something to look for -->
    <div id="sheaf-placeholder" style="display:none;"></div>
    <div id="sheaf-placeholder2" style="display:none;"></div>
  </body>
</html>
```

Bundle:

```javascript
var sheaf = require("sheaf"),
sheaf1 = sheaf(),
sheaf2 = sheaf();

sheaf1.replace($("<div>Hello World!</div>"));
sheaf1.attach($("#sheaf-placeholder"));


sheaf.replace($("#sheaf-placeholder"));
sheaf2.append($("<div>What a nice day!</div>"));
```

Output:
```html
<html>
  <head>
    
  </head>
  <body>
    
    <!-- give sheaf something to look for -->
    <div>Hello World!</div>
    <div>What a nice day!</div>
  </body>
</html>
```
