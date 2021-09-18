import debounce from 'lodash/debounce';
import fetchCountries from './fetchCountries.js'
import refs from './refs.js'


let searchQuery = 'Uk';
const endPoint = '/name';



refs.mainInput.addEventListener('input', debounce(onEnterInput, 500));

function onEnterInput(e) {
    searchQuery = e.target.value;
    let URL = `https://restcountries.eu/rest/v2${endPoint}/${searchQuery}`;
    refs.countriesList.innerHTML = ('');
    fetchCountries(URL);
   
}
