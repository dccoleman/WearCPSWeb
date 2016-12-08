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

		if(row.notifications[i].button_clicked == row.notifications[i].correct_button) {
			avg ++;

			if(row.notifications[i].id < 3) {
				secAvg++;
			} else {
				safAvg++;
			}
		}

		if(row.notifications[i].id < 3) {
			secCount++;
		} else {
			safCount++;
		}

	}

	avg = avg/(row.notifications.length);
	secAvg = secAvg/secCount;
	safAvg = safAvg/safCount;

	newObj = {
		"avgCorrect" : avg,
		"secAvgCorrect" : secAvg,
		"safAvgCorrect" : safAvg
	}

	secCount = 0;
	safCount = 0;

	avg = 0;
	secAvg = 0;
	safAvg = 0;

	filteredJson.push(newObj);
});


console.log(JSON.stringify(filteredJson));