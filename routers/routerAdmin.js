const express = require('express');
const router = express.Router();



//* MOSTRAR TODAS LAS PELÍCULAS
router.get('/');


//* MOSTRAR EL FORMULARIO DE CREAR PELÍCULA
router.get('/nueva');


//* CREAR NUEVA PELÍCULA
router.post('/crear-pelicula',); // ruta del action del form


//* MOSTRAR EL FORMULARIO DE EDITAR PELÍCULA
router.get('/editar/:id');


//* EDITAR UNA PELÍCULA
router.post('/actualizar/:id'); // ruta del action del form


//* ELIMINAR UNA PELÍCULA
router.get('/eliminar/:id');



module.exports = router;