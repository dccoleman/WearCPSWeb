//alert generation

var clickNumber = 0;
var currentAlert = 0;
var timeout;
var alertEnRoute;
var experimenting = true;
var experimentCase;
function generateAlert() {
	if(experimenting){
		timeout = true;
		alertEnRoute = false;
		currentAlert++;
		experimentr.startTimer("alert"+currentAlert);
		//TODO log when the alert is generated	
	    var severity = Math.floor((Math.random() * 5) + 1);
	    var data = {};
	    data[("Alert_"+currentAlert+"_severity")]=severity;
	    var confidence = Math.random().toFixed(2);
	    data[("Alert_"+currentAlert+"_confidence")]=confidence;
	    experimentr.addData(data);
	    var output = "Severity: " + severity;

	    //Generate our state variables
		var healthScore = Math.random().toFixed(2); //This shouldn't be generated here
		var deviceState; //This shouldn't be generated here
		switch(Math.floor((Math.random() * 3))) {
			case 0:
				deviceState = "Actuating";
				break;
			case 1:
				deviceState = "Both";
				break;
			case 2:
				deviceState = "Sensing";
				break;
		}

		switch(experimentCase){ //A/B , with and without color
			case 0:
				switch(severity){
					case 0:
						$('.bubble').css("background-color","green");
						break;
					case 1:
						$('.bubble').css("background-color","green");
						break;
					case 2:
						$('.bubble').css("background-color","gold");
						break;
					case 3:
						$('.bubble').css("background-color","orange");
						break;
					case 4:
						$('.bubble').css("background-color","darkorange");
						break;
					case 5:
						$('.bubble').css("background-color","red");
						break;
					default:
						break;

				}
				break;
			case 1:
				$('.bubble').css("background-color","black");
				break;
			}
		var actionTuple = generateActionTuple(healthScore,deviceState,severity,confidence);

		document.getElementById("severity").innerHTML = "Severity: " + severity;
		document.getElementById("action").innerHTML = actionTuple[Math.floor(Math.random() * 5) + 1];

		//document.getElementById("watchId").style.webkitAnimationName = 'shake'; // you had a trailing space here which does NOT get trimmed
	    //document.getElementById("watchId").style.webkitAnimationDuration = '.8s';
	    showAlert();
	   $('.watch').addClass('shake');
	   var timeoutID = window.setTimeout(resetAnimation, 1000);
	   setTimeout(function(){timeoutAlert()}, 10000);
	}
}

function resetAnimation() {
	$('.watch').removeClass('shake');
}	

function startGeneration(){
   var data = {}; //Hacky way to deal with Experimentr not dealing with non-existing keys
   for(var i = 1; i <= 10; i++){
   		var key1 = "Click_" + i + "_button";
   		var key2 = "Alert_" + i + "_response";
   		var key3 = "time_diff_alert" + i;
   		var key4 = "time_start_alert" + i;
   		var key5 = "Alert_" + i + "_confidence";
   		var key6 = "Alert_" + i + "_severity";
   		data[key1] = " ";
   		data[key2] = " ";
   		data[key3] = " ";
   		data[key4] = " ";
   		data[key5] = " ";
   		data[key6] = " ";
   }
   
   /**
   var total = 0;
   for(var i = 0; i < 5; i++){
       var x = Math.random() * 20000;
       total += x;
       setTimeout(function(){generateAlert()}, total);
   }
	*/
	experimentCase = Math.floor(Math.random() * 2);
	if(experimentCase == 0){
		data["experiment_case"] = "black only";
	}
	else{
		data["experiment_case"] = "Colors";
	}
	experimentr.addData(data);
	var x = Math.random() * 15000;
	var experimentLength = 120000;
	setTimeout(function(){generateAlert()}, x);
	setTimeout(function(){endExperiment()}, experimentLength);
}

function generateActionTuple(hScore, dState, aSeverity, aConfidence) {
	var actionTuple = [];
	actionTuple[0] = 3;
	actionTuple[1] = "Turn off Monitor";
	actionTuple[2] = "Disconnect Monitor";
	actionTuple[3] = "Calibrate Monitor";
	actionTuple[4] = "Suspend Pump";
	actionTuple[5] = "Release Pump";
	return actionTuple;
}

function showAlert(){
	$('.bubble').removeClass('remove');
	$('.bubble').addClass('active');
	$('.alarm_wrapper').addClass('show');
	$('.tick_12').addClass('animte');
	$('.tick_3').addClass('animte3');
	$('.tick_6').addClass('animte6');
	$('.tick_9').addClass('animte9');
}

function hideAlert(){
	console.log("hiding alert");
	$('.bubble').addClass('remove');
	$('.bubble').removeClass('active');
	$('.alarm_wrapper').removeClass('show');
	$('.tick_12').removeClass('animte');
	$('.tick_3').removeClass('animte3');
	$('.tick_6').removeClass('animte6');
	$('.tick_9').removeClass('animte9');
}

function collectClick(val){
	timeout = false;
	data = {};
	clickNumber++;
	var key1 = "Click_" + clickNumber + "_button";
	data[key1] = val;
	//TODO account if they press a button without an alert started, and multiple presses for one alert
	if(currentAlert > 0){
		experimentr.endTimer("alert"+currentAlert);
		var key2 = "Alert_" + currentAlert + "_response";
		data[key2] = val;
	}
	experimentr.addData(data);
	hideAlert();
	if(!alertEnRoute){
			var x = Math.random() * 15000;
			setTimeout(function(){generateAlert()}, x);
			alertEnRoute=true;
		}
}

function timeoutAlert(){
	if(timeout){
		//Maybe hide alert
		console.log("Alert timed out");
		timeout=false;
		if(!alertEnRoute){
			var x = Math.random() * 15000;
			setTimeout(function(){generateAlert()}, x);
			alertEnRoute=true;
		}
	}
}

function endExperiment(){
	experimenting = false;
	console.log("fin");
}