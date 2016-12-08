var json = require('../../results/parsedDataMaster.json');

var filteredJson = [];

var newObj = {};

var gradeLevelMap = [9.15,14.04,9.77,9.76,7.2,6.82]

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

		newObj = {
			"GradeLevel" : gradeLevel,
			"Correct" : correct
		}

		filteredJson.push(newObj);
		
	}
});

console.log(JSON.stringify(filteredJson));