use: "strict";

const btn = document.querySelector(".btn-confirm");

const request = new XMLHttpRequest();
request.open("GET", "https://api.weather.gov/openapi.json");
request.send();

request.addEventListener("load", function () {
  console.log(this.responseText);
});
