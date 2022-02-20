import './css/styles.css';
import debounce from 'lodash/debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('input#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  debounce(() => {
    fetchCountries(inputRef.value.trim()).then(countries => {
      showCountries(countries);
      return countries;
    });
  }, DEBOUNCE_DELAY),
);

function showCountries(countries) {
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = '';
  if (!countries || countries.length === 0) {
    Notiflix.Notify.failure(`Oops, there is no country with that name.`);
    return 'empty';
  }
  if (countries.length === 1) {
    countryInfoRef.innerHTML = renderCountryInfoMarkup(countries);
    return 'single';
  }
  if (countries.length > 1 && countries.length <= 10) {
    countryListRef.innerHTML = renderCountriesListMarkup(countries);
    return 'list';
  }
  if (countries.length > 10) {
    Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
    return 'toomany';
  }
}

function renderCountriesListMarkup(countries) {
  return countries
    .map(country => {
      return `<div><img src='${country.svg}' width = 25px></img><span class = 'country-item' >${country.official}</span></div>`;
    })
    .join('');
}

function renderCountryInfoMarkup(countries) {
  return countries
    .map(country => {
      return `<div>
        <p><img src='${country.svg}' width = 25px></img><span class='country-title'>${
        country.official
      }</span></p>
      <p><span class='title-item'>Capital:</span> ${country.capital}</p>
      <p><span class='title-item'>Poputation:</span> ${country.population}</p>
      <p><span class='title-item'>Languages:</span> ${Object.values(country.languages).join(
        ', ',
      )}</p>
      </div>`;
    })
    .join('');
}
