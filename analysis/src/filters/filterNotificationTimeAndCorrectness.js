var json = require('../../results/parsedDataMaster.json');

var max = 0 ;

var filteredJson = [];

var newObj = {};

json.dataEntries.filter(function(row){


	newObj = {
		"age" : row.demographics.age
	}

	filteredJson.push(newObj);
});


console.log(JSON.stringify(filteredJson));