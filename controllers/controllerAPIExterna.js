const { fetchData } = require('../helpers/fetchData')

// obtener todas las películas de API IMDb por query "title"
const getMovies = async (req, res) => {

    const tipo = 'getMoviesExt';

    const { data } = await fetchData(tipo, req);
    
    const { results } = data;

    const arrayMovies = [];

    results.forEach(item => {
        arrayMovies.push({
            id_movie: item.id,
            title: item.title,
            image: item.image,
            year: item.description,
            directors: item.stars, // pendiente: filtrar el primer nombre (director)
            genres: item.genres,
            runtimeStr: item.runtimeStr
        });
    });


    res.send(arrayMovies); //! pendiente: render

}; //!FUNC-GETMOVIES


// obtener una película de API IMDb por params "movie_id"
const getMovie = async (req, res) => {

    const tipo = 'getMovieExt';

    const { data } = await fetchData(tipo, req);

    const { id: id_movie, title, image, year, directors, genres, runtimeStr, plot, stars, imDbRating } = data;

    const movie = { id_movie, title, image, year, directors, genres, runtimeStr, plot, stars, imDbRating }; //! pendiente: agregar las opiniones del scrapping


    res.send(movie);

}; //!FUNC-GETMOVIE



module.exports = { getMovies, getMovie };