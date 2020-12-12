var currentYear = new Date().getFullYear();
var countdownTime = new Date(currentYear, 11, 24);

var testVar = 61;

var x = setInterval(function() {
	var difference = countdownTime.getTime() - Date.now();
	var days = Math.floor(difference / (1000 * 60 * 60 * 24));
	var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((difference % (1000 * 60)) / 1000);

	updateCounterUnit("seconds", seconds);
	updateCounterUnit("minutes", minutes);
	updateCounterUnit("hours", hours);
	updateCounterUnit("days", days);

	if (seconds == testVar) {
		console.log(seconds);
	}
	testVar = seconds;

	if (difference <= 0) {
		clearInterval(x);
	}
}, 1000);


function updateCounterUnit(unit, value) {
	elements = document.getElementById("countdown-" + unit).getElementsByClassName("counter-half");
	var formatedValue = ("0" + value).slice(-2);
	for (var i = elements.length - 1; i >= 0; i--) {
		elements[i].textContent = formatedValue;
	}
}