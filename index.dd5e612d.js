var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},t={},o=n.parcelRequireabb0;null==o&&((o=function(n){if(n in e)return e[n].exports;if(n in t){var o=t[n];delete t[n];var i={id:n,exports:{}};return e[n]=i,o.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+n+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(n,e){t[n]=e},n.parcelRequireabb0=o);var i=o("iQIUW");var a=o("50Kfe");const r={searchBox:document.querySelector("#search-box"),countries:document.querySelector(".country-list"),countryInfo:document.querySelector(".country-info")};function l(n){s(),n.length>10?i.Notify.info("Too many matches found. Please enter a more specific name."):function(n){const e=n.map((({name:n,flags:e})=>`\n        <li>\n            <img src="${e.svg}" alt="flag" width="50">\n             ${n.official}\n        </li>`)).join(" ");r.countries.innerHTML=e}(n),1===n.length&&function({capital:n,population:e,languages:t}){const o=`\n    <ul>\n        <li>Capital: <span>${n}</span></li>\n        <li>Population: <span>${e}</span></li>\n        <li>Languages: <span>${Object.values(t)}</span></li>\n    </ul>`;r.countryInfo.innerHTML=o}(n[0])}function s(){r.countries.innerHTML="",r.countryInfo.innerHTML=""}function u(){s(),i.Notify.failure("Oops, there is no country with that name")}r.searchBox.addEventListener("input",a((function(n){const e=n.target.value.trim();e?(t=e,fetch(`https://restcountries.com/v3.1/name/${t}?fields=name,capital,population,flags,languages`).then((n=>{if(n.ok)return n.json();throw new Error(`is not ok: ${n.status}`)}))).then(l).catch(u):s();var t}),300));
//# sourceMappingURL=index.dd5e612d.js.map