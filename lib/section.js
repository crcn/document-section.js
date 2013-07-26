// Generated by CoffeeScript 1.6.2
var Section,
  __slice = [].slice;

Section = (function() {
  /*
  */
  Section.prototype.__isLoafSection = true;

  /*
  */


  function Section(nodeFactory) {
    this.nodeFactory = nodeFactory != null ? nodeFactory : document;
    this.start = nodeFactory.createTextNode("");
    this.end = nodeFactory.createTextNode("");
    this._addParent();
  }

  /*
  */


  Section.prototype.replace = function(node) {
    node.parentNode.insertBefore(this.toFragment(), node);
    return node.parentNode.removeChild(node);
  };

  /*
  */


  Section.prototype.show = function() {
    var allElements, childLoad, node, _i, _len, _ref;

    if (!this._detached) {
      return;
    }
    this._addParent();
    allElements = [];
    _ref = this._detached;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      if (node.parentNode && (childLoad = node.parentNode._loaf)) {
        node.parentNode._loaf = void 0;
        allElements.push(childLoad.toFragment());
      } else {
        allElements.push(node);
      }
    }
    this.append.apply(this, allElements);
    return this._detached = void 0;
  };

  /*
  */


  Section.prototype.hide = function() {
    var child, _i, _len, _ref, _results;

    this._detached = this.getChildNodes();
    this._detached.shift();
    this._detached.pop();
    _ref = this._detached;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.start.parentNode.removeChild(child));
    }
    return _results;
  };

  /*
  */


  Section.prototype.append = function() {
    var children;

    children = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return this._insertAfter(children, this.end.previousSibling);
  };

  /*
  */


  Section.prototype.prepend = function() {
    var children;

    children = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return this._insertAfter(children, this.start);
  };

  /*
  */


  Section.prototype.replaceChildNodes = function() {
    this.removeChildNodes();
    return this.append(arguments);
  };

  /*
  */


  Section.prototype.toString = function() {
    var buffer;

    buffer = this.getChildNodes().map(function(node) {
      return node.innerHTML || String(node);
    });
    return buffer.join("");
  };

  /*
  */


  Section.prototype.toFragment = function() {
    var _ref;

    return (_ref = this.nodeFactory).createFragment.apply(_ref, this.getChildNodes());
  };

  /*
  */


  Section.prototype.dispose = function() {
    var child, _i, _len, _ref, _results;

    _ref = this.getChildNodes();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.parentNode.removeChild(child));
    }
    return _results;
  };

  /*
  */


  Section.prototype.getChildNodes = function() {
    var children, cn, end;

    this._addParent();
    cn = this.start;
    end = this.end.nextSibling;
    children = [];
    while (cn !== end) {
      children.push(cn);
      cn = cn.nextSibling;
    }
    return children;
  };

  /*
  */


  Section.prototype._insertAfter = function(newNodes, refNode) {
    var child, p, _i, _len, _results;

    this._addParent();
    p = refNode.parentNode;
    _results = [];
    for (_i = 0, _len = newNodes.length; _i < _len; _i++) {
      child = newNodes[_i];
      if (child.__isLoafSection) {
        child._parent = this;
        child = child.toFragment();
      }
      p.insertBefore(child, refNode.nextSibling);
      _results.push(refNode = child);
    }
    return _results;
  };

  /*
  */


  Section.prototype._addParent = function() {
    var parent;

    if (!this.start.parentNode) {
      parent = this.nodeFactory.createElement("div");
      parent._loaf = this;
      parent.appendChild(this.start);
      return parent.appendChild(this.end);
    }
  };

  return Section;

})();

module.exports = Section;