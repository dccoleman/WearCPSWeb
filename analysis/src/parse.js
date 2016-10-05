var data = require('../results/dataMaster.json')
var i = 0;
console.log('{ "dataEntries" : [' )
while(data[i]){
	console.log(JSON.stringify(JSON.parse(data[i].data)));
	i++;
	if(data[i]) {
		console.log(",");
	}
}

console.log("]}");