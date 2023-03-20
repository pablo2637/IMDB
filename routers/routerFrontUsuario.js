const express = require('express');
const router = express.Router();

const {getMoviesFav, guardarMovieFav, eliminarMovieFav} = require('../controllers/controllerMoviesFav')


//* PELÍCULAS FAVORITAS DEL USUARIO (por eso el id)
router.get('/dashboard-usuario/favoritas/:id_usuario', getMoviesFav); //! comprobar ruta


//* GUARDAR PELÍCULA EN FAVORITAS (desde vista buscador)
router.post('/dashboard-usuario/buscador/guardar-favorita/:id_usuario/:id_movie', guardarMovieFav); //! comprobar ruta


//* GUARDAR PELÍCULA EN FAVORITAS (desde vista detalle-película)
router.post('/dashboard-usuario/buscador/detalle-pelicula/guardar-favorita/:id_usuario/:id_movie', guardarMovieFav); //! comprobar ruta


//* ELIMINAR PELÍCULA DE FAVORITAS
router.get('/dashboard-usuario/favoritas/eliminar-favorita/:id_usuario/:id_movie', eliminarMovieFav); //! comprobar ruta



module.exports = router;