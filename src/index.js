import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import debounce from 'lodash/debounce';
import fetchCountries from './fetchCountries.js'
import refs from './refs.js'


let searchQuery = 'Uk';
const endPoint = '/name';

refs.mainInput.addEventListener('input', debounce(onEnterInput, 1000));

function onEnterInput(e) {
    searchQuery = e.target.value;
    let URL = `https://restcountries.eu/rest/v2${endPoint}/${searchQuery}`;
    refs.countriesList.innerHTML = ('');
    fetchCountries(URL);
}
