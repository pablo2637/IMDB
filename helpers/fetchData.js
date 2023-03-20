const urlBase = process.env.URL_BASE;
const urlAPI = 'api';
const urlApiKeyIMDB = process.env.API_IMDB;
const urlMoviesMongo = 'movies/mongo';
// const urlMoviesIMDB = 'movies/imdb';
const urlBaseIMDB = 'https://imdb-api.com/API';

const fetchData = async (tipo, data) => {
    const body = data.body;
    const bodyJS = JSON.stringify(data.body);
    const id = data.params.id || '';
    const query = data.query || '';
    let url = '';
    let options = {};

    switch (tipo) {

        //API interna mongo **************************************************
        case 'getMoviesInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}`;
            break;
        case 'getMovieInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${id}`;
            break;
        case 'postMovieInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                bodyJS
            }
            break;
        case 'putMovieInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${id}`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                bodyJS
            }
            break;
        case 'deleteMovieExt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${id}`;
            options = { method: 'DELETE' }
            break;


        //Api externa imdb **************************************************
        case 'getMoviesExt':
            url = `${urlBaseIMDB}/AdvancedSearch/${urlApiKeyIMDB}?title=${body}`; //pendiente de verificar body
            break;
        case 'getMovieExt':
            url = `${urlBaseIMDB}/Title/${urlApiKeyIMDB}/${id}`; //pendiente de verificar id
            break;
    }


    try {
        const request = await fetch(url, options);
        const response = await request.json();
        if (!response) return {
            ok: false,
            msg: 'Error fetchData',
            response
        }

        return {
            ok: true,
            data: response
        }
    } catch (e) {
        console.log('error', e)
        return {
            ok: false,
            error: e
        }
    }
}

module.exports = { fetchData }