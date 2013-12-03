var protoclass = require("protoclass"),
nofactor       = require("nofactor");

var Section = function (nodeFactory) {

  this.nodeFactory = nodeFactory = nodeFactory || nofactor["default"];

  // create invisible markers so we know where the sections are
  this.start       = nodeFactory.createTextNode("");
  this.end         = nodeFactory.createTextNode("");
  this.visible     = true;

  var parent  = nodeFactory.createElement("div");
  parent.appendChild(this.start);
  parent.appendChild(this.end);
};


Section = protoclass(Section, {

  /**
   */

  __isLoafSection: true,

  /**
   */

  replace: function (node) {
    node.parentNode.insertBefore(this.toFragment(), node);
    node.parentNode.removeChild(node);
  },

  /**
   */


  show: function () {
    if(!this._detached) return this;
    this.append.apply(this, this._detached.getInnerChildNodes());
    this._detached = void 0;
    this.visibile = true;
    return this;
  },

  /**
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
   */

  append: function () {
    this._insertAfter(Array.prototype.slice.call(arguments, 0), this.end.previousSibling);
  },

  /**
   */

  prepend: function () {
    this._insertAfter(Array.prototype.slice.call(arguments, 0), this.start);
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
      return node.innerHTML || (node.nodeValue || String(node));
    });
    return buffer.join("");
  },

  /**
   */

  toFragment: function () {
    return this.nodeFactory.createFragment(this.getChildNodes());
  },

  /**
   */

  dispose: function () {
    if(this._disposed) return;
    this._disposed = true;
    this._removeAll();
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

  _insertAfter: function(newNodes, refNode) {
    if(!newNodes.length) return;

    newNodes = newNodes.map(function(node) {
      if(node.__isLoafSection) {
        return node.toFragment()
      } else {
        return node;
      }
    });

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

module.exports = function (nodeFactory)  {
  return new Section(nodeFactory);
}