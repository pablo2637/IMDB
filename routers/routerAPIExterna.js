const express = require('express');
const router = express.Router();

const {getMovies, getMovie} = require('../controllers/controllerAPIExterna')



//* obtener todas las películas
router.get('/', getMovies);


//* obtener una película
router.get('/:id', getMovie);



module.exports = router;