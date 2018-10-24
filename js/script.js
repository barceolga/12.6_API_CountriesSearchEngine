/*jshint esversion: 6*/
//DEFINING VARIABLES

var url = 'https://restcountries.eu/rest/v1/name/';
var url2 = 'https://restcountries.eu/rest/v1/capital/';
var url3 = 'https://restcountries.eu/rest/v1/currency/';
var url4 = 'https://restcountries.eu/rest/v1/lang/';

var countriesList = $('#countries');

$("#search_by").click(searchCountriesBy);

// FUNCTION FOR SEARCHING COUNTRIES

function searchCountriesBy() {
    var countryName = $('#country-attribute').val();
    var countryCapital = $('#country-attribute').val();
    var countryCurrency = $('#country-attribute').val();
    var countryLanguage = $('#country-attribute').val();
    if (!countryCapital.length || !countryCurrency.length || !countryLanguage.length) {
      return;
    }
      switch ($('#mySelectBox option:selected').val()) {
        case "Name":
          var urlCountry = url + countryName;
          $.getJSON(urlCountry, showCountriesList);
          break;
        case "Capital":
          var urlCountry2 = url2 + countryCapital;
          $.getJSON(urlCountry2, showCountriesList);
          break;
        case "Currency":
          if (countryCurrency.length !== 3) {
            var win = window.open('','','width=300,height=100');
            win.document.write("Wrong code. Please enter 3 digit's code, according to ISO 4217 Currency Codes.");
            win.focus();
            setTimeout(function() {win.close();}, 10000);
            return;
          } else {
            var urlCountry3 = url3 + countryCurrency;
            $.getJSON(urlCountry3, showCountriesList);
          }
          break;
        case "Language":
          if (countryLanguage.length > 3 || countryLanguage.length < 2) {
            var wind = window.open('','','width=300,height=100');
            wind.document.write("Wrong code. Please enter 2-3 digit's code, according to ISO 639-1 language code.");
            wind.focus();
            setTimeout(function() {wind.close();}, 10000);
            return;
          } else {
            var urlCountry4 = url4 + countryLanguage;
            $.getJSON(urlCountry4, showCountriesList);
          }
          break;
        default:
          var w = window.open('','','width=200,height=100');
          w.document.write("Please select an option and enter a valid value.");
          w.focus();
          setTimeout(function() {w.close();}, 10000);
      }
}

// FUNCTION FOR DISPLAYING COUNTRIES LIST

function showCountriesList(resp) {
    countriesList.empty();
    resp.forEach(function(item) {
      var countryData = `

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
      `;

      $('<li>').html(countryData).appendTo(countriesList);

// CHANGING STYLES IN COUNTRIES LIST

      $(".countries_list li").
      filter(function( index ) {
        return index % 2 === 0;
      }).css({"color": "#fff", "background-color": "#0039e6"});


      $(".countries_list-special").filter(function( index ) {
        return index % 2 === 0;
      }).css("color", "#fff");

    });
}
searchCountriesBy();
