import refs from './refs.js'


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
                return `<h1>${elem.name}</h1><p><span>Capital: </span>${elem.capital}</p>
                <p><span>Population: </span>${elem.population}</p><ul><li>${elem.languages}</li></ul>
                <img src="${elem.flag}" alt="${elem.name}"/>`
            }
            
        }).join('')
        console.log(array)
         refs.countriesList.insertAdjacentHTML('beforeend', result);
    });

}