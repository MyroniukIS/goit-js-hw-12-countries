export default function fetchCountries(searchQuery) {
    if (searchQuery) {
        return fetch(searchQuery)
            .then(response => {
            if (response.ok) return response.json();
            throw new Error('ERROR fetching data');
            })
    }
}