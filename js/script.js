/*jshint esversion: 6*/
//DEFINING VARIABLES

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

$("#search").click(searchCountries);
$("#sort").click(sortCountriesList);

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
    console.log(resp);
    resp.forEach(function(item) {
      var countryData = `
      <ul class="countries">
       <li>
        <div class="country-name-flag">
            <span class="flag-icon flag-icon-${item.alpha2Code.toLowerCase()}"></span>
            <h3>${item.name}</h3>
        </div>
        <div class="border"></div>
          <ul class="countries_list">
          <li><span class="countries_list-special">Capital: </span>${item.capital}</li>
          <li><span class="countries_list-special">Currency: </span>${item.currencies}</li>
          <li><span class="countries_list-special">Area: </span>${item.area}</li>
          <li><span class="countries_list-special">Population: </span>${item.population}</li>
          <li><span class="countries_list-special">Languages: </span>${item.languages}</li>
          <li><span class="countries_list-special">Region: </span>${item.region}</li>
        </ul>
        <div class="border"></div>
       </li>
      </ul>
      `;

      $('<li>').html(countryData).appendTo(countriesList);
      $('.countries').hide("fast");
      $('.countries').slideDown("slow");

// CHANGING STYLES IN COUNTRIES LIST

      $(".countries_list li").
      filter(function( index ) {
        return index % 2 === 0;
      }).css({"color": "#AA3F39", "background-color": "#68979B"});


      $(".countries_list-special").filter(function( index ) {
        return index % 2 === 0;
      }).css("color", "#AA3F39");

    });
}

function sortCountriesList(countryData) {
  //countriesList.empty();
    var sortedList = countryData.sort(function(a, b) {
      return a.population > b.population;
    });
    console.log(sortedList);
  $('<li>').html(sortedList).appendTo(countriesList);
}

searchCountries();
sortCountriesList()
