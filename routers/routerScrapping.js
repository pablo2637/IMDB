const express = require('express');
const router = express.Router();

const {
    fetchOpinionsRT,
    fetchOpinionsSC } = require('../helpers/scrapping')

// OBLIGATORIO: Se pasarán como queries: title (título) y year (año) de la película.
//
// OPCIONAL: Se pueden pasar en el body como JSON los siguientes parámetros:
//          noShow: (boolean) decide si se muestra el navegador. Default: true
//          log: (boolean) decide si se muestra un log en la consola con los pasos de la función. Default:false
//          limit: (number) la cantidad de opiniones que se recogerán. Default:2
router.get('/rt', async ({ query, body }, res) => {
    if (body.log) console.log('query:', query, 'body:', body)
    const opinionesRT = await fetchOpinionsRT(query.title, query.year, body.noShow, body.log, body.limit);
    
    if (opinionesRT.ok) return res.status(200).json(opinionesRT);   
    else return res.status(500).json(opinionesRT);
  
})

router.get('/sc', async ({ query, body }, res) => {
    if (body.log) console.log('query:', query, 'body:', body)    
    const opinionesSC = await fetchOpinionsSC(query.title, query.year, body.noShow, body.log, body.limit);
    
    if (opinionesSC.ok) return res.status(200).json(opinionesSC)   
    else return res.status(500).json(opinionesSC);    
})

module.exports = router;