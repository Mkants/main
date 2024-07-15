if (location.host !== "honnkon.tech" || location.host !== "honnkon314.f5.si") {
	location.replace("https://honnkon.tech");
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js')
		.then(registration => {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		})
		.catch(err => {
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

$(function() {
	"use strict";
});
