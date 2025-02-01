/* サービスワーカーの登録は一時停止
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
*/

if ((location.host == "honnkon.tech")) {
	location.replace("https://mkants.f5.si");
}

$(function () {
	"use strict";
});
