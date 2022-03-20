var todaysWeatherContainerEl = document.querySelector("#todaysWeather");
var fiveDayForecastEl = document.querySelector("#fiveDayForecast");
var locationSearch = document.location.search;
var locationDisplay = document.querySelector("#location-display");
var cityNameDisplayEl = document.querySelector("#weather-for");
var dayOne = document.querySelector("#dayOne");
var dayTwo = document.querySelector("#dayTwo");
var dayThree = document.querySelector("#dayThree");
var dayFour = document.querySelector("#dayFour");
var dayFive = document.querySelector("#dayFive");


var getLocationName = function () {
  //get text location//
  var cityStateEl = locationSearch.split("=")[1];
  //get city name from search//
  var cityName = cityStateEl.split("%2C")[0];

  //save location name to localStorage 
  localStorage.setItem("City Name", cityName);

  //display searches under search button
  var searchDisplay = document.querySelector(".search-history");
  var displayName = document.createElement("div");
  displayName.classList.add("btn");
  displayName.classList.add("btn-secondary");
  displayName.textContent = localStorage.getItem(cityName);
  searchDisplay.appendChild(displayName);

  //get lat and lon based on city,state search//
  var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&apiKey=0e363cf8d4f89182d0429ca737e95a95";

  //fetch the latitute and longitude//
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data);
        displayForecastOne (data);
        displayForecastTwo (data);
        displayForecastThree (data);
        displayForecastFour (data);
        displayForecastFive (data);
      })
    }
  })
};

var displayWeather = function (data) {
  // grab tags to display current weather
  var icon = document.querySelector("#current-weather-icon");
  var temp = document.querySelector("#current-temp");
  var hum = document.querySelector("#current-humidity");
  var wind = document.querySelector("#current-wind");
  var index = document.querySelector("#current-uv-index");
  var city = document.querySelector("#location-display");
  var date = document.querySelector("#current-date");

  //get name, lat, and lon from other API
  var name = data[0].name;
  var lat = data[0].lat;
  var lon = data[0].lon;

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
        showIcon.classList.add('icon');
        icon.appendChild(showIcon);

        //get current temperature
        var currentTemp = data.current.temp;
        temp.textContent = "Temperature: " + currentTemp + "F";

        //get current humidity
        var currentHum = data.current.humidity;
        hum.textContent = "Humidity: " + currentHum + "%";

        //get current wind speed
        var currentWind = data.current.wind_speed;
        wind.textContent = "Wind Speed: " + currentWind + " mph";

        //get current index
        var currentIndex = data.current.uvi;
        index.textContent = "UV Index: " + currentIndex;

        //set color coding by hour
        if (currentIndex < 3) {
          index.classList.add("green")
        } else if (currentIndex >= 3 && currentIndex < 6) {
          index.classList.add("yellow")
        } else if (currentIndex >= 6 && currentIndex < 8) {
          index.classList.add("orange")
        } else if (currentIndex >= 8 && currentIndex < 11) {
          index.classList.add("red")
        } else {
          index.classList.add("purple")
        }

      })
    };
  });
};

var displayForecastOne = function (data) {
  // vars for day one
  var date = document.querySelector("#one-date");
  var icon = document.querySelector("#one-weather-icon");
  var temp = document.querySelector("#one-temp");
  var hum = document.querySelector("#one-humidity");
  var wind = document.querySelector("#one-wind");

  //get lat and lon from other API
  var lat = data[0].lat;
  var lon = data[0].lon;
  //get weather for day two
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0e363cf8d4f89182d0429ca737e95a95";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //display data in each div
        date.textContent = moment().add(1, 'day').format('L');
        //show icon of weather
        var currentIcon = data.daily[0].weather[0].icon;
        var showIcon = document.createElement("img");
        showIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        showIcon.classList.add('forecast-icon');
        icon.appendChild(showIcon);

        //get current temperature
        var currentTemp = data.daily[0].temp.day;
        temp.textContent = "Temperature: " + currentTemp + "F";

        //get current humidity
        var currentHum = data.daily[0].humidity;
        hum.textContent = "Humidity: " + currentHum + "%";

        //get current wind speed
        var currentWind = data.daily[0].wind_speed;
        wind.textContent = "Wind Speed: " + currentWind + " mph";
      })
    };
  });
};

var displayForecastTwo = function (data) {
  // vars for day two
  var date = document.querySelector("#two-date");
  var icon = document.querySelector("#two-weather-icon");
  var temp = document.querySelector("#two-temp");
  var hum = document.querySelector("#two-humidity");
  var wind = document.querySelector("#two-wind");

  //get lat and lon from other API
  var lat = data[0].lat;
  var lon = data[0].lon;
  //get weather for day two
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0e363cf8d4f89182d0429ca737e95a95";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //display data in each div
        date.textContent = moment().add(2, 'day').format('L');
        //show icon of weather
        var currentIcon = data.daily[1].weather[0].icon;
        var showIcon = document.createElement("img");
        showIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        showIcon.classList.add('forecast-icon');
        icon.appendChild(showIcon);

        //get current temperature
        var currentTemp = data.daily[1].temp.day;
        temp.textContent = "Temperature: " + currentTemp + "F";

        //get current humidity
        var currentHum = data.daily[1].humidity;
        hum.textContent = "Humidity: " + currentHum + "%";

        //get current wind speed
        var currentWind = data.daily[1].wind_speed;
        wind.textContent = "Wind Speed: " + currentWind + " mph";
      })
    };
  });
};

var displayForecastThree = function (data) {
  // vars for day three
  var date = document.querySelector("#three-date");
  var icon = document.querySelector("#three-weather-icon");
  var temp = document.querySelector("#three-temp");
  var hum = document.querySelector("#three-humidity");
  var wind = document.querySelector("#three-wind");

  //get lat and lon from other API
  var lat = data[0].lat;
  var lon = data[0].lon;
  //get weather for day three
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0e363cf8d4f89182d0429ca737e95a95";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //display data in each div
        date.textContent = moment().add(3, 'day').format('L');
        //show icon of weather
        var currentIcon = data.daily[2].weather[0].icon;
        var showIcon = document.createElement("img");
        showIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        showIcon.classList.add('forecast-icon');
        icon.appendChild(showIcon);

        //get current temperature
        var currentTemp = data.daily[2].temp.day;
        temp.textContent = "Temperature: " + currentTemp + "F";

        //get current humidity
        var currentHum = data.daily[2].humidity;
        hum.textContent = "Humidity: " + currentHum + "%";

        //get current wind speed
        var currentWind = data.daily[2].wind_speed;
        wind.textContent = "Wind Speed: " + currentWind + " mph";
      })
    };
  });
};

var displayForecastFour = function (data) {
  // vars for day four
  var date = document.querySelector("#four-date");
  var icon = document.querySelector("#four-weather-icon");
  var temp = document.querySelector("#four-temp");
  var hum = document.querySelector("#four-humidity");
  var wind = document.querySelector("#four-wind");

  //get lat and lon from other API
  var lat = data[0].lat;
  var lon = data[0].lon;
  //get weather for day four
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0e363cf8d4f89182d0429ca737e95a95";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //display data in each div
        date.textContent = moment().add(4, 'day').format('L');
        //show icon of weather
        var currentIcon = data.daily[3].weather[0].icon;
        var showIcon = document.createElement("img");
        showIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        showIcon.classList.add('forecast-icon');
        icon.appendChild(showIcon);

        //get current temperature
        var currentTemp = data.daily[3].temp.day;
        temp.textContent = "Temperature: " + currentTemp + "F";

        //get current humidity
        var currentHum = data.daily[3].humidity;
        hum.textContent = "Humidity: " + currentHum + "%";

        //get current wind speed
        var currentWind = data.daily[3].wind_speed;
        wind.textContent = "Wind Speed: " + currentWind + " mph";
      })
    };
  });
};

var displayForecastFive = function (data) {
  // vars for day five
  var date = document.querySelector("#five-date");
  var icon = document.querySelector("#five-weather-icon");
  var temp = document.querySelector("#five-temp");
  var hum = document.querySelector("#five-humidity");
  var wind = document.querySelector("#five-wind");

  //get lat and lon from other API
  var lat = data[0].lat;
  var lon = data[0].lon;
  //get weather for day five
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0e363cf8d4f89182d0429ca737e95a95";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //display data in each div
        date.textContent = moment().add(5, 'day').format('L');
        //show icon of weather
        var currentIcon = data.daily[4].weather[0].icon;
        var showIcon = document.createElement("img");
        showIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        showIcon.classList.add('forecast-icon');
        icon.appendChild(showIcon);

        //get current temperature
        var currentTemp = data.daily[4].temp.day;
        temp.textContent = "Temperature: " + currentTemp + "F";

        //get current humidity
        var currentHum = data.daily[4].humidity;
        hum.textContent = "Humidity: " + currentHum + "%";

        //get current wind speed
        var currentWind = data.daily[4].wind_speed;
        wind.textContent = "Wind Speed: " + currentWind + " mph";
      })
    };
  });
};


getLocationName();