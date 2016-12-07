var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

	var i = 0;
	var initial = row.time_start_experiment;
	for(i = 0; i < row.task_scores.length; i++) {

		var time_diff = row.task_scores[i].time - initial;

		newObj = {
			"ParticipantID" : row.workerId,
			"PrimaryTaskEntryTime" : (time_diff / 1000),
			"Score" : row.task_scores[i].score
		}

		filteredJson.push(newObj);
	}

});

console.log(JSON.stringify(filteredJson));