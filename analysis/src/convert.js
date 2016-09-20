var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [ "postId",
              "time_start_experiment",
              "workerId",
              "timestamp",
              "responseTry_1_answer",
              "answer_1",
              "score",
              "responseTry_2_answer",
              "answer_2","time_start_alert1",
              "notification1",
              "time_end_alert1",
              "time_diff_alert1",
              "Click_1_button",
              "Alert_1_response",
              "responseTry_3_answer",
              "answer_3",
              "responseTry_4_answer",
              "answer_4",
              "time_start_alert2",
              "notification2",
              "time_end_alert2",
              "time_diff_alert2",
              "Click_2_button",
              "Alert_2_response",
              "responseTry_5_answer",
              "answer_5",
              "time_start_alert3",
              "notification3",
              "time_end_alert3",
              "time_diff_alert3",
              "Click_3_button",
              "Alert_3_response",
              "responseTry_6_answer",
              "answer_6",
              "responseTry_7_answer",
              "answer_7",
              "time_start_alert4",
              "notification4",
              "time_end_alert4",
              "time_diff_alert4",
              "Click_4_button",
              "Alert_4_response",
              "responseTry_8_answer",
              "answer_8",
              "responseTry_9_answer",
              "answer_9",
              "time_start_alert5",
              "notification5",
              "time_end_alert5",
              "time_diff_alert5",
              "Click_5_button",
              "Alert_5_response",
              "responseTry_10_answer",
              "answer_10",
              "responseTry_11_answer",
              "answer_11",
              "time_start_alert6",
              "notification6",
              "time_start_demo",
              "time_end_demo",
              "time_diff_demo",
              "securityChecked",
              "notificationsKinds",
              "safetyChecked",
              "notificationsQuantity",
              "dominantNotification",
              "securityNotificationsQuantity",
              "safetyNotificationsQuantity",
              "Disk Space Warning",
              "Spyware Warning",
              "Updates",
              "Home Security System Warning",
              "Home Security System Triggered",
              "Fire Alarm Triggered",
              "age",
              "sex",
              "country",
              "time_end_experiment",
              "time_diff_experiment",
              "comments"]
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
