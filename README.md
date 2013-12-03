## Loaf.js [![Alt ci](https://travis-ci.org/classdojo/loaf.js.png)](https://travis-ci.org/classdojo/loaf.js)

Loaf creates virtual "sections" of DOM elements - a sort of document fragment that can be referenced anytime it's attached to the DOM. Loaf is used in:

- [mojo.js](https://github.com/classdojo/mojo.js) - javascript framework
- [paperclip.js](https://github.com/classdojo/paperclip.js) - template engine.



Input:
```html
<html>
  <head>
    
  </head>
  <body>
    
    <!-- give loaf something to look for -->
    <div id="application"></div>
  </body>
</html>
```

Bundle:

```javascript
var section = loaf(), component = loaf(), comp;

// add multiple items
section.append(document.createTextNode("Hello "));
section.append(document.createTextNode("World!"));

// setup the 
component.append(comp = $("<div><a href='#'>Toggle Message Visibility</a></div>")[0]);


// create a toggle for the "Hello World!" message.
$(comp).click(function () {
    if(section._detached) {
        section.show();
    } else {
        section.hide();
    }
});

// add the document fragments.
$("#application").append(section.toFragment());
$("#application").append(component.toFragment());
```

Output:
```html
<html>
  <head>
    
  </head>
  <body>
    <div id="application">
      Hello World!
      <div>
        <a href="#">Toggle Message Visibility</a>
      </div>
    </div>
  </body>
</html>
```


Here's a live example: http://jsfiddle.net/4L8wy/.

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


