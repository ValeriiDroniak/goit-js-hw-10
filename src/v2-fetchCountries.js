const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = 'name,capital,population,flags,languages'

export default async function fetchCountries(name) {
    const response = await fetch(`${BASE_URL}/name/${name}?fields=${FILTER}`);
    return await response.json();
}