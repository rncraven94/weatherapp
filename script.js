use: "strict";
document.addEventListener("DOMContentLoaded", function () {
  // const btn = document.querySelector(".btn-confirm");
  const weatherContainer = document.getElementById("weather-container");
  const cityDiv = document.getElementById("city-name");

  // checking the geolocation of the user for the weather
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(latitude, longitude);
        const gridRequest = new XMLHttpRequest();
        gridRequest.open(
          "GET",
          `https://api.weather.gov/points/${latitude},${longitude}`
        );
        gridRequest.send();
        gridRequest.addEventListener("load", function () {
          const data = JSON.parse(this.responseText);
          const cityString = data.properties.relativeLocation.properties.city;
          const editedCityString = cityString.split(" (")[0];
          cityDiv.textContent = editedCityString;
          console.log(editedCityString);

          const dataGridX = data.properties.gridX;
          const dataGridY = data.properties.gridY;
          console.log(dataGridX);
          console.log(dataGridX, dataGridY);
          const request = new XMLHttpRequest();
          request.open(
            "GET",
            // `https://api.weather.gov/points/${latitude},${longitude}`,
            `https://api.weather.gov/gridpoints/TOP/${dataGridX},${dataGridY}/forecast`
          );
          request.send();

          request.addEventListener("load", function () {
            //   console.log(this.responseText);
            const data = JSON.parse(this.responseText);
            const dataset = data.properties.periods;
            console.log(dataset);
            //destructuring the data coming into the function
            const formatedData = dataset.map(
              //breaks the function into a more managable chunk
              ({ name, temperature, detailedForecast, windSpeed }) => ({
                name,
                temperature,
                detailedForecast,
                windSpeed,
              })
            );
            //breaks down the list further
            formatedData.forEach((entry, index) => {
              // console.log(`Entry ${index + 1}:`);
              // console.log(`Name: ${entry.name}`);
              // console.log(`Temperature: ${entry.temperature}`);
              // console.log(`Wind Speed: ${entry.windSpeed}`);
              // console.log("--------------------------");
              const entryDiv = document.createElement("div");
              entryDiv.classList.add("weather-container");

              const nameElement = document.createElement("p");
              nameElement.textContent = `${entry.name}`;
              entryDiv.appendChild(nameElement);
              nameElement.classList.add("weather-title");

              const tempElement = document.createElement("p");
              tempElement.textContent = `${entry.temperature}°F`;
              entryDiv.appendChild(tempElement);
              tempElement.classList.add("weather-temp");

              const detailedElement = document.createElement("p");
              detailedElement.textContent = `${entry.detailedForecast}`;
              entryDiv.appendChild(detailedElement);
              detailedElement.classList.add("weather-detail");

              const windElement = document.createElement("p");
              windElement.textContent = `${entry.windSpeed}`;
              entryDiv.appendChild(windElement);

              weatherContainer.appendChild(entryDiv);
            });
          });
        });
        const requestFetch = fetch(
          `https://api.weather.gov/points/${latitude},${longitude}`
        );
        console.log(requestFetch);
      },
      function () {
        alert("Could not get your position");
      }
    );
});
