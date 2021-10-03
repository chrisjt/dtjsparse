import * as tspar from './tspar.js';



// ----- Input -----
let dateFull = "2021-09-18T20:43:32Z"

let dateShort = "2021-09-18T20:43:32"

/*
let objParsed = tspar.decodeDatetime( dateShort )
console.log( objParsed )

console.log( tspar.encodeDatetime( objParsed ) )


let list = [
    "2021-09-18T20:43",
    "2021-03-18T12:43:32",
    "2131-09-18T20",
    "2021-09-18",
    "2020-10-30T03:02:45.302",   
]

list.forEach( (x) => {

    console.log(x)

    let result = tspar.decodeDatetime( x )

    console.log( result )


})

*/

let list = [
    "05/09/2012",
    "30/07/2021"   
]

list.forEach( (x) => {

    let result = tspar.strptime( x, '%d/%m/%Y' )

    console.log( result )


})