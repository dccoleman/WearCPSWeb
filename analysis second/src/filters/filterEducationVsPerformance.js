var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

	var notifications_correct = 0;

	for(var i = 0; i < row.notifications.length; i++) {
		if(row.notifications[i].button_clicked == row.notifications[i].correct_button) {
			notifications_correct++;
		}
	}

	newObj = {
		"Education Level": row.demographics.degree,
		"NotificationCorrect" : notifications_correct,
		"FinalScore" : row.task_scores[row.task_scores.length - 1].score
	}

	filteredJson.push(newObj);
});


console.log(JSON.stringify(filteredJson));