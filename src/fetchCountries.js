import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import refs from './refs.js'
import template from "./template.hbs"


export default
    function fetchCountries(searchQuery) {
    fetch(searchQuery).then(response => {
        return response.json()
    }).then(data => {
        return data;
    }).then(array => {
        let result = array.map(elem => {
            if (array.length <= 10 & array.length >= 2) {
                return `<li class="list-item">${elem.name}</li>`
            }
            if (array.length === 1) {
                let markup = template(array);
                return markup;
            }
           
        }).join('')
        // console.log(array)
        refs.countriesList.insertAdjacentHTML('beforeend', result);
    }).catch(err => {
        // alert ("nono")
        if (err.message === "404") {
            error({
                text: 'Too many matches found. Please enter a more specific query!',
            })
        }
    });

}