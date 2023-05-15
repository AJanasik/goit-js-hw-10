const API_URL = 'https://restcountries.com/v3.1/name';
import Notiflix from 'notiflix';

export const fetchCountries = name => {
  return fetch(
    `${API_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Report.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
};
