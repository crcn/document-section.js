var loaf = require(".."),
nofactor = require("nofactor"),
expect = require("expect.js");

describe("loaf", function() {



  it("can create a loaf", function() {
    var divLoaf = loaf(nofactor);
    expect(divLoaf.toString()).to.be("");
  });

  it("can create a section of elements", function() {
    var divs = loaf(nofactor);
    divs.append(nofactor.createElement("div"));
    divs.append(nofactor.createTextNode("hello"));
    expect(divs.toString()).to.be("<div></div>hello");
  });

  it("can prepend a few elements", function() {
    var divs = loaf(nofactor);
    divs.prepend(nofactor.createElement("div"));
    divs.prepend(nofactor.createTextNode("hello"));
    expect(divs.toString()).to.be("hello<div></div>");
  })


  it("can appendChild a few elements", function() {
    var divs = loaf(nofactor);
    divs.appendChild(nofactor.createElement("div"));
    divs.appendChild(nofactor.createTextNode("hello"));
    expect(divs.toString()).to.be("<div></div>hello");
  })

  it("can prependChild a few elements", function() {
    var divs = loaf(nofactor);
    divs.prependChild(nofactor.createElement("div"));
    divs.prependChild(nofactor.createTextNode("hello"));
    expect(divs.toString()).to.be("hello<div></div>");
  })

  describe("can create a section within a section", function() {


    var divs = loaf(nofactor),
    ps       = loaf(nofactor);

    divs.append(ps.render());

    ps.append(nofactor.createElement("p"));
    expect(String(divs)).to.be("<p></p>");
    divs.append(nofactor.createElement("div"));
    expect(String(divs)).to.be("<p></p><div></div>");
    ps.append(nofactor.createElement("p"));
    expect(String(divs)).to.be("<p></p><p></p><div></div>");

    it("& hide", function() {
      ps.hide();
      expect(String(divs)).to.be("<div></div>");
      divs.hide();
      expect(String(divs)).to.be("");
    });

    it("& show", function() {
      ps.show();
      expect(String(divs)).to.be("");
      divs.show();
      expect(String(divs)).to.be("<p></p><p></p><div></div>");

    });

    it("& be disposed", function() {
      ps.dispose();
      expect(String(divs)).to.be("<div></div>");
    });
  });


  it("can insert no items", function() {
    var l = loaf();
    l.append();
  });


  it("can append an item if it's been detached", function() {
    var l1 = loaf(),
    l2 = loaf();
    l1.append(l2.render());
    l1.hide();
    l2.append(nofactor.createTextNode("HA"));
  });


  it("doesn't leave a replaced loaf without a parent", function() {
    var l1 = loaf(),
    l2 = loaf(),
    l3 = loaf();
    l1.append(l2.render());
    l1.replaceChildNodes(l3.render());
    expect(l2.start.parentNode).not.to.be(undefined);
  });


  it("doesn't leave a replaced loaf without a parent 2", function() {
    var l1 = loaf(),
    l2 = loaf();
    l1.append(l2.render());
    l2.hide();
    l1.removeAll();
    expect(l2.start.parentNode).not.to.be(undefined);
  });

  it("doesn't bust sub sections if a parent is disposed", function () {
    var l1 = loaf(),
    l2 = loaf();
    l1.append(l2.render());
    l1.dispose();
    expect(l1.start.parentNode).to.be(undefined);
    expect(l2.start.parentNode).not.to.be(undefined);
  });

  it("can shuffle nodes around and still maintain the section children", function () {
    var l = loaf();
    for(var i = 10; i--;) l.append(nofactor.createElement("div"));

    var children = l.getInnerChildNodes();
    for (var i = children.length; i--;) {
      l.append(children[i]);
    }

    expect(l.getChildNodes().length).to.be(12);
  });

  it("can clone a loaf", function () {
    var l = loaf();
    for(var i = 10; i--;) l.append(nofactor.createTextNode(String(i)));

    expect(l.clone().render().toString()).to.be("9876543210");
  });


});