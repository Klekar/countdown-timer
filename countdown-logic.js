'use strict';

var countdownTime = new Date(new Date().getFullYear(), 11, 24);

var seconds;

var testVar = 61;
var errorState = false;

updateCounter();

var x = setInterval(function() {

	updateCounterUnit("seconds", --seconds);

	if (seconds <= -1) {
		updateCounter();
	}
}, 3000);

function updateCounter() {
	var difference = countdownTime.getTime() - Date.now();
	var days = Math.floor(difference / (1000 * 60 * 60 * 24));
	var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((difference % (1000 * 60)) / 1000);

	if (errorState) {
		console.log("update after error, ts: " + Date.now() + ", seconds: " + seconds);
	}
	if (minutes == testVar) {
		console.log("same minute 2 times in a row, ts: " + Date.now() + ", seconds: " + seconds);
		errorState = true;
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
	const updateDuration = 1.8;
	var elements = document.getElementById("countdown-" + unit).getElementsByClassName("counter-half");
	var movingE = elements[1];
	var bottomHalf = elements[2];
	var formatedValue = ("0" + value).slice(-2);
	if (movingE.textContent == formatedValue) {
		return;
	}

	elements[0].textContent = formatedValue;

	movingE.classList.remove("bottom-half");
	movingE.classList.add("top-half");
	gsap.fromTo(movingE, {
		filter: "brightness(85%)"
	}, {
		duration: updateDuration/2,
		rotateX: 90,
		filter: "brightness(110%)",
		onComplete: halfComplete
	});
	function halfComplete() {
		movingE.style.transform = "rotateX(-90deg)";
		movingE.style.filter = "brightness(100%)";
		movingE.classList.add("bottom-half");
		movingE.classList.remove("top-half");
		movingE.textContent = formatedValue;
		gsap.fromTo(movingE, {
			transform: "rotateX(-90deg)",
			filter: "brightness(100%)"
		},{
			duration: updateDuration/2,
			ease: "bounce.out",
			rotateX: 0
		});
		gsap.to(bottomHalf, {duration: updateDuration / 2, filter: "brightness(70%)", onComplete: fullComplete})
	}
	function fullComplete() {
		bottomHalf.textContent = formatedValue;
		bottomHalf.style.filter = "brightness(100%)";
	}
}