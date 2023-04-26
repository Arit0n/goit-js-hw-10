import './css/styles.css';
import { fetchCountries } from '../src/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const listCountry = document.querySelector('.country-list');
const inputCountry = document.querySelector('#search-box');
const infoCountry = document.querySelector('.country-info');

inputCountry.addEventListener(
  'input',
  debounce(e => {
    const trimValue = inputCountry.value.trim();
    cleanHtml();
    console.log(trimValue);
    if (trimValue !== '') {
      fetchCountries(trimValue).then(foundData => {
        console.log(foundData);
        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length < 10) {
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
          renderOneCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div>
  <img src="${country.flags.svg}" alt="${
        country.name.official
      }" width="30" height="20">
  <h1>${country.name.official}</h1>
  <p><b>Capital:</b>${country.capital}</p>
  <p><b>Population:</b>${country.population}</p>
  <p><b>Languages:</b>${Object.values(country.languages)}</p>
</div>`;
    })
    .join('');

  listCountry.innerHTML = markup;
}
function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
  <img src="${country.flags.svg}" alt="${country.name.official}" width="30" height="20">
  <p><b>${country.name.official}</b></p></l>`;
    })
    .join('');
  listCountry.innerHTML = markup;
}
function cleanHtml() {
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';
}
