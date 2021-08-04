var dateEl = document.querySelector("#date");
var displayCityEl = document.querySelector("#selected-city");
var cityInputEl = document.querySelector("#city");
var searchBtnEl = document.querySelector("#search");

// current weather div
var currentWeatherEl = document.querySelector("#current-weather")

// forecast div
var forecastEl = document.querySelector("#forecast-cards");

// current weather variables
var currentCity = "";
var currentDate = "";
var currentIcon = "";
var currentTemp = "";
var currentWind = "";
var currentHumid = "";
var currentUV = "";

// daily forecast object array for 5 days
var dailyForecast = [
    {
        "date": "",
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "date": "",
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "date": "",
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "date": "",
        "temp": "",
        "wind": "",
        "humid": "",
        "icon": "",
    },
    {
        "date": "",
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
            currentDate = data.current.dt;
            currentIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
            console.log(currentIcon);
            displayCurrentWeather(data.current.uvi);
        });
    })
}

// function to display current day weather

var displayCurrentWeather = function(Uvi) {
    // format the date
    formatDate();
    // set the heading
    var currentHeadingEl = document.createElement("h3");
    currentHeadingEl.textContent = currentCity + " " + currentDate;
    displayCityEl.textContent = displayCityEl.textContent + " " + currentDate;
    // set the icon
    var currentIconEl = document.createElement("img");
    currentIconEl.classList = "currentIcon";
    currentIconEl.src = currentIcon;
    // create row for header and icon
    var headerEl = document.createElement("div");
    headerEl.classList = "row weather-heading";
    headerEl.appendChild(currentHeadingEl);
    headerEl.appendChild(currentIconEl);
    // set content elements
    var currentTempEl = document.createElement("p");
    currentTempEl.textContent = "Temp: " + currentTemp + "°F";
    var currentWindEl = document.createElement("p");
    currentWindEl.textContent = "Wind: " + currentWind + " MPH";
    var currentHumidEl = document.createElement("p");
    currentHumidEl.textContent = "Humidity: " + currentHumid + "%";
    var currentUvEl = document.createElement("p");
    currentUvEl.textContent = "UV Index: " + currentUV;
    // set UVI background color 
    if (Uvi > 6) {
        currentUvEl.classList = "bg-danger text-white";
    }
    else if (Uvi > 3) {
        currentUvEl.className = "bg-warning";
    }
    else {
        currentUvEl.classList = "bg-success text-white";
    }

    // format div
    currentWeatherEl.classList = "border border-dark col-10"

    // append content to div
    currentWeatherEl.appendChild(headerEl);
    currentWeatherEl.appendChild(currentTempEl);
    currentWeatherEl.appendChild(currentWindEl);
    currentWeatherEl.appendChild(currentHumidEl);
    currentWeatherEl.appendChild(currentUvEl);
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
                dailyForecast[i-1].date = data.daily[i].dt;
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
    // create & add forecast heading
    var fcstHeadingEl = document.createElement("div");
    fcstHeadingEl.classList = "row"
    var fcstH3El = document.createElement("h3");
    fcstH3El.textContent = "5 Day Forecast:"
    fcstHeadingEl.appendChild(fcstH3El);
    forecastEl.appendChild(fcstHeadingEl);
    // call function to format dates
    formatDates();

    // create row for cards 
    var cardRowEl = document.createElement("div");
    cardRowEl.className = "row";
    cardRowEl.setAttribute("id", "fcst-row");

    // loop through dailyForecast array 
    for(var i=0; i<dailyForecast.length; i++) {
        // create card for each day of the forecast
        var cardEl = document.createElement("div");
        cardEl.classList = "card col-2 text-white days";
        // set header for card
        var dateEl = document.createElement("h3");
        dateEl.textContent = dailyForecast[i].date;
        dateEl.classList ="fcstDate";
        // set content elements of card
        var iconEl = document.createElement("img");
        iconEl.classList = "fcstIcon";
        iconEl.src = dailyForecast[i].icon;
        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + dailyForecast[i].temp + "°F";
        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + dailyForecast[i].wind + " MPH";
        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + dailyForecast[i].humid + "%";

        // build rows for card
        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList = "card-body";

        var dateRowEl = document.createElement("div");
        dateRowEl.classList = "row";
        dateRowEl.appendChild(dateEl);

        var iconRowEl = document.createElement("div");
        iconRowEl.classList = "row";
        iconRowEl.appendChild(iconEl);

        var tempRowEl = document.createElement("div");
        tempRowEl.classList = "row";
        tempRowEl.appendChild(tempEl);

        var windRowEl = document.createElement("div");
        windRowEl.classList = "row";
        windRowEl.appendChild(windEl);

        var humidRowEl = document.createElement("div");
        humidRowEl.classList = "row";
        humidRowEl.appendChild(humidEl);

        // append elements to card
        cardBodyEl.appendChild(dateRowEl);
        cardBodyEl.appendChild(iconRowEl);
        cardBodyEl.appendChild(tempRowEl);
        cardBodyEl.appendChild(windRowEl);
        cardBodyEl.appendChild(humidRowEl);

        cardEl.appendChild(cardBodyEl);

        cardRowEl.appendChild(cardEl);

        // append card to div
        forecastEl.appendChild(cardRowEl);
    }
}

var displayCity = function(event) {
    event.preventDefault();

    // clear previous weather
    currentWeatherEl.innerHTML = "";
    // clear previous forecast
    forecastEl.innerHTML = "";

    // display & search for city 
    var inputCity = cityInputEl.value.trim();
    currentCity = inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
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
            getWeather(lat, long);
            getForecast(lat, long);
        })
    })
}

var formatDate = function() {
    let date = new Date(currentDate * 1000);
    date = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
    let dateStg = "(" + date + ")"
    currentDate = dateStg;
}

var formatDates = function() {
    for(var i=0; i<dailyForecast.length; i++) {
        let date = new Date(dailyForecast[i].date * 1000);
        date = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
        dailyForecast[i].date = date;
    }
}

// event listener for search
searchBtnEl.addEventListener("click", displayCity);