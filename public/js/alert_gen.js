//alert generation

var clickNumber = 0;
var currentAlert = 0;
var timeout;
var alertEnRoute;
var experimenting = true;

var security_notifications;
var safety_notifications;
var already_generated = [false];

function generateAlert() {
	if(experimenting){
		var data = {};
		timeout = true;
		alertEnRoute = false;
		currentAlert++;
		experimentr.startTimer("alert"+currentAlert);
		//TODO create for safety notifications
		var type = Math.floor(Math.random() * (2));
		var notification;

		//security notification
		if(type == 0) {
			var security_index = Math.floor(Math.random()*security_notifications.length);

			if(security_index == 0) {
				security_index++;
			}

			notification = security_notifications[security_index];

			$('#image').attr('src', "modules/watch_test/security.png");
		}

		//safety notification
		else {
			var safety_index = Math.floor(Math.random()*safety_notifications.length);

			if(safety_index == 0) {
				safety_index++;
			}

			notification = safety_notifications[safety_index];

			$('#image').attr('src', "modules/watch_test/safety.png");

		}

		while(already_generated[notification[1]] == true){
			console.log("Already generated");
			type = Math.floor(Math.random() * (2));

			//security notification
			if(type == 0) {
				var security_index = Math.floor(Math.random()*security_notifications.length);

				if(security_index == 0) {
					security_index++;
				}

				notification = security_notifications[security_index];

				$('#image').attr('src', "modules/watch_test/security.png");
			}

			//safety notification
			else {
				var safety_index = Math.floor(Math.random()*safety_notifications.length);

				if(safety_index == 0) {
					safety_index++;
				}

				notification = safety_notifications[safety_index];

				$('#image').attr('src', "modules/watch_test/safety.png");

			}
		}

		already_generated[notification[1]] = true;

		$('.modal-title').text(notification[0]);
	    $('#description').text(notification[1]);
	    $('label[for=one]').text(notification[2]);
	    $('label[for=two]').text(notification[3]);
	    $('label[for=three]').text(notification[4]);

	    stopEnter();
	    $("#myModal").modal('show');
	    data["notification"+currentAlert] = notification[0];
	    experimentr.addData(data);
	   setTimeout(function(){timeoutAlert()}, 10000);
	}
}

function stopEnter() {
	document.getElementById("formValueId").blur();
	enabled = 0;
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
	setTimeout(function(){endExperiment()}, experimentLength);
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
	//hideAlert();
	if(!alertEnRoute){
			var x = 2000 + Math.random() * 15000;
			setTimeout(function(){generateAlert()}, x);
			alertEnRoute=true;
		}
	enabled = 1;
}

function timeoutAlert(){
	if(timeout){
		//Maybe hide alert
		console.log("Alert timed out");

		$("#myModal").modal('hide');

		timeout=false;
		if(!alertEnRoute){
			var x = Math.random() * 15000;
			setTimeout(function(){generateAlert()}, x);
			alertEnRoute=true;
		}
	enabled = 1;
	}
}
