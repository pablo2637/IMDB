const express = require('express');
const router = express.Router();

const {
    getFavorites,
    addFavorite,
    deleteFavorite
} = require('../controllers/controllerAPIFavorites')



//* OBTENER TODAS LAS PELÍCULAS FAVORITAS
router.get('/:user_id', getFavorites); // de momento, necesito el params del user_id para poder utilizarlo en el front


//* GUARDAR PELÍCULA FAVORITA
router.post('/', addFavorite); // de momento, necesito el params del user_id para poder utilizarlo en el front


//* ELIMINAR PELÍCULA FAVORITA
router.delete('/:user_id', deleteFavorite);



module.exports = router;