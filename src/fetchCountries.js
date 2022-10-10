const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = 'name,capital,population,flags,languages'

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=${FILTER}`).then(r => {
        if (!r.ok) {
            throw new Error(`is not ok: ${r.status}`);
        } else {
            return r.json();
        }
    });
}