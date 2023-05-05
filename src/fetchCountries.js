export { fetchCountries };
import Notiflix from 'notiflix';

async function fetchCountries(name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  );
  const data = await response.json();

  if (response.status === 404) {
    throw new Error('Oops, there is no country with that name');
  }
  return data;
}
