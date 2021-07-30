// time and place elements
var dateEl = document.querySelector("#date");
var displayCityEl = document.querySelector("#selected-city");
//var cityEl = document.querySelector("#city");
var cityInputEl = document.querySelector("#city");
var searchBtnEl = document.querySelector("#search");

// current weather elements
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidEl = document.querySelector("#current-humid");
var currentUvEl = document.querySelector("#current-uv");

// forecast elements
var forecastEl = document.querySelector("#forecast-cards");

// current weather variables
var currentTemp = "";
var currentWind = "";
var currentHumid = "";
var currentUV = "";

// daily forecast object array for 5 days
var dailyForecast = [
    {
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    }
]

// function to get current weather from Open Weather Api for a given lat/long

var getWeather = function(lat, long) {
    var apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely&appid=e76cfd847a87e984b00da68d202f4233";
    
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){
            currentTemp = data.current.temp;
            currentWind = data.current.wind_speed;
            currentHumid = data.current.humidity;
            currentUV = data.current.uvi;
            displayCurrentWeather();
        });
    })
}

// function to display current day weather

var displayCurrentWeather = function() {
    currentTempEl.textContent = currentTemp;
    currentWindEl.textContent = currentWind;
    currentHumidEl.textContent = currentHumid;
    currentUvEl.textContent = currentUV;
}

// function to get 5-day forecast
var getForecast = function(lat,long) {
    //set url to fetch
    var apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely&appid=e76cfd847a87e984b00da68d202f4233";
    
    // call open weather api for forecast data
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){
            // set forecast variables to correct api data
            for(var i = 1; i < dailyForecast.length + 1; i++) {
                dailyForecast[i-1].temp = data.daily[i].temp.day;
                dailyForecast[i-1].wind = data.daily[i].wind_speed;
                dailyForecast[i-1].humid = data.daily[i].humidity;
                dailyForecast[i-1].icon = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
            }
            // call function to display the forecast
            displayForecast();
        });
    })
}

var displayForecast = function() {
    // loop through dailyForecast array 
    for(var i=0; i<dailyForecast.length; i++) {
        // create card for each day of the forecast
        var cardEl = document.createElement("div");
        cardEl.classList = "card col-2 text-white days";
        //TO DO: add header to card
        
        // set content elements of card
        var iconEl = document.createElement("img");
        iconEl.src = dailyForecast[i].icon;
        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + dailyForecast[i].temp + "°F";
        tempEl.className = "card-body";
        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + dailyForecast[i].wind + "MPH";
        windEl.className = "card-body";
        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + dailyForecast[i].humid + "%";
        windEl.className = "card-body";

        // append elements to card
        cardEl.appendChild(iconEl);
        cardEl.appendChild(tempEl);
        cardEl.appendChild(windEl);
        cardEl.appendChild(humidEl);

        // append card to div
        forecastEl.appendChild(cardEl);
    }
}

var displayCity = function(event) {
    event.preventDefault();

    // clear previous forecast
    forecastEl.innerHTML = "";

    // display & search for city 
    var inputCity = cityInputEl.value.trim();
    displayCityEl.textContent = inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
    getLatLong(inputCity);
}

var getLatLong = function(city) {

    // set url to fetch
    var apiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=1&appid=e76cfd847a87e984b00da68d202f4233";

    // call OpenWeather API to get latitude & longitude of desired city
    fetch(apiCall).then(function(response) {
        response.json().then(function(data) {
            var lat = data[0].lat;
            var long = data[0].lon;

            // get the current weather and forecast for the latitude and longitude given
            getForecast(lat, long);
            getWeather(lat, long);
        })
    })
}

var displayDates = function() {
    console.log("clicked");

    
}

// event listener for search
searchBtnEl.addEventListener("click", displayCity);