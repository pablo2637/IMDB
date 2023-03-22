const {fetchData} = require('../helpers/fetchData');



const getMovies = async (req, res) => {

    const tipo = 'getMoviesInt';

    const {data} = await fetchData(tipo, req);

    const {movies} = data;


    res.render('../views/admin/dashboard-admin.ejs', {
        movies
    })

}; //!FUNC-GETMOVIES


const mostrarFormularioNueva = async (req, res) => {



}; //!FUNC-MOSTRARFORMULARIONUEVA


const crearMovieNueva = async (req, res) => {



}; //!FUNC-CREARMOVIENUEVA


const mostrarFormularioEditar = async (req, res) => {



}; //!FUNC-MOSTRARFORMULARIOEDITAR


const editarMovie = async (req, res) => {



}; //!FUNC-EDITARMOVIE


const eliminarMovie = async (req, res) => {



}; //!FUNC-ELIMINARMOVIE



module.exports = {
    getMovies,
    mostrarFormularioNueva,
    crearMovieNueva,
    mostrarFormularioEditar,
    editarMovie,
    eliminarMovie
};