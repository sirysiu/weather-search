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
        var resultsContainer = document.querySelector('.results');
        console.log(data);
        // <div class="card" style="width: 18rem;">
        // <img src="..." class="card-img-top" alt="...">
        // <div class="card-body">
        //   <h5 class="card-title">Card title</h5>
        //   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        // </div>
        for (var result of data.results) {
            var cardEl = document.createElement('div');
            cardEl.classList.add('card');

            var cardBodyEl = document.createElement('div');
            cardBodyEl.classList.add('card-body');

            var h5El = document.createElement('h5');
            h5El.classList.add('card-title');
            h5El.textContent = result.title;

            var pEl = document.createElement('p');
            pEl.classList.add('card-text');
            pEl.textContent = result.description.toString();


            resultsContainer.appendChild(cardEl);
            cardEl.appendChild(cardBodyEl);
            cardBodyEl.append(h5El, pEl);
    }

});
}
 

 
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

