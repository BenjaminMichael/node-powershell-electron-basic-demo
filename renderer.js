window.Hammer = require('./node_modules/materialize-css/js/hammer.min.js') 
require('materialize-css')
const shell = require('node-powershell')

var testData=[1,2,3,4,5,6,7,8,9]

function loading(){
    const myPreLoader = `
    <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue">
    <div class="circle-clipper left">
        <div class="circle"></div>
    </div><div class="gap-patch">
        <div class="circle"></div>
    </div><div class="circle-clipper right">
        <div class="circle"></div>
    </div>
    </div>`
    $('#myH3').html(myPreLoader)
}
function doneLoading(myResultant){
    $('#myH3').html('<h2>Done.</h2>')
    const allDone = () => {
        $('#myH3').empty()
    }
    if(myResultant !== ""){
        $('#resultsGoHere').append(`<div class="chip orange lighten-3 purple-text z-depth-3 text-darken-1 col s2 m2 l2">${myResultant}</div>`)
    }
    setTimeout(allDone(), 100)
}
function errorUIFeedback(){
    $('#myH3').html()
    $('#resultsGoHere').append(`<div class="chip red white-text col s2 m2 l2 flow-text">Error</div>`)
}

$(document).ready(function(){
    $('#cancelBtn').click( () => {
    $('#resultsGoHere').empty()
    })

    $('#test1Btn').click( () => {
        loading()
        let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
            });
    testData.map((value)=>{
        ps.streams.stdin.write(`$x=$PSVersionTable;write-host 'ZugZug: ${value}'
        `);
        })
        ps.invoke()
        ps.on('output', output=>{
            var parsedOutput = output.split("\n") 
            parsedOutput.forEach(val => doneLoading(val))
            ps.dispose()
        }); 
    })

    $('#test2Btn').click(()=>{
       loading()
        testData.map((value)=>{
        setImmediate(
            (()=>{
            let ps = new shell({
                executionPolicy: 'Bypass',
                noProfile: true
            });
            
            ps.addCommand(`$x=$PSVersionTable;write-host 'Work Complete: ${value}'`)
            ps.invoke()
            .then(output => {
                doneLoading(output)
            })
            .catch(err => {
                errorUIFeedback()
                console.log(err)
                ps.dispose()
            });
            })
        )
        })
    })

    $('#test3Btn').click(()=>{
        loading()
        testData.map((value)=>{
            process.nextTick(() => {
                let ps = new shell({
                executionPolicy: 'Bypass',
                noProfile: true
                });
                
                ps.addCommand(`$x=$PSVersionTable;write-host 'Lok-Tar! ${value}'`)
                ps.invoke()
                .then(output => {
                    ps.dispose();
                    doneLoading(output)
                })
                .catch(err => {
                    errorUIFeedback()
                    console.log(err)
                    ps.dispose()
                });
            });
        })
    })

    $('#test4Btn').click( () => {
        loading()
    testData.forEach((value, index)=>{
            let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
            });
            
            ps.addCommand(`$x=$PSVersionTable;write-host '${index+1}: Swobu. ${value}'`)
            ps.invoke()
            .then(output => {
            ps.dispose()
            doneLoading(output)
            })
            .catch(err => {
                errorUIFeedback()
                console.log(err)
                ps.dispose()
            });
        })
    })


    $('#test5Btn').click( () => {

        const max=testData.length;
        function rapidFirePromise(i){
            let ps = new shell({
                executionPolicy: 'Bypass',
                noProfile: true
                });
                
                ps.addCommand(`$x=$PSVersionTable;write-host '${i+1}: idunno. ${testData[i]}'`)
                ps.invoke()
                .then(output => {
                ps.dispose()
                doneLoading(output)
                if (i<max-1){i++;return rapidFirePromise(i)}
                })

                .catch(err => {
                    errorUIFeedback()
                    console.log(err)
                    ps.dispose()
                });
             }
        rapidFirePromise(0)
        })
    })
