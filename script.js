use: "strict";

const btn = document.querySelector(".btn-confirm");

// checking the geolocation of the user for the weather
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);
      const request = new XMLHttpRequest();
      request.open(
        "GET",
        // `https://api.weather.gov/points/${latitude},${longitude}`,
        `https://api.weather.gov/gridpoints/TOP/31,80/forecast`
      );
      request.send();

      request.addEventListener("load", function () {
        //   console.log(this.responseText);
        const data = JSON.parse(this.responseText);
        const dataset = data.properties.periods;
        //destructuring the data coming into the function
        const formatedData = dataset.map(
          ({ name, temperature, windSpeed }) => ({
            name,
            temperature,
            windSpeed,
          })
        );
        console.log(formatedData);
      });
    },
    function () {
      alert("Could not get your position");
    }
  );
