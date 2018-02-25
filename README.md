# node-powershell with electron-quick-start developer sandbox


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
