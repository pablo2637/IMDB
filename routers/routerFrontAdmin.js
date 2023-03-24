const express = require('express');
const router = express.Router();

const {
    getMovies,
    mostrarFormularioNueva,
    crearMovieNueva,
    mostrarFormularioEditar,
    editarMovie,
    eliminarMovie
} = require('../controllers/controllerFrontAdmin');



//* MOSTRAR TODAS LAS PELÍCULAS
router.get('/', getMovies);


//* MOSTRAR EL FORMULARIO DE CREAR PELÍCULA
router.get('/nueva');
 

//* CREAR NUEVA PELÍCULA
router.post('/crear-pelicula',); // ruta del action del form


//* MOSTRAR EL FORMULARIO DE EDITAR PELÍCULA
router.get('/dashboard-admin/editar/:id', mostrarFormularioEditar);


//* EDITAR UNA PELÍCULA
router.post('/dashboard-admin/editar/:id', editarMovie);
// ruta del action del form


//* ELIMINAR UNA PELÍCULA
router.post('/eliminar/:id', eliminarMovie);



module.exports = router;