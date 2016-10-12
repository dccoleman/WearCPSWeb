var data = require('../results/dataMaster.json');
var i = 0;

console.log('{ "dataEntries" : [' );

for(i = 0; i < data.length - 1; i++){

	if (typeof data[i].data == 'undefined') {
		while(typeof data[i].data == 'undefined') {
			i++;
		}
	}
		console.log(JSON.stringify(JSON.parse(data[i].data)));
		
		if(i < (data.length - 2)) {
			console.log(",");
		}
	
}

console.log("]}");