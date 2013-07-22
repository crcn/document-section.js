class Section

  ###
  ###

  constructor: (nodeFactory = document) ->

    # need to have a temporary placeholder so we can
    # create a linked list
    parent = nodeFactory.createElement "div"

    # comments are invisible
    parent.appendChild @start = @end = nodeFactory.creatComment "section"

  ###
  ###

  replace: (node) ->
    # TODO

  ###
  ###

  insertFirst: (node) ->
    # TODO

  ###
  ###

  insertLast: (node) ->
    # TODO

  ###
  ###

  show: () ->
    return unless @_detached
    @append @_detached...
    @_detached = undefined

  ###
  ###

  hide: () ->
    @_detached = @getChildNodes()
    @removeChildNodes()

  ###
  ###

  append: () ->

    return unless arguments.length

    pc = @start

    for child in arguments
      @_insertAfter child, pc
      pc = child

    @end = arguments[arguments.length - 1]

  ###
  ###

  prepend: () ->
    return unless arguments.length

    pc = @start
    p  = @start.parentNode

    for child in arguments
      p.insertBefore child, pc
      pc = child

  ###
  ###

  replaceChildNodes: () ->
    @removeChildNodes()
    @append arguments



  ###
  ###

  removeChildNodes: () ->
    cn = @start
    p  = @start.parentNode

    while cn isnt @end
      cn = cn.nextSibling
      p.removeChild cn
      cn = @start

    @end = @start

  ###
  ###

  getChildNodes: () ->
    cn = @start

    children = []

    while cn isnt @end
      cn = cn.nextSibling
      children.push cn

    children

  ###
  ###

  _insertAfter: (newNode, refNode) ->
    p = refNode.parentNode

    if refNode.nextSibling
      p.insertBefore refNode.nextSibling, newNode
    else
      p.appendChild newNode



module.exports = Section