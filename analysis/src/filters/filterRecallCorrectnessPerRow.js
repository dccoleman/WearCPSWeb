var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

var i, typeRecall, answer;

	for(i = 0; i < row.recall.length; i++) {

		//correct
		if(row.recall[i].answer == row.recall[i].correct_answer) {
			answer = 1;
		} 
		//incorrect
		else {
			answer = 0;
		}

		//security
		if(row.recall[i].id < 3) {
			typeRecall = "Security";
		} 
		//safety
		else {
			typeRecall = "Safety";
		}

		newObj = {
			"Type" : typeRecall,
			"Answer" : answer
		}

	filteredJson.push(newObj);
	
	}
});


console.log(JSON.stringify(filteredJson));