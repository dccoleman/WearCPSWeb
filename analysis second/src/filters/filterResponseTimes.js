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
		avg += row.notifications[i].time_diff;

		if(row.notifications[i].id < 3) {
			secAvg += row.notifications[i].time_diff;
			secCount++;
		} else {
			safAvg += row.notifications[i].time_diff;
			safCount++;
		}

	}

	avg = avg/(row.notifications.length);
	secAvg = secAvg/secCount;
	safAvg = safAvg/safCount;

	newObj = {
		"avg" : avg,
		"secAvg" : secAvg,
		"safAvg" : safAvg
	}

	secCount = 0;
	safCount = 0;
	avg = 0;
	secAvg = 0;
	safAvg = 0;

	filteredJson.push(newObj);
});


console.log(JSON.stringify(filteredJson));