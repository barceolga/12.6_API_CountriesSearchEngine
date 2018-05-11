/*jshint esversion: 6*/
//DEFINING VARIABLES

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

$("#search").click(searchCountries);

// FUNCTION FOR SEARCHING COUNTRIES

function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName.length) {
      countryName = "Spain";
    }
    var urlCountry = url + countryName;
    $.getJSON(urlCountry, showCountriesList);
}

// FUNCTION FOR DISPLAYING COUNTRIES LIST

function showCountriesList(resp) {
    countriesList.empty();
    resp.forEach(function(item) {
      var countryData = `
      <h3>${item.name}</h3>
      <span class="flag-icon flag-icon-${item.alpha2Code.toLowerCase()}"></span>
      <ul class="countries_list">
      <li><span class="countries_list-special">Capital: </span>${item.capital}</li>
      <li><span class="countries_list-special">Currency: </span>${item.currencies}</li>
      <li><span class="countries_list-special">Area: </span>${item.area}</li>
      <li><span class="countries_list-special">Population: </span>${item.population}</li>
      <li><span class="countries_list-special">Languages: </span>${item.languages}</li>
      <li><span class="countries_list-special">Region: </span>${item.region}</li>
      </ul>
      `;

      $('<li>').html(countryData).appendTo(countriesList);

// CHANGING STYLES IN COUNTRIES LIST

      $(".countries_list li").
      filter(function( index ) {
        return index % 2 === 0;
      }).css("color", "#AA3F39");


      $(".countries_list-special").filter(function( index ) {
        return index % 2 === 0;
      }).css("color", "#AA3F39");

    });
}
searchCountries();
