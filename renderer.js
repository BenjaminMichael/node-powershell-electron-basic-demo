window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.js') // I use this when the NPM 'node_modules' folder is in my project and NOT installed globally.
window.Hammer = require('./node_modules/materialize-css/js/hammer.min.js') // For the purpoises of this trick the sequence of these 3 requires is important
require('materialize-css')

const shell = require('node-powershell');
var test1=[1,2,3,4,5,6,7,8,9]
    test2=[1,2,3,4,5,6,7,8,9]
    test3=[1,2,3,4,5,6,7,8,9]

$('#test1Btn').click(()=>{
  test1.map((value)=>{
    let ps = new shell({
      executionPolicy: 'Bypass',
      noProfile: true
    });
    
    ps.addCommand(`$x=$PSVersionTable;write-host 'zug-zug-${value}'`)
    ps.invoke()
    .then(output => {
      $('#resultsGoHere').append(output)
    })
    .catch(err => {
      console.log(err);
      ps.dispose();
    });
  })
})

$('#test2Btn').click(()=>{
    test2.map((value)=>{
    setImmediate(
        (()=>{
        let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });
        
        ps.addCommand(`$x=$PSVersionTable;write-host 'Work Complete: ${value}'`)
        ps.invoke()
        .then(output => {
            $('#resultsGoHere').append(output)
        })
        .catch(err => {
            console.log(err);
            ps.dispose();
        });
        })
    )
    })
})

$('#test3Btn').click(()=>{
    test3.map((value)=>{
        process.nextTick(() => {
            let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
            });
            
            ps.addCommand(`$x=$PSVersionTable;write-host 'Lok-Tar! ${value}'`)
            ps.invoke()
            .then(output => {
                $('#resultsGoHere').append(output)
            })
            .catch(err => {
            console.log(err);
            ps.dispose();
            });
        });
    })
})
