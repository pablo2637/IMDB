const express = require('express');
const router = express.Router();

const {
    getFavorites,
    getFavorite,
    addFavorite,
    deleteFavorite
} = require('../controllers/controllerAPIFavorites')



//* OBTENER TODAS LAS PELÍCULAS FAVORITAS
router.get('/', getFavorites);


//* OBTENER UNA PELÍCULA FAVORITA
router.get('/:id', getFavorite);


//* GUARDAR PELÍCULA FAVORITA
router.post('/', addFavorite);


//* ELIMINAR PELÍCULA FAVORITA
router.delete('/:id', deleteFavorite);



module.exports = router;