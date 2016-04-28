// adding initial time classnames on load. css handles the timing.
var time = new Date(),
	hours = time.getHours(),
	minutes = time.getMinutes(),
	seconds = time.getSeconds();

document.getElementById("second-hand").className = "sh-" + seconds;
document.getElementById("minute-hand").className = "mh-" + minutes;
document.getElementById("hour-hand").className = "hh-" + hours;

$('.alarm_to_click').on('click', function() {
	$('.bubble').removeClass('remove');
	$('.bubble').addClass('active');
	$('.alarm_wrapper').addClass('show');
	$('.tick_12').addClass('animte');
	$('.tick_3').addClass('animte3');
	$('.tick_6').addClass('animte6');
	$('.tick_9').addClass('animte9');
});

$('.alarm_wrapper .alarm__icon i:nth-child(2)').on('click', function() {	$('.tick_3').removeClass('animte3');	$('.tick_6').removeClass('animte6');	$('.tick_9').removeClass('animte9');	$('.tick_12').removeClass('animte');	$('.bubble').removeClass('active');
	$('.bubbleback').removeClass('remove');	$('.alarm_wrapper').removeClass('show');
});