/*jshint esversion: 6*/
//DEFINING VARIABLES

var url = 'https://restcountries.eu/rest/v1/name/';
var url2 = 'https://restcountries.eu/rest/v1/capital/';
var url3 = 'https://restcountries.eu/rest/v1/currency/';
var url4 = 'https://restcountries.eu/rest/v1/lang/';

var countriesList = $('#countries');

$("#search").click(searchCountries);
$("#search_by").click(searchCountriesBy);

// FUNCTION FOR SEARCHING COUNTRIES

function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName.length) {
      countryName = "Spain";
    }
    var urlCountry = url + countryName;
    $.getJSON(urlCountry, showCountriesList);
}

function searchCountriesBy() {
    var countryCapital = $('#country-attribute').val();
    var countryCurrency = $('#country-attribute').val();
    var countryLanguage = $('#country-attribute').val();
    if (!countryCapital.length || !countryCurrency.length || !countryLanguage.length) {
      return;
    }
    $('#mySelectBox option').each(function() {
    if($('#capital').is(':selected')) {
      var urlCountry2 = url2 + countryCapital;
      $.getJSON(urlCountry2, showCountriesList);
    } else if ($('#currency').is(':selected')) {
      var urlCountry3 = url3 + countryCurrency;
      $.getJSON(urlCountry3, showCountriesList);
    } else if($('#language').is(':selected')) {
      var urlCountry4 = url4 + countryLanguage;
      $.getJSON(urlCountry4, showCountriesList);
    }
  });

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
          <li><span class="countries_list-special">Language(s): </span>${item.languages}</li>
          <li><span class="countries_list-special">Region: </span>${item.region}</li>
        </ul>
        <div class="border"></div>
       </li>
      </ul>
      `;

      $('<li>').html(countryData).appendTo(countriesList);

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
searchCountries();
searchCountriesBy();
