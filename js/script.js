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
    $('#mySelectBox option').each(function() {
    if($("#name").is(':selected')) {
      if (!countryName.length) {
        countryName = "Spain";
      }
      var urlCountry = url + countryName;
      $.getJSON(urlCountry, showCountriesList);
    } else if($('#capital').is(':selected')) {
      var urlCountry2 = url2 + countryCapital;
      $.getJSON(urlCountry2, showCountriesList);
    } else if ($('#currency').is(':selected')) {
      if (countryCurrency.length !== 3) {
        alert ("Bad code. Please enter 3 digit's code according to ISO 4217 Currency Codes.");
        return;
      } else {
        var urlCountry3 = url3 + countryCurrency;
        $.getJSON(urlCountry3, showCountriesList);
      }
    } else if($('#language').is(':selected')) {
      if (countryLanguage.length > 3) {
        alert ("Code is too long. Please enter upt to 3 digit according to ISO 639-1 language code.");
        return;
      } else {
        var urlCountry4 = url4 + countryLanguage;
        $.getJSON(urlCountry4, showCountriesList);
      }

    }
  });

}

// FUNCTION FOR DISPLAYING COUNTRIES LIST

function showCountriesList(resp) {
    countriesList.empty();
    console.log(resp);
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
