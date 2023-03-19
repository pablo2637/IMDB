const urlBase = process.env.URL_BASE;
const urlAPI = 'api';
const urlMoviesMongo = 'movies/mongo';
const urlMoviesIMDB = '';

const fetchData = (tipo, data) => {
    const body = JSON.stringify(data.body);
    const id = data.params.id || '';
    const query = data.query || '';
    let url = '';
    let options = {};

    switch (tipo) {
        case 'getMovies':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}`;
            break;
        case 'getMovie':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${id}`;
            break;
        case 'postMovie':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            }
            break;
        case 'putMovie':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${id}`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body
            }
            break;
        case 'deleteMovie':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${id}`;
            options = { method: 'DELETE' }
            break;
    }

    return { url, options }
}

module.exports = { fetchData }