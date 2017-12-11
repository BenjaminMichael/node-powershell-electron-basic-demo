window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.js') // I use this when the NPM 'node_modules' folder is in my project and NOT installed globally.
window.Hammer = require('./node_modules/materialize-css/js/hammer.min.js') // For the purpoises of this trick the sequence of these 3 requires is important
require('materialize-css')

const shell = require('node-powershell');




var test1=[1,2,3,4,5,6,7,8,9]
    test2=[1,2,3,4,5,6,7,8,9]
    test3=[1,2,3,4,5,6,7,8,9]
    test4=[1,2,3,4,5,6,7,8,9]
    test5=[1,2,3,4,5,6,7,8,9]


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
        </div>
    `
        $('#myH3').html(myPreLoader)
    }
    function doneLoading(myResultant){
        $('#myH3').html('<h2>Done.</h2>')
        if(myResultant !== ""){
            $('#resultsGoHere').append(`<div class="chip orange lighten-3 purple-text z-depth-3 text-darken-1 col s2 m2 l2">${myResultant}</div>`)
        }
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
    test1.map((value)=>{
        ps.streams.stdin.write(`$x=$PSVersionTable;write-host 'ZugZug: ${value}'
        `);
        })
        ps.invoke()
        ps.on('output', output=>{
            var parsedOutput = output.split("\n") 
            parsedOutput.forEach(val => doneLoading(val))
        }); 
    })

    $('#test2Btn').click(()=>{
       loading()
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
                doneLoading(output)
            })
            .catch(err => {
                errorUIFeedback();
                console.log(err);
                ps.dispose();
            });
            })
        )
        })
    })

    $('#test3Btn').click(()=>{
        loading()
        test3.map((value)=>{
            process.nextTick(() => {
                let ps = new shell({
                executionPolicy: 'Bypass',
                noProfile: true
                });
                
                ps.addCommand(`$x=$PSVersionTable;write-host 'Lok-Tar! ${value}'`)
                ps.invoke()
                .then(output => {
                    doneLoading(output)
                })
                .catch(err => {
                    errorUIFeedback();
                    console.log(err);
                    ps.dispose();
                });
            });
        })
    })

    $('#test4Btn').click( () => {
        loading()
    test5.forEach((value, index)=>{
            let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
            });
            
            ps.addCommand(`$x=$PSVersionTable;write-host '${index+1}: Swobu. ${value}'`)
            ps.invoke()
            .then(output => {
            doneLoading(output)
            })
            .catch(err => {
                errorUIFeedback();
                console.log(err);
                ps.dispose();
            });
        })
    })


    $('#test5Btn').click( () => {
        loading()
        const max=test4.length;
        function rapidFirePromise(i){
            let ps = new shell({
                executionPolicy: 'Bypass',
                noProfile: true
                });
                
                ps.addCommand(`$x=$PSVersionTable;write-host '${i+1}: idunno. ${test4[i]}'`)
                ps.invoke()
                .then(output => {
                doneLoading(output)
                if (i<max-1){i++;return rapidFirePromise(i)}
                })
                .catch(err => {
                    errorUIFeedback();
                    console.log(err);
                    ps.dispose();
                });
             }
        rapidFirePromise(0);
        })
    })
