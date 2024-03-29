var json = require('../../results/parsedDataMaster.json');

var max = 0 ;

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

	var startTime = row.time_start_experiment;

	for(i = 0; i < row.notifications.length; i++) {

		var time_diff = row.notifications[i].time_start - startTime;
		var correctness = "incorrect";

		var adder = 1;
		if(row.notifications[i].id < 3) {
			if(row.notifications[i].id == 1) {
				adder = 2;
			}
			row.notifications[i].correct_button += adder;
		}

		if(row.notifications[i].button_clicked == row.notifications[i].correct_button) {
			correctness = "correct";
		}

		newObj = {
			"participantID" : row.workerId,
			"notificationTime" : (time_diff / 1000),
			"correct" : correctness
		}

		filteredJson.push(newObj);
	}
});


console.log(JSON.stringify(filteredJson));