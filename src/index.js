import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const INFO_MESSAGE = 'Too many matches found. Please enter a more specific name.';
const ERROR_MESSAGE = 'Oops, there is no country with that name';
const refs = {
    searchBox: document.querySelector('#search-box'),
    countries: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    const searchText = evt.target.value.trim();
    if (!searchText) {
        removeMarkup();
    } else {
        fetchCountries(searchText)
            .then(renderSearchCountry)
            .catch(onFetchError);
    }


}

function renderSearchCountry(countries) {
    removeMarkup();
    if (countries.length > 10) {
        Notify.info(INFO_MESSAGE);
    } else {
        markupListCountries(countries);
    }

    if (countries.length === 1) {
        markupCountryInfo(countries[0]);
    }
}

function markupListCountries(countries) {
    const markup = countries.map(({ name, flags }) => {
        return `
        <li>
            <img src="${flags.svg}" alt="flag" width="50">
             ${name.official}
        </li>`
    }).join(' ');

    refs.countries.innerHTML = markup;
}

function markupCountryInfo({ capital, population, languages }) {
    const markup = `
    <ul>
        <li>Capital: <span>${capital}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>Languages: <span>${Object.values(languages)}</span></li>
    </ul>`;

    refs.countryInfo.innerHTML = markup;
}

function removeMarkup() {
    refs.countries.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function onFetchError() {
    Notify.failure(ERROR_MESSAGE);
} 