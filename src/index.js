import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const clearInput = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

inputEl.addEventListener(
  'input',
  debounce(async event => {
    const countryName = event.target.value.trim();

    if (countryName === ' ') {
      clearInput();
      return;
    }

    const countryArray = await fetchCountries(countryName);
    console.log(Array.isArray(countryArray));

    if (countryArray.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      clearInput();
    } else {
      countryListEl.innerHTML = countryArray
        .map(
          country => `<li  class="inline-item">
          <img src="${country.flags.svg}" width="50" height= "30"alt = "Flag of ${country.name.official}"/>
           <p> <b>${country.name.official}</p></b> </li>
                  `
        )
        .join('');
    }

    if (countryArray.length === 1) {
      clearInput();
      countryInfoEl.innerHTML = countryArray
        .map(
          country =>
            `<li class= "country-info">
    <img  src="${country.flags.svg}" width="100" alt = "Flag of ${
              country.name.official
            }"/>
    <p class = "one-country" ><b> ${country.name.official}</b></p>
    <p><b>Capital:  ${country.capital}</b></p>
    <p><b>Population:  ${country.population}</b></p>
    <p><b>Languages: ${Object.values(country.languages).join(', ')}</b></p>
    </li>`
        )
        .join(', ');
    }
  }),
  DEBOUNCE_DELAY
);
