use: "strict";

const btn = document.querySelector(".btn-confirm");

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
  },
  function () {
    alert("Could not get your position");
  }
);

const request = new XMLHttpRequest();
request.open("GET", "https://api.weather.gov/points/39.7456,-97.0892");
request.send();

request.addEventListener("load", function () {
  //   console.log(this.responseText);
  const data = JSON.parse(this.responseText);
  console.log(data);
});
