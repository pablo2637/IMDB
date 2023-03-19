const {fetchMovies} = require('../helpers/fetchMovies');



//* obstener todas las películas por título
const getMovies = async (req, res) => {

    const titulo = 'inception'; //! pendiente: capturar el valor del input text (buscador) // (req.body…?)
    
    const url = `AdvancedSearch/${process.env.API_IMDB}?title=${titulo}`; // url específica para buscar todas las películas que contengan esa palabra en el título
    //const url = `AdvancedSearch/${process.env.API_KEY}?title=${titulo}`; //* provisional

    const {data} = await fetchMovies(url);

    const {results} = data;

    const arrayMovies = [];

    results.forEach(item => {
        return arrayMovies.push({
            id_movie: item.id,
            title: item.title,
            image: item.image,
            year: item.description,
            directors: item.stars, //? pendiente: filtrar el primer nombre?
            genres: item.genres,
            length: item.runtimeStr
        });
    });



    res.send(arrayMovies); //! pendiente: render

}; //!FUNC-GETMOVIES


//* obtener una película por su id
const getMovie = async (req, res) => {

    const id = 'tt1375666'; //! pendiente: capturar el id // ¿req.body.id o req.params.id? // ¿capturo el id de un botón ("ver más", por ej.) en la página de búsqueda o de la url?
    
    const url = `Title/${process.env.API_IMDB}/${id}`; // url específica para buscar una película en concreto por su id
    //const url = `Title/${process.env.API_KEY}/${id}`; //* provisional

    const {data} = await fetchMovies(url);

    const {id: id_movie, title, image, year, directors, genres, runtimeStr: length, plot, stars: actors, imDbRating: rating} = data;

    const movie = {id_movie, title, image, year, directors, genres, length, plot, actors, rating}; //! pendiente: agregar las opiniones del scrapping



    res.send(movie); //! pendiente: render

}; //!FUNC-GETMOVIE



module.exports = {getMovies, getMovie};