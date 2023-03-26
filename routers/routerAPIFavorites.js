const express = require('express');
const router = express.Router();

const {
    getFavorites,
    addFavorite,
    deleteFavorite
} = require('../controllers/controllerAPIFavorites')



//* OBTENER TODAS LAS PELÍCULAS FAVORITAS
router.get('/', getFavorites);


//* GUARDAR PELÍCULA FAVORITA
router.post('/', addFavorite);


//* ELIMINAR PELÍCULA FAVORITA
router.delete('/:id', deleteFavorite);



module.exports = router;