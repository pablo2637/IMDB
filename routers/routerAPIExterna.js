const express = require('express');
const router = express.Router();


//* obtener todas las películas
router.get('/', (req, res) => {
    res.send('Probando')
});

//* obtener una película
router.get('/:id', (req, res) => {
    res.send('Prueba')
});


module.exports = router;