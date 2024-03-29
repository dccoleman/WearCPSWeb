var j2c    = require('json2csv')
  , jsonexport = require('jsonexport')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , filter = [ "*"]
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)

  data = JSON.parse(data)

  // filters any undefined data (it makes R scripting easier)
  //data = filterUndefined(data)

  // use 'debug' for your workerId when testing experiments, 
  //   comment out if you want to analyze data from yourself
  //data = filterDebug(data) 

  convert( data )
})

function convert(d) {
  var params = {
    data: d,
    fields: filter
  }
  // j2c(params, function(err, csv) {
  //   if (err) console.log(err)
  //   console.log(csv)
  // })
  jsonexport(d,function(err, csv){
      if(err) return console.log(err);
      console.log(csv);
  });

}

function filterUndefined (arr) {
  return _.filter(arr, function(row) {
    return _.every(filter, function(f) { return row[f] })
  })
}

function filterDebug (arr) {
  return _.filter(arr, function(row) {
    return row.workerId !== 'debug'
  })
}
