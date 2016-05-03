var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [ // EDIT THESE
      'postId',
      'comments',
      'workerId',
      'time_start_experiment',
      'scenario',
      'Click_1_button',
      'Click_2_button',
      'Click_3_button',
      'Click_4_button',
      'Click_5_button',
      'Click_6_button',
      'Click_7_button',
      'Click_8_button',
      'Click_9_button',
      'Click_10_button',
      'time_start_alert1',
      'time_start_alert2',
      'time_start_alert3',
      'time_start_alert4',
      'Alert_1_severity',
      'Alert_2_severity',
      'Alert_3_severity',
      'Alert_4_severity',
      'Alert_1_confidence',
      'Alert_2_confidence',
      'Alert_3_confidence',
      'Alert_4_confidence',
      'Alert_1_response',
      'Alert_2_response',
      'Alert_3_response',
      'Alert_4_response',
      'time_diff_alert1',
      'time_diff_alert2',
      'time_diff_alert3',
      'time_diff_alert4',
      'responseTry_1_answer',
      'responseTry_2_answer',
      'responseTry_3_answer',
      'responseTry_4_answer',
      'responseTry_5_answer',
      'responseTry_6_answer',
      'responseTry_7_answer',
      'responseTry_8_answer',
      'responseTry_9_answer',
      'responseTry_10_answer',
      'answer_1',
      'answer_2',
      'answer_3',
      'answer_4',
      'answer_5',
      'answer_6',
      'answer_7',
      'answer_8',
      'answer_9',
      'answer_10',
      'score',
      'experiment_case',



    ]
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)

  data = JSON.parse(data)

  // filters any undefined data (it makes R scripting easier)
  data = filterUndefined(data)

  // use 'debug' for your workerId when testing experiments, 
  //   comment out if you want to analyze data from yourself
  data = filterDebug(data) 

  convert( data )
})

function convert(d) {
  var params = {
    data: d,
    fields: fields
  }
  j2c(params, function(err, csv) {
    if (err) console.log(err)
    console.log(csv)
  })
}

function filterUndefined (arr) {
  return _.filter(arr, function(row) {
    return _.every(fields, function(f) { return row[f] })
  })
}

function filterDebug (arr) {
  return _.filter(arr, function(row) {
    return row.workerId !== 'debug'
  })
}
