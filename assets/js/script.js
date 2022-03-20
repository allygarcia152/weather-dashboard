var todaysWeatherContainerEl = document.querySelector("#todaysWeather");
var fiveDayForecastEl = document.querySelector("#fiveDayForecast");
var locationSearch = document.location.search;
var locationDisplay = document.querySelector("#location-display");
var cityNameDisplayEl = document.querySelector("#weather-for");


var getLocationName = function () {
  //get text location//
  var cityStateEl = locationSearch.split("=")[1];
  //get city name from search//
  var cityName = cityStateEl.split("%2C")[0];
  console.log(cityName);

  //localStorage searches

  //get lat and lon based on city,state search//
  var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&apiKey=0e363cf8d4f89182d0429ca737e95a95";
  console.log(apiUrl);
  //fetch the latitute and longitude//
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data);
        
      })
    }
  })
};

var displayWeather = function (data) {
  console.log(data);
  // display current weather
  var icon = document.querySelector("#current-weather-icon");
  var temp = document.querySelector("#current-temp");
  var hum = document.querySelector("#current-humidity");
  var wind = document.querySelector("#current-wind");
  var index = document.querySelector("#current-uv-index");
  var city = document.querySelector("#location-display");
  var date = document.querySelector("#current-date");

  var name = data[0].name;
  var lat = data[0].lat;
  var lon = data[0].lon;
  console.log(lat);
  console.log(lon);
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0e363cf8d4f89182d0429ca737e95a95";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //display city name
        cityNameDisplayEl.textContent = "Weather for: " + name;
        city.textContent = name;

        //display today's date
        date.textContent = moment().format('LL');

        //show icon of weather
        var currentIcon = data.current.weather[0].icon;
        var showIcon = document.createElement("img");
        showIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        icon.appendChild(showIcon);

        //get current temperature
        var currentTemp = data.current.temp;
        console.log(currentTemp);
        temp.textContent = "Temperature: " + currentTemp;

        //get current humidity
        var currentHum = data.current.humidity;
        console.log(currentHum);
        hum.textContent = "Humidity: " + currentHum;

        //get current wind speed
        var currentWind = data.current.wind_speed;
        console.log(currentWind);
        wind.textContent = "Wind Speed: " + currentWind + " mph";

        //get current index
        var currentIndex = data.current.uvi;
        console.log(currentIndex);
        index.textContent = "UV Index: " + currentIndex;
      })
    };
  });
};

getLocationName();