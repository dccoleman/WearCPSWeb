var data = require('./results/data.json')
var i = 0;
while(data[i]){
	console.log("[" + JSON.stringify(JSON.parse(data[i].data)) + "]");
	i++;
}