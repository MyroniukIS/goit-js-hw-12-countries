import { info, error, success, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import refs from './refs.js'
import template from "./template.hbs"

const myStack = new Stack({
    dir1: 'up',
    maxOpen: 1,
    maxStrategy: 'close',
    modal: true,
    overlayClose: true
});

export default
    function fetchCountries(searchQuery) {
    fetch(searchQuery).then(response => {
        return response.json()
    }).then(data => {
        return data;
    }).then(array => {
        let result = array.map(elem => {
            if (array.length <= 10 & array.length >= 2) {
                     info({
                    text: "Please, specify search options!",
                    stack: myStack
                });           
                
                return `<li class="list-item">${elem.name}</li>`
            }
            
            if (array.length === 1) {
                let markup = template(array);
                success({
                    text: "You found the country!",
                    stack: myStack
                });
                return markup;
            }
           
        }).join('')
        if (array.length > 10) {
            // console.log(array)
            throw error
        }
        refs.countriesList.insertAdjacentHTML('beforeend', result);
    }).catch(error => {
        
            error({
            text: "Too many matches found. Please enter a more specific query!",
            stack: myStack
        });
        
        
    });

}