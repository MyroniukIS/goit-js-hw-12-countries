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
            if (array.length <= 10 & array.length >=2) {
                return `<li>${elem.name}</li>`
            }
            if (array.length === 1) {
                console.log(array)
                let markup = template(array);
                return markup;
            }
            
        }).join('')
        console.log(array)
         refs.countriesList.insertAdjacentHTML('beforeend', result);
    });

}