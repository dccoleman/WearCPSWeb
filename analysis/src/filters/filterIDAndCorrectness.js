var json = require('../../results/parsedDataMaster.json');

var avg = 0,
	secAvg = 0,
	safAvg = 0 ;

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

var i, 
	secCount = 0, 
	safCount = 0;

	for(i = 0; i < row.notifications.length; i++) {

		var adder = 1;
		if(row.notifications[i].id < 3) {
			if(row.notifications[i].id == 1) {
				adder = 2;
			}
			row.notifications[i].correct_button += adder;
		}
	}

	var safetyCorrect = 0;
	var securityCorrect = 0;

	for(i = 0; i < row.notifications.length; i++) {
		if(row.notifications[i].id < 3) {
			if(row.notifications[i].button_clicked == row.notifications[i].correct_button) {
				securityCorrect++;
			}
		} else {
			if(row.notifications[i].button_clicked == row.notifications[i].correct_button) {
				safetyCorrect++;
			}
		}
	}

	var secAvg = (securityCorrect/3);
	var safAvg = (safetyCorrect/3);

	newObj = {
		"participantID" : row.participantID,
		"secAvgCorrect" : secAvg,
		"safAvgCorrect" : safAvg
	}

	filteredJson.push(newObj);


	
});


console.log(JSON.stringify(filteredJson));