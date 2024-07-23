// URL: /redirect?to=URL

document.body.innerText = location.search.split("?to=")[1];
location.replace(location.search.split("?to=")[1]);