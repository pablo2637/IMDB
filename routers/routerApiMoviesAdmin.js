const express = require('express');
const router = express.Router();
const {check} = require ("express-validator")
const {validarInputs}= require ("../middlewares/validarInputs")

const {
    getMovies,
    getMovie,
    postMovie,
    putMovie,
    deleteMovie } = require('../controllers/controllerApiMoviesAdmin');


//Faltan validaciones una vez que tengamos el middleware

router.get('/', getMovies);                 //Trae todas las películas

router.get('/:id', getMovie);               //Trae una película

router.post('/',[
    check("title","El titulo de la película es obligatorio")
    .not()
    .isEmpty(),
    check("image","Se necesita una imagen para añadir a la informacion de la pelicula")
    .not()
    .isEmpty(),
    check("year","Se necesita el año de creación de la película")
    .not()
    .isEmpty()
    .custom((value, {req})=>{
        if(value < 1800 || value >40){
            throw new Error("el año de la película no es un año que sea real")
        }
        return true
    }),
    check("directors","Debe introducir el nombre del director de la película que desea añadir")
    .not()
    .isEmpty(),
    check("stars","Se debe de introducir un rating para este película valido")
    .not()
    .isEmpty()
    .custom((value,{req})=>{
        if(value<=0 || value >=5){
            throw new Error ("el ratio deberá oscilar entre 0 y 5 puntos")
        }
        return true
    }),
    validarInputs
    //deberá de modificarse a partir del schema final que queramos elegir
], postMovie);                //Crea una nueva película

router.put('/:id', putMovie);               //Modifica la película

router.delete('/:id', deleteMovie);         //Borra la película

module.exports = router;