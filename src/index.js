import { info, error, success, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import debounce from 'lodash/debounce';
import fetchCountries from './fetchCountries.js'
import refs from './refs.js'
import templateCard from "./templateCard.hbs"
import templateList from "./templateList.hbs"

const myStack = new Stack({
    dir1: 'up',
    maxOpen: 1,
    maxStrategy: 'close',
    modal: true,
    overlayClose: true
});

const endPoint = '/name';

refs.mainInput.addEventListener('input', debounce(onEnterInput, 1000));

function onEnterInput(e) {
    const searchQuery = e.target.value.trim();
    let URL = `https://restcountries.eu/rest/v2${endPoint}/${searchQuery}`;
    refs.countriesList.innerHTML = '';
    //function to fetch countries
    fetchCountries(URL)
        .then(data => {
        return data;
    })
        .then(array => { 
            if (array.length <= 10 & array.length >= 2) {
                refs.mainInput.disabled = true
                     info({
                    text: "Please, specify search options!",
                    stack: myStack
                     });
                refs.mainInput.disabled = false
                refs.countriesList.insertAdjacentHTML('beforeend', templateList(array));
                return 
            } else if (array.length === 1) {
                refs.mainInput.disabled = true
                success({
                    text: "You found the country!",
                    stack: myStack
                });
                refs.mainInput.disabled = false
                refs.countriesList.insertAdjacentHTML('beforeend', templateCard(array));
                refs.mainInput.value = '';
                return
            } else if (array.length > 10) {
                refs.mainInput.disabled = true
                 error({
            text: "Too many matches found. Please enter a more specific query!",
            stack: myStack
                 });
                refs.mainInput.disabled = false
                 return
        }
        }).catch(error => {
            console.log(error);
        });
}
