var weather = document.getElementById("weather");
var forecast = document.getElementById("forecast");

function storeSearch(location) {
    var storedLocations = JSON.parse(localStorage.getItem("storedLocations")) || [];

    storedLocations.push(location);

    localStorage.setItem("storedLocations", JSON.stringify(storedLocations));
    displaySearchHistory();

} 

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

var locationSearchEl = document.querySelector("#search-box");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var locationSearch = locationSearchEl.value.trim();

    if (locationSearch) {
        storeSearch(locationSearch);
        // This is the code to convert the location name into lon and lat values. 
        var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + locationSearch + "&limit=1&appid=7683dd89e3713c696366aefeb8fa991f"

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

 
function getCityGeoData(city) {
fetch('https://api.openweathermap.org/geo/1.0/direct?appid=66726d07d717ef16f36bc84905667fa1&limit=1&q=Charlotte')
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        console.log(data);
        getGeoWeather(data[0].lat, data[0].lon);
    })
}
getCityGeoData();

