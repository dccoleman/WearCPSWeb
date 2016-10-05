var json = require('../../results/parsedDataMaster.json');

var max = 0 ;

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){


	newObj = {
		"sex" : row.demographics.sex,
		"finalScore" : row.task_scores[row.task_scores.length - 1].score
	}

	filteredJson.push(newObj);
});


console.log(JSON.stringify(filteredJson));