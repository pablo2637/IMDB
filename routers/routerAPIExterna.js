const express = require('express');
const router = express.Router();

const {getMovies, getMovie} = require('../controllers/controllerAPIExterna')



//* VIEW USUARIO: BUSCAR PELÍCULA (obtener todas las películas)
router.get('/?title=', getMovies);


//* VIEW USUARIO: DETALLE PELÍCULA (obtener una película)
router.get('/id/:id', getMovie);



module.exports = router;