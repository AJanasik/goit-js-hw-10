export { fetchCountries };
import Notiflix from 'notiflix';

async function fetchCountries(countryName) {
  return await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (response.status === 404) {
        throw new Error(404);
      }

      return response.json();
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
