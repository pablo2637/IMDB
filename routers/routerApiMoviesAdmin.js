const express = require('express');
const router = express.Router();
const { check } = require("express-validator")
const { validarInputs } = require("../middlewares/validarInputs")

const {
    getMovies,
    getMovie,
    postMovie,
    putMovie,
    deleteMovie,
    getMovieTitle } = require('../controllers/controllerApiMoviesAdmin');


//Faltan validaciones una vez que tengamos el middleware

router.get('/', getMovies);                 //Trae todas las películas

router.get('/:id', getMovie);               //Trae una película

router.get('/title/:title', getMovieTitle);               //Trae una película


router.post('/', [
 
    check('title').notEmpty().withMessage('El campo título es obligatorio'),
    check('year').notEmpty().withMessage('El campo año es obligatorio'),
    check('directors').notEmpty().withMessage('El campo director es obligatorio'),
    check('stars').notEmpty().withMessage('El campo actores principales es obligatorio'),
    check('genres').notEmpty().withMessage('El campo género es obligatorio'),
    // check('runtimeStr').notEmpty().withMessage('El campo duración es obligatorio'),
    check('plot').notEmpty().withMessage('El campo sinopsis es obligatorio'),
    check('imdbRating').notEmpty().withMessage('El campo calificación es obligatorio'),
    check('opinion').notEmpty().withMessage('El campo opinión es obligatorio'),
    check('fecha').notEmpty().withMessage('El campo fecha es obligatorio'),
    check('escritor').notEmpty().withMessage('El campo escritor es obligatorio'),
  

validarInputs
], postMovie);                //Crea una nueva película


router.put('/:id', putMovie);               //Modifica la película

router.delete('/:id', deleteMovie);         //Borra la película

module.exports = router;