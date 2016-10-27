var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

var i, notificationType, responseAnswer;

	for(i = 0; i < row.notifications.length; i++) {

		//correct
		if(row.notifications[i].button_clicked == row.notifications[i].correct_button) {
			responseAnswer = "correct";
		}
		//incorrect
		else {
			responseAnswer = "incorrect";
		}

		//security
		if(row.notifications[i].id < 15) {
			notificationType = "Security";
		} 
		//safety
		else {
			notificationType = "Safety";
		}

		newObj = {
		"Type" : notificationType,
		"ResponseAnswer" : responseAnswer
		}

		filteredJson.push(newObj);
	}

});


console.log(JSON.stringify(filteredJson));