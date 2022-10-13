'use strict'

/* Пошук ссилки для активної сторінки в браузері з подальшим додаванням  класу модифікатора '--current' */
const refs = {
    homeLink: document.querySelector('nav a[href = "./"]'),
    navLinks: document.querySelectorAll('nav a')
}

function addCurrentForActiveLink({ homeLink, navLinks }) {
    !(/.html$/).test(location.href)
        ? homeLink.classList.add('current')
        : navLinks.forEach(el => {
            if (location.href === el.href) {
                el.classList.add('current');
            }
        })
}

addCurrentForActiveLink(refs);