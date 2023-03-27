const urlBase = process.env.URL_BASE;
const urlAPI = 'api';
const urlApiKeyIMDB = process.env.API_IMDB;
const urlMoviesMongo = 'movies/mongo';
// const urlMoviesIMDB = 'movies/imdb';
const urlBaseIMDB = 'https://imdb-api.com/API';
const urlDashboardUser = 'dashboard-usuario'
const urlAPIKeyAlternativa = process.env.API_KEY_ALEON; // IMDb API key alternativa para seguir haciendo pruebas

const fetchData = async (tipo, data) => {
    const body = data.body;
    const bodyJSON = JSON.stringify(data.body);
    const params = data.params || '';
    const query = data.query || '';
    let url = '';
    let options = {};

    console.log(params, query, body);

    switch (tipo) {

        //API interna: MongoDB **************************************************
        case 'getMoviesInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}`;
            break;
        case 'getMovieInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${params.id}`;
            break;
        case 'postMovieInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: bodyJSON
            }
            break;
        case 'putMovieInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${params.id}`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: bodyJSON
            }
            break;
        case 'deleteMovieInt':
            url = `${urlBase}/${urlAPI}/${urlMoviesMongo}/${params.id}`;
            options = { method: 'DELETE' }
            break;
        

        //API externa: IMDb **************************************************
        case 'getMoviesExt':
            //url = `${urlBaseIMDB}/AdvancedSearch/${urlApiKeyIMDB}?title=${query.title}`; // busca por query "title"
            url = `${urlBaseIMDB}/AdvancedSearch/${urlAPIKeyAlternativa}?title=${query.title}`; // ruta con API key alternativa para pruebas
            break;
        case 'getMovieExt':            
            //url = `${urlBaseIMDB}/Title/${urlApiKeyIMDB}/${params.movie_id}`; // busca por params "movie_id"
            url = `${urlBaseIMDB}/Title/${urlAPIKeyAlternativa}/${params.movie_id}`; // ruta con API key alternativa para pruebas
            break;
    };

    //Fetch
    try {
        const request = await fetch(url, options);
        const response = await request.json();
        if (!response) return {
            ok: false,
            msg: 'Error fetchData',
            response
        };

        return {
            ok: true,
            data: response
        };
    } catch (e) {
        console.log('error', e)
        return {
            ok: false,
            error: e
        };
    };
};

module.exports = { fetchData };