var data = require('../results/dataMaster.json');
var i = 0;

console.log('{ "dataEntries" : [' );

for(i = 0; i < data.length; i++){

	if (typeof data[i].data == 'undefined') {
		while(typeof data[i].data == 'undefined') {
			i++;
		}
	}
		if(data[i].data[22] != 't') {

		} else {
			console.log(JSON.stringify(JSON.parse(data[i].data)));

		if(i < (data.length-1)) {
			console.log(",");
		}
		}

	
	
}

console.log("]}");