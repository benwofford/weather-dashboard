var searchFormEl = document.querySelector('#search-form');
var resultContentEl = document.querySelector('#result-content');

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
      console.log(response);
      if (!response.length) {
        console.log('Please try again!'); // TODO: add alert?
        resultContentEl.innerHTML = '<h3>No results found, please reformat your search.<h3>';
      } else {
        var lat = response[0].lat
        var long = response[0].lon
        
        console.log(lat, long);
  
        searchApi(lat, long);
      }
   })
});

function searchApi(getLat, getLong) {

       var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + getLat + '&lon=' + getLong + '&appid=7a62a0d44214e99149ebe809ba524b67';

   fetch(weatherApiUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function (locateResults) {
      console.log(locateResults)
      return locateResults;
    })
    .then(function (locateResults) {
      resultContentEl.textContent = locateResults.searchInputVal;

      console.log(locateResults);

        resultContentEl.textContent = '';
        for (var i =1; i <= 5; i++) {
          showWeather(locateResults.daily[i]);
        }
        showToday(locateResults.daily[0]);

    })
    .catch(function (error) {
      console.error(error);
      console.log('Please try again!');
      resultContentEl.innerHTML = '<h3>No results found.<h3>';
    });
};

function showToday(resultObj) {
  
  var todayCard = document.createElement('div');
todayCard.classList.add('card', 'bg-dark', 'text-light', 'today-card');

var todayWeatherBody = document.createElement('div');
todayWeatherBody.classList.add('card-body');

  var todayTitleEl = document.createElement('h1');
  var d = new Date(resultObj.dt * 1000);
todayTitleEl.textContent = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

  var iconTodayEl = document.createElement('img');

    iconTodayEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + resultObj.weather[0].icon + '@2x.png')

  var todayBodyContentEl = document.createElement('ul');
todayBodyContentEl.innerHTML = 
        '<li>Temp: ' + resultObj.temp.max + '</li>' +
        '<li>Wind: ' + resultObj.wind_speed + '</li>' +
        '<li>Humidity: ' + resultObj.humidity + '</li>' +
        '<li>UV Index: ' + resultObj.uvi + '</li>'  // fix color indication

    todayWeatherBody.append(todayTitleEl, iconTodayEl, todayBodyContentEl);
    todayCard.append(todayWeatherBody);

    resultContentEl.append(todayCard); 

}

function showWeather(resultObj) {
  console.log(resultObj);

  var currentWeatherCard = document.createElement('div');
currentWeatherCard.classList.add('card', 'bg-dark', 'text-light', 'mb-3', 'p-3', 'five-day-card');

  var currentWeatherBody = document.createElement('div');
currentWeatherBody.classList.add('card-body');

  var titleEl = document.createElement('h2');
  var d = new Date(resultObj.dt * 1000);
titleEl.textContent = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

  var iconEl = document.createElement('img');

    iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + resultObj.weather[0].icon + '@2x.png')

  var bodyContentEl = document.createElement('ul');
bodyContentEl.innerHTML = 
        '<li>Temp: ' + resultObj.temp.max + '</li>' +
        '<li>Wind: ' + resultObj.wind_speed + '</li>' +
        '<li>Humidity: ' + resultObj.humidity + '</li>' +
        '<li>UV Index: ' + resultObj.uvi + '</li>'  // fix color indication

    currentWeatherBody.append(titleEl, iconEl, bodyContentEl);
    currentWeatherCard.append(currentWeatherBody);

    resultContentEl.append(currentWeatherCard);
    
};

// currentWeatherCard.prepend(todayCard); -- Y U NO WORK >:(