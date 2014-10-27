## Loaf.js [![Build Status](https://travis-ci.org/mojo-js/loaf.js.svg?branch=master)](https://travis-ci.org/mojo-js/loaf.js)


Loaf allows you to keep track, and modify document fragments that have been appended to the DOM. For example:

```javascript
var helloSection = loaf(), buttonSection = loaf(), buttonElement;

// add multiple items - this demonstrates how multiple nodes are controlled by one
// section
helloSection.appendChild(document.createTextNode("Hello "));
helloSection.appendChild(document.createTextNode("World!"));

// setup the button which toggles the message visibility
buttonSection.appendChild(buttonElement = $("<div><a href='#'>Toggle Message Visibility</a></div>")[0]);

// create a toggle for the "Hello World!" message.
$(buttonElement).click(function () {
    if(helloSection.visible) {
        helloSection.hide();
    } else {
        helloSection.show();
    }
});

// convert the sections into controlled document fragments.
document.body.appendChild(helloSection.toFragment());
document.body.appendChild(buttonSection.toFragment());
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


Here's a live example: http://jsfiddle.net/4L8wy/1/. Be sure to inspect the DOM as you're toggling the message visibility!

## API

### section loaf(nodeFactory = document)

creates a new block of dom elements

### section.replace(node)

inserts as child at the end of the target node.

### section.hide()

hides the section - replaces all bundled nodes with a placeholder node

### section.show()

displays the section if it's hidden

### section.appendChild(children...)

appends a node to the section

### section.appendChild(children...)

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


