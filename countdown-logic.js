var currentYear = new Date().getFullYear();
var countdownTime = new Date(currentYear, 11, 24);

var seconds;

updateCounter();

var x = setInterval(function() {

	updateCounterUnit("seconds", --seconds);

	if (seconds <= -1) {
		updateCounter();
	}
}, 1000);

function updateCounter() {
	var difference = countdownTime.getTime() - Date.now();
	var days = Math.floor(difference / (1000 * 60 * 60 * 24));
	var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((difference % (1000 * 60)) / 1000);

	updateCounterUnit("seconds", seconds);
	updateCounterUnit("minutes", minutes);
	updateCounterUnit("hours", hours);
	updateCounterUnit("days", days);

	if (difference <= 0) {
		clearInterval(x);
	}
}

function updateCounterUnit(unit, value) {
	elements = document.getElementById("countdown-" + unit).getElementsByClassName("counter-half");
	var formatedValue = ("0" + value).slice(-2);
	for (var i = elements.length - 1; i >= 0; i--) {
		elements[i].textContent = formatedValue;
	}
}