import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const clearCountries = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

inputEl.addEventListener(
  'input',
  debounce(ev => {
    const name = ev.target.value.trim();

    fetchCountries(name)
      .then(data => renderCountryList(data))
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

function renderCountryList(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    clearCountries();
    showCountries(data);
  } else {
    clearCountries();
    showSingleCountr(data);
  }
}

function showCountries(data) {
  data.forEach(country => {
    const countryEl = document.createElement('li');
    countryEl.innerHTML = `
        <img class='countries__flag'src="${country.flags.svg}" alt='${country.flags.alt}'>
        <p class="countries__name">${country.name.common}</p>`;
    countryEl.classList.add('countries__item');
    countryListEl.append(countryEl);
  });
}

function showSingleCountr(data) {
  const languages = Object.values(data[0].languages).join(', ');
  countryListEl.innerHTML = `<div class="country">
    <img class="country__flag" src="${data[0].flags.svg}" alt="${data[0].flags.alt}">
    <p class="country__name">${data[0].name.common}</p>
    </div>
    <div class="country__desc">Capital: ${data[0].capital}</div>
    <div class="country__desc">Population: ${data[0].population}</div>
    <div class="country__desc">Languages: ${languages}</div>`;
}
