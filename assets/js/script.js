var searchFormEl = document.querySelector('#search-form');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit() {

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal;

  var cityAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInputVal + '&limit=1&appid=7a62a0d44214e99149ebe809ba524b67';

  return fetch(cityAPI)
   .then(function (response) {
     return response.json();
   })
   .then(function(cityAPIResponse) {
     // console.log(cityAPIResponse);
     return cityAPIResponse
   })
};

searchFormEl.addEventListener('submit', function(event) {
  event.preventDefault();
  handleSearchFormSubmit()
   .then(function (response) {
      var lat = response[0].lat
      var long = response[0].lon
      
      console.log(lat, long);

      searchApi(lat, long);
   })
});

function searchApi(getLat, getLong) {

       var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + getLat + '&lon=' + getLong + '&appid=7a62a0d44214e99149ebe809ba524b67';
   }

   fetch(weatherApiUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(function (locateResults) {
      console.log(locateResults)
    });