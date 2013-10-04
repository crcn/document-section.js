nofactor = require "nofactor"

class Section

  ###
  ###

  __isLoafSection: true

  ###
  ###

  constructor: (@nodeFactory = nofactor.default) ->

    # need to have a temporary placeholder so we can
    # create a linked list

    # create a few invisible markers
    @start = @nodeFactory.createTextNode ""

    # note - END is necessary because there might be a few embedded loafs, where the
    # new END node to this loaf might belong to another end node.
    @end   = @nodeFactory.createTextNode ""


    parent = @nodeFactory.createElement "div"
    parent.appendChild @start
    parent.appendChild @end

  ###
  ###

  replace: (node) ->
    node.parentNode.insertBefore @toFragment(), node
    node.parentNode.removeChild node

  ###
  ###

  show: () ->
    return @ unless @_detached
    @append @_detached.getInnerChildNodes()...
    @_detached = undefined
    @

  ###
  ###

  hide: () ->
    @_detached = @removeAll()
    @

  ###
  ###

  removeAll: () -> @_loaf @_removeAll()

  ###
  ###

  _removeAll: () ->

    start = @start
    current = start.nextSibling

    children = []

    while current isnt @end
      current.parentNode.removeChild current
      children.push current
      current = @start.nextSibling

    children

  ###
  ###

  append: (children...) ->
    @_insertAfter children, @end.previousSibling

  ###
  ###

  prepend: (children...) ->
    @_insertAfter children, @start

  ###
  ###

  replaceChildNodes: () ->
    @removeAll()
    @append arguments...

  ###
  ###

  toString: () -> 
    buffer = @getChildNodes().map (node) ->
      node.innerHTML or (node.nodeValue ? String(node))
    buffer.join("")

  ###
  ###

  toFragment: () ->
    @nodeFactory.createFragment @getChildNodes()

  ###
  ###

  dispose: () ->
    return if @_disposed
    @_disposed = true
    @_removeAll()
    @start.parentNode.removeChild @start
    @end.parentNode.removeChild @end

  ###
  ###

  getChildNodes: () ->

    cn = @start
    end = @end.nextSibling

    children = []

    while cn isnt end
      children.push cn
      cn = cn.nextSibling

    children

  ###
  ###

  getInnerChildNodes: () ->
    cn = @getChildNodes()
    cn.shift()
    cn.pop()
    cn

  ###
  ###

  _insertAfter: (newNodes, refNode) ->

    return unless newNodes.length

    newNodes = newNodes.map (node) ->
      if node.__isLoafSection then node.toFragment() else node

    if newNodes.length > 1
      newNodes = @nodeFactory.createFragment newNodes
    else
      newNodes = newNodes[0]

    refNode.parentNode.insertBefore newNodes, refNode.nextSibling

  ###
  ###

  _loaf: (children) -> 
    l = new loaf()
    l.append children...
    l



module.exports = loaf = (nodeFactory) -> new Section nodeFactory