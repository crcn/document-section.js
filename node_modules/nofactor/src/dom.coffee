
class DomFactory extends require("./base")
  
  ###
  ###

  constructor: () ->

  ###
  ###

  createElement: (name) -> document.createElement name

  ###
  ###

  createTextNode: (text) -> document.createTextNode text

  ###
  ###

  createFragment: () -> 
    frag = document.createDocumentFragment() 
    for child in arguments
      frag.appendChild child
    frag

  ###
  ###

  parseHtml: (text) -> 
    div = @createElement "div"
    div.innerHTML = text
    @createFragment div.childNodes...





module.exports = new DomFactory()