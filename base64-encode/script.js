if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then((registration) => {
				console.log(
					"ServiceWorker registration successful with scope: ",
					registration.scope
				);
			})
			.catch((err) => {
				console.log("ServiceWorker registration failed: ", err);
			});
	});
}

let $ = (i) => document.getElementById(i);
$("e").onclick = () => {
	$("o").value = b($("i").value)
};
function b(input) {
	let a = new TextEncoder().encode(input);
	let d = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"+",
		"/",
	];
	let b = "";
	for (let t of a) {
		b += ("00000000" + t.toString(2)).slice(-8);
	}
	while (b.length % 6 > 0) {
		b += "0";
	}
	let o = "";
	for (let i = 0; i < b.length / 6; i++) {
		let n = parseInt(b.substr(i * 6, 6), 2);
		o += d[n];
	}
	while (o.length % 4 > 0) {
		o += "=";
	}
	return o;
}

$("f").onchange = ()=>{
	let r = new FileReader();
	r.onload = (e) => {
		$("t").value = e.currentTarget.result;
	}
	r.readAsDataURL($("f").files[0]);
}