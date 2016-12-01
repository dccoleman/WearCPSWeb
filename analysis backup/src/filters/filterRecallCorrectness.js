var json = require('../../results/parsedDataMaster.json');

var secCorrect = 0,
	secCount = 0,

	safCorrect = 0,
	safCount = 0;

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

var i, 
	secCount = 0, 
	safCount = 0;

	secCorrect = 0;
	safCorrect = 0;

	for(i = 0; i < row.recall.length; i++) {

		if(row.recall[i].answer == row.recall[i].correct_answer) {
			if(row.recall[i].id < 3) {
				secCorrect++;
				secCount++;
			} else {
				safCorrect++;
				safCount++;
			}
		} else {
			if(row.recall[i].id < 3) {
				secCount++;
			} else {
				safCount++;
			}
		}

	}

	newObj = {
		"avgPercent" : (secCorrect + safCorrect)/(secCount + safCount),
		"secPercent" : (secCorrect)/(secCount),
		"safPercent" : (safCorrect)/(safCount)
	}

	filteredJson.push(newObj);
});


console.log(JSON.stringify(filteredJson));