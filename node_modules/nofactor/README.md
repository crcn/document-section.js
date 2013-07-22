```javascript
var nofactor = require("nofactor"),
nostr = nofactor.string;


var element = nostr.createElement("div"),
element.setAttribute("id", "test");


console.log(element.toString()); //<div id="test"></div>
```
