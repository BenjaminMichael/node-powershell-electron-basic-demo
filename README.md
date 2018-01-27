# node-powershell with electron-quick-start developer sandbox

A typical node-powershell command or script execution is asyncronous.  It returns console output whenever its done or it triggers the ps.on() event.  A common question that arises is: how do I execute many scripts/command in succession?

Take a look at renderer.js to see how I'm looping/mapping an array in order to programmatically execute powershell commands/scripts.  Don't let the super easy UI framework totally staying out of your way so you can focus on the impoprtant code throw you off.  That's just Materialize (feat. jQuery).

This is intended to be run in dev mode so just clone the repo, npm install -S, npm start.  You will need PowerShell installed for this to actually work.  Use my fork of node-powershell for Alpha PowerShell Core compatability.

If you install your npm modules globally you will probably want to fix 2 things:

1 in index.html
```html
<link href="./node_modules/materialize-css/dist/css/materialize.css" rel="stylesheet">
```

and 1 in renderer.js
``` javascript
window.Hammer = require('./node_modules/materialize-css/js/hammer.min.js')
```

hint: #test5Btn the "Sequence" button is the technique that doesn't suck.

Note that this demo doesn't showcase the other technique I strongly recommend: disabling buttons when clicked so they cant be spam clicked to spawn dozens of powershell consoles.  Here you get to see all the fun errors is causes.  Enjoy!