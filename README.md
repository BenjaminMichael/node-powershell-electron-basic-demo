# benchmarking node-powershell command loops with electron-quick-start

If you install your npm modules globally you will probably want to fix 2 things:

1 in index.html
```html
<link href="./node_modules/materialize-css/dist/css/materialize.css" rel="stylesheet">
```

and 1 in renderer.js
``` javascript
window.Hammer = require('./node_modules/materialize-css/js/hammer.min.js')
```
