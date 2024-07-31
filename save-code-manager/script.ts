// @ts-ignore
const $: any = (elem: string) => document.querySelector(elem);
const api_url: string = `https://script.google.com/macros/s/AKfycbyCQJELE_U-G6DRDV9nw1BNYlpjRSOxQ3mGdv7lcE5hqvgqgM8dabwsP1HKQ1oD17ebxg/exec`;
$("form[name=view]").addEventListener("submit", async (e: any) => {
	e.preventDefault();
	$("textarea#get_savedata").innerText = "データ取得中...";
	const response = await (await fetch(api_url, {
		method: "POST",
		body: JSON.stringify({
			method: "GET",
			showcode: $("#get_showcode").value,
		})
	})).json();
	if (response.status == 200) {
		$("textarea#get_savedata").innerText = response.response;

	} else if (response.status == 400) {
		$("textarea#get_savedata").innerText = "見つかりませんでした。";
	} else {
		$("textarea#get_savedata").innerText = "エラーが発生しました。詳しくはブラウザコンソールを参照してください。";
		console.error(response);
	}
})

$("form[name=save]").addEventListener("submit", async (e: any) => {
	e.preventDefault();
	$("#save_response").innerText = "データ保存中...";
	const response = await (await fetch(api_url, {
		method: "POST",
		body: JSON.stringify({
			method: "NEW",
			showcode: $("#save_showcode").value,
			savecode: $("#save_savecode").value,
			password: $("#save_password").value,
		})
	})).json();
	if (response.status == 200) {
		$("#save_response").innerText = "成功しました。";
	} else if (response.status == 400) {
		$("#save_response").innerText = "すでに同じ閲覧コードがあります。";
	} else {
		$("#save_response").innerText = "エラーが発生しました。詳しくはブラウザコンソールを参照してください。";
		console.error(response);
	}

	return false;
});

$("form[name=change]").addEventListener("submit", async (e: any) => {
	e.preventDefault();
	$("#change_response").innerText = "データ変更中...";
	const response = await (await fetch(api_url, {
		method: "POST",
		body: JSON.stringify({
			method: "CHANGE",
			showcode: $("#change_showcode").value,
			savecode: $("#change_savecode").value,
			password: $("#change_password").value,
		})
	})).json();
	if (response.status == 200) {
		$("#change_response").innerText = "成功しました。";
	} else if (response.status == 400) {
		if (response.response == "showcode not found") {
			$("#change_response").innerText = "閲覧コードが見つかりませんでした。";
		} else {
			$("#change_response").innerText = "パスワードが違います。";
		}
	} else {
		$("#change_response").innerText = "エラーが発生しました。詳しくはブラウザコンソールを参照してください。";
		console.error(response);
	}
	return false;
});

$("form[name=delete]").addEventListener("submit", async (e: any) => {
	e.preventDefault();
	$("#delete_response").innerText = "データ削除中...";
	const response = await (await fetch(api_url, {
		method: "POST",
		body: JSON.stringify({
			method: "DELETE",
			showcode: $("#delete_showcode").value,
			password: $("#delete_password").value,
		})
	})).json();
	if (response.status == 200) {
		$("#delete_response").innerText = "成功しました。";
	} else if (response.status == 400) {
		if (response.response == "showcode not found") {
			$("#delete_response").innerText = "閲覧コードが見つかりませんでした。";
		} else {
			$("#delete_response").innerText = "パスワードが違います。";
		}
	} else {
		$("#delete_response").innerText = "エラーが発生しました。詳しくはブラウザコンソールを参照してください。";
		console.error(response);
	}
	return false;
});

$("form[name=passchange]").addEventListener("submit", async (e: any) => {
	e.preventDefault();
	$("#passchange_response").innerText = "パスワード変更中...";
	const response = await (await fetch(api_url, {
		method: "POST",
		body: JSON.stringify({
			method: "PASSCHANGE",
			showcode: $("#passchange_showcode").value,
			password: $("#passchange_password").value,
			newpassword: $("#passchange_newpassword").value,
		})
	})).json();
	if (response.status == 200) {
		$("#passchange_response").innerText = "成功しました。";
	} else if (response.status == 400) {
		if (response.response == "showcode not found") {
			$("#passchange_response").innerText = "閲覧コードが見つかりませんでした。";
		} else {
			$("#passchange_response").innerText = "パスワードが違います。";
		}
	} else {
		$("#passchange_response").innerText = "エラーが発生しました。詳しくはブラウザコンソールを参照してください。";
		console.error(response);
	}
	return false;
});