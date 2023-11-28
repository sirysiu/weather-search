var locSearchForm = document.querySelector('#loc-search');
var qInput = document.querySelector('#q');
var formatInput = document.querySelector('#format');
var termSpan = document.querySelector('#term');

function getGeoWeather(lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?appid=66726d07d717ef16f36bc84905667fa1&lat='+ lat +'&lon=' + lon +'&units=imperial')
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
};
 

 
function getCityGeoData(city) {
fetch('http://api.openweathermap.org/geo/1.0/direct?appid=66726d07d717ef16f36bc84905667fa1&limit=1&q=Charlotte')
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        console.log(data);
        getGeoWeather(data[0].lat, data[0].lon);
    })
}
getCityGeoData();

function handleSearch(event) {
  event.preventDefault();
  var format = formatInput.value;
  var q = qInput.value;
  var type = 'search';
  if (format) {
    type = format;
  }
}