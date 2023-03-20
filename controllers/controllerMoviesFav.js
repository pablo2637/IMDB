const {fetchData} = require('../helpers/fetchData');


const getMoviesFav = async (req, res) => {

    //* tengo que hacer un req del id del usuario para hacer el fetch en MongoDB


    res.send('Probando desde getMoviesFav');

}; //!FUNC-GETMOVIESFAV


const guardarMovieFav = async (req, res) => {

    console.log('Probando desde guardarMovieFav')

}; //!FUNC-GUARDARMOVIEFAV



const eliminarMovieFav = async (req, res) => {


    res.send('Probando desde eliminarMovieFav')
    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-ELIMINARMOVIEFAV



module.exports = {
    getMoviesFav,
    guardarMovieFav,
    eliminarMovieFav
};