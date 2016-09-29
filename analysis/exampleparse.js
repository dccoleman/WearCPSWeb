var data = require('./results/data.json')
var i = 0;
while(data[i]){
	console.log(JSON.parse(data[i].data));
	i++;
}