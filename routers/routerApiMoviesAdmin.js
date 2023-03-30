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
 
//titulo de la pelicula
check("title", "El titulo de la película es obligatorio")
    .not()
    .isEmpty(),


//año
check("year", "Se necesita el año de creación de la película")
    .not()
    .isEmpty()
    .isInt({ min: 1800, max: 2024 }),



//Directores 
check("directors", "Rellenar todos los campos")
    .not()
    .isEmpty(),

//Actores
check("stars", "Rellenar el campo de Actores")
    .not()
    .isEmpty(),

//Generos
check("genres", "Introduzca un genero valido")
    .not()
    .isEmpty(),

//Duracion
check("runtimeStr", "Introduzca la duración de la película expresada en minutos")
    .not()
    .isEmpty(),
    //.isInt({ min: 1 }),

//Plot
check("plot", "Introduzca un sinopsis de la película")
    .not()
    .isEmpty(),


//calificacion
    check("imdbRating", "Introduzca una calificación válida (entre 0 y 10)")
    .not()
    .isEmpty()
    .isFloat({ min: 0, max: 10 }),

    
//Fecha
check("fecha", "Introduzca una fecha válida en formato ISO 8601 (por ejemplo, 2023-03-30)")
    .not()
    .isEmpty(),
    //.isISO8601(),

//Escritor
check("escritor", "Introduzca el nombre del escritor de la película")
    .not()
    .isEmpty(),



//Opiniones
check("opinion", "Introduzca una opinión sobre la película")
    .not()
    .isEmpty(),



validarInputs
], postMovie);                //Crea una nueva película


router.put('/:id', putMovie);               //Modifica la película

router.delete('/:id', deleteMovie);         //Borra la película

module.exports = router;