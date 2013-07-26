var loaf = require(".."),
nofactor = require("nofactor"),
expect = require("expect.js");

describe("loaf", function() {

  it("can create a loaf", function() {
    var divLoaf = loaf(nofactor.string);
    expect(divLoaf.toString()).to.be("");
  });

  it("can create a section of elements", function() {
    var divs = loaf(nofactor.string);
    divs.append(nofactor.string.createElement("div"));
    divs.append(nofactor.string.createTextNode("hello"));
    expect(divs.toString()).to.be("<div></div>hello");
  });

  it("can prepend a few elements", function() {
    var divs = loaf(nofactor.string);
    divs.prepend(nofactor.string.createElement("div"));
    divs.prepend(nofactor.string.createTextNode("hello"));
    expect(divs.toString()).to.be("hello<div></div>");
  })

  describe("can create a section within a section", function() {

    var divs = loaf(nofactor.string),
    ps       = loaf(nofactor.string);

    divs.append(ps);

    ps.append(nofactor.string.createElement("p"));
    expect(String(divs)).to.be("<p></p>");
    divs.append(nofactor.string.createElement("div"));
    expect(String(divs)).to.be("<p></p><div></div>");
    ps.append(nofactor.string.createElement("p"));
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
    })
  });

});