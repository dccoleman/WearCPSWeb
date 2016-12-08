var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

var i, notificationType, responseAnswer;

	for(i = 0; i < row.notifications.length; i++) {

		var adder = 1;
		if(row.notifications[i].id < 3) {
			if(row.notifications[i].id == 1) {
				adder = 2;
			}
			row.notifications[i].correct_button += adder;
		}
		//correct
		if(row.notifications[i].button_clicked == row.notifications[i].correct_button) {
			//responseAnswer = "correct";
			responseAnswer = 1;
		}
		//incorrect
		else {
			//responseAnswer = "incorrect";
			responseAnswer = 0;
		}

		//security
		if(row.notifications[i].id < 3) {
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