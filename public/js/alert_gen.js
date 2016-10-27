//alert generation

var clickNumber = 0;
var currentAlert = 0;
var count = 0;
var timeout;
var alertEnRoute;
var experimenting = true;
var alerts = 0;
var notification;

var security_notifications;
var safety_notifications;
var already_generated = [false];
var notifications_generated = createArray(12,12);
var ids = [];

var responses = [];

var alertTypeSet = [0,1,0,0,1,1];
var alertSequenceSet = [0,0,1,2,1,2];
var securityCount = 0;
var safetyCount = 0;

function generateAlert() {
	if(experimenting && alerts < 6){
		var data = {};
		timeout = true;
		alertEnRoute = false;
		currentAlert++;
		experimentr.startTimer("alert"+currentAlert);

		if(alertTypeSet[alerts] == 0) {
			notification = security_notifications[alertSequenceSet[alerts]];
			$('#image').attr('src', "modules/primary_task/security.png");

		} else if(alertTypeSet[alerts] == 1) {
			notification = safety_notifications[alertSequenceSet[alerts]];
			$('#image').attr('src', "modules/primary_task/safety.png");
		} else {
			console.log("Error: Fix the types or sequence arrays");
		}	

		alerts++;

		$('.modal-title').text(notification[0]);
	    $('#description').text(notification[1]);
	    $('label[for=one]').text(notification[2]);
	    $('label[for=two]').text(notification[3]);
	    $('label[for=three]').text(notification[4]);

	    stopEnter();
	    $("#myModal").modal('show');
	    data["name"] = notification[0];
	    //experimentr.addData(data);
	    //TODO: alerts may not want to timeout!
	    //setTimeout(function(){timeoutAlert()}, 10000);
	}
}

function stopEnter() {
	if(runTimer) {
		document.getElementById("formValueId").blur();
		enabled = 0;
	}
}

function startGeneration(){
   var data = {}; //Hacky way to deal with Experimentr not dealing with non-existing keys
   
   experimentr.addData(data);
   /**
   var total = 0;
   for(var i = 0; i < 5; i++){
       var x = Math.random() * 20000;
       total += x;
       setTimeout(function(){generateAlert()}, total);
   }
	*/
	var x = Math.random() * 15000;
	var experimentLength = 120000;
	setTimeout(function(){generateAlert()}, x);
	//setTimeout(function(){endExperiment()}, experimentLength);
}

function collectClick(val){
	console.log("collecting click");
	timeout = false;
	data = {};
	clickNumber++;
	//TODO account if they press a button without an alert started, and multiple presses for one alert
	data["name"] = notification[0];
	data["id"] = parseInt(notification[7]);
	if(currentAlert > 0){
		experimentr.endTimer("alert"+currentAlert);

		data["time_start"] = experimentr.data()['time_start_alert' + currentAlert];
		data["time_end"] = experimentr.data()['time_end_alert' + currentAlert];
		data["time_diff"] = experimentr.data()['time_diff_alert' + currentAlert];

		switch(val) {
			case "one":
				val = 1;
				break;
			case "two":
				val = 2;
				break;
			case "three":
				val = 3;
				break;
			default:
				val = -1;
		}

		data["button_clicked"] = val;
		data["correct_button"] = parseInt(notification[5]);
	}
	data["click_#"] = clickNumber;
	responses.push(data);
	if(!alertEnRoute){
			var x = 7000 + Math.random() * 15000;
			setTimeout(function(){generateAlert()}, x);
			alertEnRoute=true;
		}
	enabled = 1;
	console.log("finished collecting click");
}

function timeoutAlert(){
	if(timeout){
		//Maybe hide alert
		console.log("Alert timed out");

		$("#myModal").modal('hide');

		timeout=false;
		if(!alertEnRoute){
			var x = 7000+ Math.random() * 15000;
			setTimeout(function(){generateAlert()}, x);
			alertEnRoute=true;
		}
	enabled = 1;
	}
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}