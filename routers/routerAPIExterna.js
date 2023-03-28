const express = require('express');
const router = express.Router();

const {getMovies, getMovie} = require('../controllers/controllerAPIExterna')



//* BUSCAR TODAS LAS PELÍCULAS POR QUERY "TITLE" EN API IMDb
router.get('/', getMovies);


//* BUSCAR UNA PELÍCULA POR PARAMS "movie_id" EN API IMDb
router.get('/:movie_id', getMovie);



module.exports = router;