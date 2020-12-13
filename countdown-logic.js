'use strict';

var countdownTime = new Date(new Date().getFullYear(), 11, 24);

var seconds;

var customBounce = CustomEase.create("customBounce", "M0,0 C0.152,0.18 0.214,0.28 0.316,0.54 0.378,0.7 0.43,0.963 0.438,1 0.446,0.985 0.49,0.816 0.648,0.736 0.728,0.696 0.798,0.729 0.836,0.744 0.93,0.78 1,1 1,1")


var testVar = 61;
var errorState = false;

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
	const updateDuration = 0.6;
	const animationRatio = 0.6;  // firstPart / whole
	var elements = document.getElementById("countdown-" + unit).getElementsByClassName("counter-half");
	var topE = elements[0];
	var movingE = elements[1];
	var bottomHalf = elements[2];
	var formatedValue = ("0" + value).slice(-2);
	if (movingE.textContent == formatedValue) {
		return;
	}

	topE.textContent = formatedValue;

	movingE.classList.remove("bottom-half");
	movingE.classList.add("top-half");
	gsap.fromTo(topE, {
		filter: "brightness(20%)"
	}, {
		filter: "brightness(85%)"
	})
	gsap.fromTo(movingE, {
		filter: "brightness(85%)"
	}, {
		duration: updateDuration * animationRatio,
		rotateX: 90,
		filter: "brightness(110%)",
		ease: "power2.in",
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
			duration: updateDuration * (1 - animationRatio),
			ease: "customBounce",
			rotateX: 0
		});
		gsap.to(bottomHalf, {duration: updateDuration * (1 - animationRatio), filter: "brightness(70%)", onComplete: fullComplete})
	}
	function fullComplete() {
		bottomHalf.textContent = formatedValue;
		bottomHalf.style.filter = "brightness(100%)";
	}
}