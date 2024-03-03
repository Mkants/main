"use strict";

function NewUpdateLine(Date, Version, Data) {
	$("main").append(`<div class="Content">
		<div class="Update">
			<span class="version">ver ${Version}</span>
			<span class="date">${Date}</span>
		</div>
		<div class="UpdateContent">
			${Data}
		</div>
	</div>`);
}

function ListToHTML(Datas) {
	if (Array.isArray(Datas)) {
		let Text = "";
		for (let i = 0; i < Datas.length; i++) {
			Text += `<li>${Datas[i]}</li>`;
		}
		return `<ul>${Text}</ul>`;
	} else {
		return null;
	}
}

$(function () {
	const Versions = [
		"-10.0.0",
		"-9.9.9"
	];
	const Dates = [
		"2024/02/29",
		"2024/03/03"
	];
	const Datas = [
		["0~9までの数字のフォントを作成"],
		["数字のフォントをすべて角を丸く"]
	].map(InputData => ListToHTML(InputData))

	for (let i = 0; i < Versions.length; i++) {
		NewUpdateLine(Dates[i], Versions[i], Datas[i]);
	}
});