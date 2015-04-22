var protoclass  = require("protoclass"),
defaultDocument = require("nofactor");

// TODO - figure out a way to create a document fragment in the constructor
// instead of calling toFragment() each time. perhaps
var Section = function (document, start, end) {

  this.document = document = document || defaultDocument;

  // create invisible markers so we know where the sections are

  this.start       = start || document.createTextNode("");
  this.end         = end   || document.createTextNode("");
  this.visible     = true;

  if (!this.start.parentNode) {
    var parent  = document.createDocumentFragment();
    parent.appendChild(this.start);
    parent.appendChild(this.end);
  }
};


Section = protoclass(Section, {

  /**
   */

  __isLoafSection: true,

  /**
   */

  render: function () {
    return this.start.parentNode;
  },

  /**
   */

  clone: function () {

    var parentClone;

    // fragment?
    if (this.start.parentNode.nodeType === 11) {
      parentClone = this.start.parentNode.cloneNode(true);
    } else {
      parentClone = this.document.createDocumentFragment();

      this.getChildNodes().forEach(function (node) {
        parentClone.appendChild(node.cloneNode(true));
      });
    }

    return new Section(this.document, parentClone.childNodes[0], parentClone.childNodes[parentClone.childNodes.length - 1 ]);
  },

  /**
   */

  remove: function () {
    // this removes the child nodes completely
    return this._createFragment(this.getChildNodes());
  },

  /**
   */

  _createFragment: function(nodes) {
    var fragment = this.document.createDocumentFragment();
    nodes.forEach(function(node) {
      fragment.appendChild(node);
    });
    return fragment;
  },

  /**
   * shows the section
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
   * so it can be shown again in the same spot.
   */

  hide: function () {
    this._detached = this.removeAll();
    this.visible = false;
    return this;
  },

  /**
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
   * DEPRECATED - use appendChild
   */

  append: function () {

    var newNodes = Array.prototype.slice.call(arguments);

    if (!newNodes.length) return;

    if(newNodes.length > 1) {
      newNodes = this._createFragment(newNodes);
    } else {
      newNodes = newNodes[0];
    }

    this.end.parentNode.insertBefore(newNodes, this.end);
  },

  /**
   */

  appendChild: function () {
    this.append.apply(this, arguments);
  },

  /**
   * DEPRECATED - use prependChild
   */

  prepend: function () {
    var newNodes = Array.prototype.slice.call(arguments);

    if (!newNodes.length) return;

    if(newNodes.length > 1) {
      newNodes = this._createFragment(newNodes);
    } else {
      newNodes = newNodes[0];
    }

    this.start.parentNode.insertBefore(newNodes, this.start.nextSibling);
  },


  /**
   */

  prependChild: function () {
    this.prepend.apply(this, arguments);
  },


  /**
   */

  replaceChildNodes: function () {

    //remove the children - children should have a parent though
    this.removeAll();
    this.append.apply(this, arguments);
  },

  /**
   */

  toString: function () {
    var buffer = this.getChildNodes().map(function (node) {
      return node.outerHTML || (node.nodeValue != undefined && node.nodeType == 3 ? node.nodeValue : String(node));
    });
    return buffer.join("");
  },

  /**
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
   */

  getInnerChildNodes: function () {
    var cn = this.getChildNodes();
    cn.shift();
    cn.pop()
    return cn;
  },


  /**
   */

  _section: function (children) {
    var section = new Section(this.document);
    section.append.apply(section, children);
    return section;
  }
});

module.exports = function (document, start, end)  {
  return new Section(document, start, end);
}

module.exports.Section = Section;
