

// ----- Regex -----


// ----- Regex ----- // ----- Date

let reg__date = /(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d)/


// ----- Regex ----- // ----- Time

let reg__time = /T(?<hour>\d\d)(:(?<minute>\d\d))?(:(?<second>\d\d))?(\.(?<millisecond>\d*))?/


// ----- Processing -----

let decodeDatetime = ( strTimestamp ) => {

  let objDate
  try {
    objDate = strTimestamp.match( reg__date ).groups
  }
  catch {
    objDate = {}
  }
  let objTime
  try {
    objTime = strTimestamp.match( reg__time ).groups
  }
  catch {
    objTime = {}
  }

  let objOutput = Object.assign(
    objDate != null ? objDate : {},
    objTime != null ? objTime : {}
  )

  //https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object
  Object.keys(objOutput).forEach(key => objOutput[key] === undefined && delete objOutput[key])

  return objOutput
}




// ----- Encode -----

let objPrepend = {
  values: {
    year: '',
    month: '-',
    day: '-',
    hour: 'T',
    minute: ':',
    second: ':'
  },
  valuesMap: [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second'
  ]
  
}

let encodeDatetime = ( objDatetime ) => {


  let objParsed__keys = Object.keys( objDatetime )

  let outputEncoded = ''

  objParsed__keys.forEach( ( datetimeKey ) => {
    outputEncoded += (
      objPrepend.valuesMap.includes( datetimeKey )
      ?
      objPrepend.values[datetimeKey] + objDatetime[ datetimeKey ]
      :
      ''
    )
  })

  return outputEncoded

}

// ----- strptime -----

let objStrptime = {
  'd': /(?<day>\d\d)/.source,
  'm': /(?<month>\d\d)/.source,
  'Y': /(?<year>\d\d\d\d)/.source
}

let strptime = ( strDatetime, strStrptime ) => {

  //let regex__strptime = /(?<=%)\w/g
  let regex__strptime = /((?<=%)\w*)(.(?!%)*)*/g

  let regexString__strStrptime2 = ''

  const regex1 = /((?<=%)\w*)(.(?!(?:%|$))*)/g
  //const regex1 = /((?<=%)\w*)/g
  const str1 = '%d/%m/%Y';

  let array1;

  let string = ''

  while ((array1 = regex1.exec( strStrptime )) !== null) {

    string += ( objStrptime[ array1[1] ] ) ? objStrptime[ array1[1] ] : array1[1]
    string += ( objStrptime[ array1[2] ] ) ? objStrptime[ array1[2] ] : array1[2]

  }






  // match
  /*
  let arrStrptime = strStrptime.match( regex__strptime )

  console.log( arrStrptime )

  let regexString__strStrptime = ''

  arrStrptime.forEach( ( strp ) => {
    regexString__strStrptime += objStrptime[ strp ]
  })

  console.log( regexString__strStrptime )

  let regex__strStrptime = new RegExp( regexString__strStrptime )

  */

  let regex__strStrptime = new RegExp( string )

  // -----

  let result = strDatetime.match( regex__strStrptime )

  return result

}

export { decodeDatetime, encodeDatetime, strptime }