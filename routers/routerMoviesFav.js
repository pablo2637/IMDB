const express = require('express');
const router = express.Router();

const {getMoviesFav, guardarMovieFav, eliminarMovieFav} = require('../controllers/controllerMoviesFav');


//* PELÍCULAS FAVORITAS DEL USUARIO (por eso el id)
router.get('/favoritas/:id_usuario', getMoviesFav);


//* GUARDAR PELÍCULA EN FAVORITAS DEL USUARIO
router.post('/guardar-fav/:id_usuario/:id_movie', guardarMovieFav); // ruta del atributo action del form


//* ELIMINAR PELÍCULA DE FAVORITAS
router.get('/eliminar-fav/:id_usuario/:id_movie', eliminarMovieFav); // ruta del atributo action del form



module.exports = router;