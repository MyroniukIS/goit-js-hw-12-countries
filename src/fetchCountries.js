import refs from './refs.js'


export default
    function fetchCountries(searchQuery) {
    fetch(searchQuery).then(response => {
        return response.json()
    }).then(data => {
        return data;
    }).then(array => {
        let result = array.map(elem => {
            return `<li>${elem.name}</li>`
        }).join('')
        
         refs.countriesList.insertAdjacentHTML('beforeend', result);
    });

}