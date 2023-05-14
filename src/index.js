import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const inputClean = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

input.addEventListener(
  'input',
  debounce(async event => {
    const name = event.target.value.trim();
    if (name === ' ') {
      inputClean();
      return;
    }
    const countries = await fetchCountries(name);
    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      inputClean();
    } else {
      countryListEl.innerHTML = countries
        .map(
          country =>
            `<li class="inline-item"> <img src="${country.flags.svg}" width="50" height="30" alt ="Flag of ${country.name.official}"/> <p><b>${country.name.official}</b></p></li>`
        )
        .join('');
    }
    if (countries.length === 1) {
      inputClean();
      countryInfoEl.innerHTML = countries
        .map(
          country =>
            `<li class="country-info"> <img src="${
              country.flags.svg
            }" width="100" alt="Flag of ${
              country.name.official
            }"/> <p class= "one-country"><b>${
              country.name.official
            }</b></p>  <p><b>Capital: ${
              country.capital
            }</b></p><p><b>Population: ${
              country.population
            }</b></p> <p><b>Languages: ${Object.values(country.languages).join(
              ', '
            )}</b></p> </li>`
        )
        .join(', ');
    }
  }),
  DEBOUNCE_DELAY
);
