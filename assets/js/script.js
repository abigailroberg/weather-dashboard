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
var temp1El = document.querySelector("#temp-1");
var wind1El = document.querySelector("#wind-1");
var humid1El = document.querySelector("#humid-1");

var temp2El = document.querySelector("#temp-2");
var wind2El = document.querySelector("#wind-2");
var humid2El = document.querySelector("#humid-2");

var temp3El = document.querySelector("#temp-3");
var wind3El = document.querySelector("#wind-3");
var humid3El = document.querySelector("#humid-3");

var temp4El = document.querySelector("#temp-4");
var wind4El = document.querySelector("#wind-4");
var humid4El = document.querySelector("#humid-4");

var temp5El = document.querySelector("#temp-5");
var wind5El = document.querySelector("#wind-5");
var humid5El = document.querySelector("#humid-5");

// current weather variables
var currentTemp = "";
var currentWind = "";
var currentHumid = "";
var currentUV = "";

// daily forecast object array
var dailyForecast = [
    {
        "temp": "",
        "wind": "",
        "humid": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
    },
    {
        "temp": "",
        "wind": "",
        "humid": "",
    }
]

// function to get lat/long of given city

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
    var apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely&appid=e76cfd847a87e984b00da68d202f4233";
    
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){
            for(var i = 1; i < dailyForecast.length + 1; i++) {
                dailyForecast[i-1].temp = data.daily[i].temp.day;
                dailyForecast[i-1].wind = data.daily[i].wind_speed;
                dailyForecast[i-1].humid = data.daily[i].humidity;
            }
            displayForecast();
        });
    })
}

var displayForecast = function() {

    temp1El.textContent = dailyForecast[0].temp;
    wind1El.textContent = dailyForecast[0].wind;
    humid1El.textContent = dailyForecast[0].humid;

    temp2El.textContent = dailyForecast[1].temp;
    wind2El.textContent = dailyForecast[1].wind;
    humid2El.textContent = dailyForecast[1].humid;

    temp3El.textContent = dailyForecast[2].temp;
    wind3El.textContent = dailyForecast[2].wind;
    humid3El.textContent = dailyForecast[2].humid;

    temp4El.textContent = dailyForecast[3].temp;
    wind4El.textContent = dailyForecast[3].wind;
    humid4El.textContent = dailyForecast[3].humid;

    temp5El.textContent = dailyForecast[4].temp;
    wind5El.textContent = dailyForecast[4].wind;
    humid5El.textContent = dailyForecast[4].humid;
}

var displayCityDate = function(event) {
    event.preventDefault();

    var inputCity = cityInputEl.value.trim();
    displayCityEl.textContent = inputCity;

    getLatLong(inputCity);
}

var getLatLong = function(city) {
    var apiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=1&appid=e76cfd847a87e984b00da68d202f4233";

    fetch(apiCall).then(function(response) {
        response.json().then(function(data) {
            var lat = data[0].lat;
            var long = data[0].lon;

            getForecast(lat, long);
            getWeather(lat, long);
        })
    })
}

// event listener for search
searchBtnEl.addEventListener("click", displayCityDate);