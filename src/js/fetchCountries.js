const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(searchQuery) {
  return fetch(`${baseUrl}`+`${searchQuery}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

// https://restcountries.eu/rest/v2/name/{name}
