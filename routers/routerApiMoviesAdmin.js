const express = require('express');
const router = express.Router();

const {
    getMovies,
    getMovie,
    postMovie,
    putMovie,
    deleteMovie } = require('../controllers/controllerApiMoviesAdmin');


//Faltan validaciones una vez que tengamos el middleware

router.get('/', getMovies);                 //Trae todas las películas

router.get('/:id', getMovie);               //Trae una película

router.post('/', postMovie);                //Crea una nueva película

router.put('/:id', putMovie);               //Modifica la película

router.delete('/:id', deleteMovie);         //Borra la película

module.exports = router;