const {fetchMovies} = require('../helpers/fetchMovies');

//* obstener todas las películas por título
const getMovies = async (req, res) => {

    //const titulo = //! tengo que capturar el valor del input text (buscador) para pasárselo a la const url

    const url = `AdvancedSearch/k_9yd5ebs9?title=${titulo}`; // url específica para buscar todas las películas que contengan esa palabra en el título


    const {data} = await fetchMovies();

    const [{id, title, image, description, stars, genres, runtimeStr}] = data; //! de la propiedad 'stars' solo quiero el valor en su posición [0], que es la que corresponde al director

    const movies = [{id, title, image, description, stars, genres, runtimeStr}]; //! me enseña solo el primer objeto, por lo que habría que recorrer el array completo



    res.send({
        movies //* para ver el JSON en el navegador
    });

}; //!FUNC-GETMOVIES


//* obtener una película por su id
const getMovie = (req, res) => {

    const url = `Title/k_9yd5ebs9/${id}`; // url específica para buscar una película en concreto por su id

}; //!FUNC-MOVIE


module.exports = {getMovies, getMovie};