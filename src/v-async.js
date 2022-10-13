import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './v2-fetchCountries';
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

async function onSearch(evt) {
    const searchText = evt.target.value.trim();

    if (!searchText) {
        removeMarkup();
    } else {
        try {
            const countries = await fetchCountries(searchText);

            renderSearchCountry(countries);
        } catch (error) {
            onFetchError();
        }
    }
}

function renderSearchCountry(countries) {
    removeMarkup();

    if (countries.length > 10) {
        Notify.info(INFO_MESSAGE);
    } else {
        refs.countries.innerHTML = markupListCountries(countries);
    }

    if (countries.length === 1) {
        refs.countryInfo.innerHTML = markupCountryInfo(countries[0]);
    }
}

function markupListCountries(countries) {
    return countries.map(({ name, flags }) => {
        return `
        <li>
            <img src="${flags.svg}" alt="flag" width="50">
             ${name.official}
        </li>`
    }).join(' ');
}

function markupCountryInfo({ capital, population, languages }) {
    return `
    <ul>
        <li>Capital: <span>${capital}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>Languages: <span>${Object.values(languages)}</span></li>
    </ul>`;
}

function removeMarkup() {
    refs.countries.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function onFetchError() {
    Notify.failure(ERROR_MESSAGE);
} 