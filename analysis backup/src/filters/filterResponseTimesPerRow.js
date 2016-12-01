var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){

var i, type, responseTime;

	for(i = 0; i < row.notifications.length; i++) {
		responseTime = row.notifications[i].time_diff;
		//security
		if(row.notifications[i].id < 3) {
			type = "Security";
		
		//safety
		} else {
			type = "Safety";
		}

		newObj = {
			"Type" : type,
			"ResponseTime" : responseTime,

		}

		filteredJson.push(newObj);

	}

});

console.log(JSON.stringify(filteredJson));