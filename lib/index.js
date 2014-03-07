var protoclass = require("protoclass"),
nofactor       = require("nofactor");

/**
 * @module mojo
 * @module mojo-core
 */


/**

Sections allow you to manage groups of elements. This is important for components
such as the `ListView` where you might have many list items that share the same parent node.
For instance, a list component might generate the following HTML:

```html
<!-- ContactsListView -->
<ul id="contacts">

  <!-- ContactView 1 -->
  <li>Monica</li>


  <!-- ContactView 2 -->
  <li>Sam</li>


  <!-- ContactView 3 -->
  <li>Liam</li>
</ul>
```

Sections work by sandwiching elements between two marker marker elements: `start` and `end`. These
Are empty text nodes that are invisible to the user, but allow the application to maintain groups of elements.


### Example

```javascript
var loaf    = require("loaf"),
nodeFactory = require("nofactor").nodeFactory;

// set the node factory. In this case, we're creating a section
// that can be used in node.js
var section = loaf(nodeFactory.string);

// append some elements in the section
section.append(nodeFactory.createTextNode("Hello"));
section.append(nodeFactory.createTextNode("John"));

console.log(section.toString()); // Hello John
console.log(section.getChildNodes().length); // 4 - includes start & end markers
console.log(section.getInnerChildNodes().length); // 2 - contains only text elements appended
```

@class Section
@constructor
@param {BaseNodeFactory} nodeFactory nodeFactory to use when creating sections
@param {Element} start (optional) the start element 
@param {Element} end (optional) the end element
*/


var Section = function (nodeFactory, start, end) {

  /**
   * the node factory which creates elements, text nodes, comments, and document fragments
   * @property nodeFactory
   * @type {BaseNodeFactory}
   */

  this.nodeFactory = nodeFactory = nodeFactory || nofactor["default"];

  /**
   * start marker for the section
   * @property start
   * @type {Node}
   */

  this.start       = start || nodeFactory.createTextNode("");

  /**
   * end marker for the section
   * @property end
   * @type {Node}
   */

  this.end         = end   || nodeFactory.createTextNode("");

  /**
   * visibile property which is toggled on hide / show
   * @property visible
   * @type {Boolean}
   */

  this.visible     = true;

  if (!this.start.parentNode) {
    var parent  = nodeFactory.createFragment();
    parent.appendChild(this.start);
    parent.appendChild(this.end);
  }
};


Section = protoclass(Section, {

  /**
   */

  __isLoafSection: true,

  /**
   * Renders the section, and returns the start parent node
   * @method render
   */

  render: function () {
    return this.start.parentNode;
  },

  /**
   * Removes the entire section from the DOM, including the start & end markers
   * @method remove
   */

  remove: function () {
    // this removes the child nodes completely
    return this.nodeFactory.createFragment(this.getChildNodes());
  },

  /** 
   * shows the section if it's hidden
   * @method show
   */


  show: function () {
    if(!this._detached) return this;
    this.append.apply(this, this._detached.getInnerChildNodes());
    this._detached = void 0;
    this.visible = true;
    return this;
  },

  /**
   * hides the fragment, but maintains the start / end elements
   * so it can be shown again in the same spot
   *
   * @method hide
   */

  hide: function () {
    this._detached = this.removeAll();
    this.visible = false;
    return this;
  },

  /**
   * Removes all section elements inside the start & end elements
   * @method removeAll
   */

  removeAll: function () {
    return this._section(this._removeAll());
  },

  /**
   */

  _removeAll: function () {

    var start = this.start,
    end       = this.end,
    current   = start.nextSibling,
    children  = [];

    while (current != end) {
      current.parentNode.removeChild(current);
      children.push(current);
      current = this.start.nextSibling;
    }

    return children;
  },

  /** 
   * appends elements at the end of the section
   * @method append
   * @param {Node} elements... elements to append
   */

  append: function () {
    this._insertAfter(Array.prototype.slice.call(arguments, 0), this.end.previousSibling);
  },

  /** 
   * appends elements at the beginning of the section
   * @method prepend
   * @param {Node} elements... elements to prepend
   */

  prepend: function () {
    this._insertAfter(Array.prototype.slice.call(arguments, 0), this.start);
  },

  /**
   * replaces all child nodes within the start & end elements
   * @method replaceChildNodes
   * @param {Node} elements... elements to replace
   */

  replaceChildNodes: function () {

    //remove the children - children should have a parent though
    this.removeAll();
    this.append.apply(this, arguments);
  },

  /**
   * Stringifies sections
   * @method toString
   */

  toString: function () {
    var buffer = this.getChildNodes().map(function (node) {
      return node.outerHTML || (node.nodeValue != undefined ? node.nodeValue : String(node));
    });
    return buffer.join("");
  },

  /**
   * disposes the section, including start & end elements
   * @method dispose
   */

  dispose: function () {
    if(this._disposed) return;
    this._disposed = true;

    // might have sub sections, so need to remove with a parent node
    this.removeAll();
    this.start.parentNode.removeChild(this.start);
    this.end.parentNode.removeChild(this.end);
  },

  /**
   * returns all elements in the section, including start & end elements
   * @method getChildNodes
   */

  getChildNodes: function () {
    var cn   = this.start,
    end      = this.end.nextSibling,
    children = [];


    while (cn != end) {
      children.push(cn);
      cn = cn.nextSibling;
    }

    return children;
  },

  /**
   * returns all inner elements in the section, not including start & end elements
   * @method getInnerChildNodes
   */

  getInnerChildNodes: function () {
    var cn = this.getChildNodes();
    cn.shift();
    cn.pop()
    return cn;
  },

  /**
   */

  _insertAfter: function(newNodes, refNode) {
    if(!newNodes.length) return;

    if(newNodes.length > 1) {
      newNodes = this.nodeFactory.createFragment(newNodes);
    } else {
      newNodes = newNodes[0];
    }

    return refNode.parentNode.insertBefore(newNodes, refNode.nextSibling);
  },

  /**
   */

  _section: function (children) {
    var section = new Section(this.nodeFactory);
    section.append.apply(section, children);
    return section;
  }
});

module.exports = function (nodeFactory, start, end)  {
  return new Section(nodeFactory, start, end);
}