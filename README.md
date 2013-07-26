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

loaf1.replace($("#loaf-placeholder"));
loaf1.append($("<div>Hello World!</div>"));


loaf.replace($("#loaf-placeholder2"));
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


## API

### section loaf(nodeFactory = document)

creates a new block of dom elements

### section.replace(node)

inserts as child at the end of the target node.

### section.hide()

hides the section - replaces all bundled nodes with a placeholder node

### section.show()

displays the section if it's hidden

### section.append(children...)

appends a node to the section

### section.prepend(children...)

prepends a node to the section

### section.replaceChildNodes(children...)

disposes the loaf

### section.toFragment()

returns the section as a document fragment

### section.dispose()

removes all child nodes

### section.getChildNodes()

returns an array of the child nodes

### section.start

the start marker for the section

### section.end

the stop marker for the section


