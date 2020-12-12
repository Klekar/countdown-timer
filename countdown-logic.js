var currentYear = new Date().getFullYear();
var countdownTime = new Date(currentYear, 11, 24);

var seconds;

var testVar = 61;

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

	if (minutes == testVar) {
		console.log(minutes);
	}
	testVar = minutes;

	updateCounterUnit("seconds", seconds);
	updateCounterUnit("minutes", minutes);
	updateCounterUnit("hours", hours);
	updateCounterUnit("days", days);

	if (difference <= 0) {
		clearInterval(x);
	}
}

function updateCounterUnit(unit, value) {
	const updateDuration = 0.6;
	var elements = document.getElementById("countdown-" + unit).getElementsByClassName("counter-half");
	var movingE = elements[1];
	var formatedValue = ("0" + value).slice(-2);
	if (movingE.textContent == formatedValue) {
		return;
	}

	elements[0].textContent = formatedValue;

	movingE.classList.remove("bottom-half");
	movingE.classList.add("top-half");
	gsap.to(movingE, {duration: updateDuration/2, rotateX: 90, onComplete: halfComplete});
	function halfComplete() {
		movingE.style.transform = "rotateX(-90deg)";
		movingE.classList.add("bottom-half");
		movingE.classList.remove("top-half");
		movingE.textContent = formatedValue;
		gsap.to(movingE, {duration: updateDuration/2, rotateX: 0, onComplete: fullComplete})
	}
	function fullComplete() {
		elements[2].textContent = formatedValue;
	}
}