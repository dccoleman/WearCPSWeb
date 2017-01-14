var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

var gradeLevelMap = [9,10,8.8,9.05,10.05,8.85]

json.dataEntries.filter(function(row){

	var i = 0;
	for(i = 0; i < row.notifications.length; i++) {
		var gradeLevel = gradeLevelMap[row.notifications[i].id];

		var adder = 1;
		if(row.notifications[i].id < 3) {
			if(row.notifications[i].id == 1) {
				adder = 2;
			}
			row.notifications[i].correct_button += adder;
		}

		var correct;
		if(row.notifications[i].correct_button == row.notifications[i].button_clicked) {
			correct = 1;
		} else {
			correct = 0;
		}

		var type = "safety";
		if(row.notifications[i].id < 3) {
			type = "security";
		}

		newObj = {
			"Type" : type,
			"GradeLevel" : gradeLevel,
			"Correct" : correct
		}

		filteredJson.push(newObj);
		
	}
});

console.log(JSON.stringify(filteredJson));