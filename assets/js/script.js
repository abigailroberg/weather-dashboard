var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidEl = document.querySelector("#current-humid");
var currentUvEl = document.querySelector("#current-uv");

var currentTemp = "";
var currentWind = "";
var currentHumid = "";
var currentUV = "";

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

// function to display 5-day forecast
var getForecast = function(lat,long) {
    var apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely&appid=e76cfd847a87e984b00da68d202f4233";
    
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){
            console.log(data.daily);
            for(var i = 1; i < dailyForecast.length + 1; i++) {
                dailyForecast[i-1].temp = data.daily[i].temp.day;
                dailyForecast[i-1].wind = data.daily[i].wind_speed;
                dailyForecast[i-1].humid = data.daily[i].humidity;
            }
            console.log(dailyForecast);
        });
    })
}

//getWeather(30.26, -97.74);
getForecast(30.26, -97.74);