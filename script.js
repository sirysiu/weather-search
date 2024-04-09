var weatherReport = document.getElementById("weather-report");
var forecast = document.getElementById("forecast");

// Function that clears the Weather report when a user selects a new location
function clearWeatherReport() {
    weatherReport.innerHTML = "";
}

// Function that stores the searched locations by the user. 
function storeSearch(location) {
    var storedLocations = JSON.parse(localStorage.getItem("storedLocations")) || [];

    storedLocations.push(location);

    localStorage.setItem("storedLocations", JSON.stringify(storedLocations));
    displaySearchHistory();

}

// This is the function that gets the Weather Data from the openWeather API. It takes in the Lat and Lon from the storeSearch function, using the geoAPI from openWeather. 
// It then creates the Weather Report section from that data. 
function getWeatherApi(lat, lon) {
    var units = "imperial"
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=' + units + '&appid=66726d07d717ef16f36bc84905667fa1';

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // Code to display the name and Date. Uses dayJS to help format the date from the data. 
            var listName = document.createElement("h2");
            listName.textContent = data.city.name + " " + "(" + dayjs().format('M/D/YYYY') + ")";

            // Code that displays the weather icon to the weather report section
            var iconCode = data.list[0].weather[0].icon;
            var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
            var iconImg = document.createElement("img");
            iconImg.src = iconUrl;
            iconImg.alt = "Weather Icon";

            // Code that displays the temp, wind and humid to the weather report section
            var listTemp = document.createElement("p");
            listTemp.textContent = "Temp: " + data.list[0].main.temp;

            var listWind = document.createElement("p");
            listWind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";

            var listHumid = document.createElement("p");
            listHumid.textContent = "Humidity: " + data.list[0].main.humidity + " %";

            weatherReport.appendChild(listName);
            listName.appendChild(iconImg);
            weatherReport.appendChild(listTemp);
            weatherReport.appendChild(listWind);
            weatherReport.appendChild(listHumid);

            // This is the code that creates the 5 day forecast section
            var forecastHead = document.getElementById("forecast-head")

            function clearForecastHead() {
                forecastHead.innerHTML = "";
            }
            clearForecastHead();
            var fiveDayForecast = document.createElement("h3");
            fiveDayForecast.textContent = "5-Day Forecast:";
            forecastHead.append(fiveDayForecast);

            // TODO: Create cards for 5 day forecast. 
            var forecastCards = document.getElementById("forecast-cards");
            function clearForecastCards() {
                forecastCards.innerHTML = "";
            }
            clearForecastCards();

            // This fore loop creates the  cards. 
            for (let i = 5; i <= 37; i += 8) {



                var dayCard = document.createElement("section");
                dayCard.classList.add("day-card");


                var cardFormatedDate = "(" + data.list[i].dt_txt.slice(5, 7) + "/" + data.list[i].dt_txt.slice(8, 10) + "/" + data.list[i].dt_txt.slice(0, 4) + ")";

                var cardDate = document.createElement("h4");
                cardDate.textContent = cardFormatedDate;

                var cardIconCode = data.list[i].weather[0].icon;
                var cardIconUrl = 'https://openweathermap.org/img/w/' + cardIconCode + '.png';
                var cardIconImg = document.createElement("img");
                cardIconImg.src = cardIconUrl;
                cardIconImg.alt = "Weather Icon";

                var cardListTemp = document.createElement("p");
                cardListTemp.textContent = "Temp: " + data.list[i].main.temp;

                var cardListWind = document.createElement("p");
                cardListWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";

                var cardListHumid = document.createElement("p");
                cardListHumid.textContent = "Humidity: " + data.list[i].main.humidity + " %";

                dayCard.appendChild(cardDate);
                dayCard.appendChild(cardIconImg);
                dayCard.appendChild(cardListTemp);
                dayCard.appendChild(cardListWind);
                dayCard.appendChild(cardListHumid);


                forecastCards.appendChild(dayCard);
            }



            console.log(data)
        })
};


// This is the code that runs the search functionality and the search history.

var locationSearchEl = document.querySelector("#search-box");

// When the user searches a location, we will pull data from the weather API about that locations Lat and Lon, so we can run it through the openWeather API. 
// It also saves this location to local storage.  

var formSubmitHandler = function (event) {
    event.preventDefault();

    var locationSearch = locationSearchEl.value.trim();

    if (locationSearch) {
        storeSearch(locationSearch);
        // This is the code to convert the location name into lon and lat values. 
        var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + locationSearch + "&limit=1&appid=66726d07d717ef16f36bc84905667fa1"

        fetch(geoApiUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                if (data.length > 0) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    clearWeatherReport();
                    getWeatherApi(lat, lon);
                }
                else {
                    console.log("location not found");
                    window.alert("Please try a different location.");
                    
                }
            })
            .catch(function (error) {
                console.log("Error fetching data: ", error);
            });


    } else {
        alert('Please try a different location');
    }
};

var form = document.querySelector('form');
form.addEventListener('submit', formSubmitHandler);






// This is the function that will create the buttons with search history. 
function displaySearchHistory() {
    var previousSearch = JSON.parse(localStorage.getItem("storedLocations"));
    var searchHistory = document.querySelector("#search-history")

    searchHistory.innerHTML = "";


    var endIndex = previousSearch.length;
    var startIndex = Math.max(0, previousSearch.length - 10);
    var uniqueCities = new Set();

    for (var i = endIndex - 1; i >= startIndex; i--) {
        var cityName = previousSearch[i];
        if (cityName && !uniqueCities.has(cityName)) {

            var historyBtn = document.createElement("button");
            historyBtn.classList.add("prev-results-btn")
            historyBtn.value = cityName;
            historyBtn.textContent = cityName;
            attachHoverEffect(historyBtn);

            
            historyBtn.addEventListener("click", function (event) {

                var nameValue = event.target.value;

                if (nameValue) {

                    // This is the code to convert the location name into lon and lat values. 
                    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + nameValue + "&limit=1&appid=66726d07d717ef16f36bc84905667fa1"

                    fetch(geoApiUrl)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (data) {
                            if (data.length > 0) {
                                var lat = data[0].lat;
                                var lon = data[0].lon;
                                // console.log("Latitude:", lat, "Longitude:", lon);
                                clearWeatherReport();
                                getWeatherApi(lat, lon);
                            }
                            else {
                                console.log("location not found");
                            }
                        })
                        .catch(function (error) {
                            console.log("Error fetching data: ", error);
                        });


                } else {
                    alert('Please try a different location');
                }

            });

            searchHistory.appendChild(historyBtn);
            uniqueCities.add(cityName);
        }

        
    }
    
}

displaySearchHistory();


function attachHoverEffect(button) {

    button.addEventListener("mouseover", function () {
        button.style.boxShadow = "0 8px 13px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)";
    })
    button.addEventListener("mouseout", function () {
        button.style.boxShadow = "";
    });
}


// This resets is the code for the reset history button. 
var resetPress = function resetSearchHistory() {
    localStorage.removeItem("storedLocations");
    window.location.reload();
};
var clearPress = document.querySelector("#clear");
clearPress.addEventListener('click', resetPress);