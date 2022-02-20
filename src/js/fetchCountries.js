export { fetchCountries };

function fetchCountries(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        // throw new Error(response.status);
        return [];
      }
      return response.json();
    })
    .then(data => {
      return data.map(value => destructArray(value));
    })
    .catch(error => {
      console.error('Закралась досадная ошибка', error);
      return [];
    });
}

function destructArray(value) {
  const {
    name: { official },
    capital: [capital],
    population,
    flags: { svg },
    languages,
  } = value;
  return { official, capital, population, svg, languages };
}
