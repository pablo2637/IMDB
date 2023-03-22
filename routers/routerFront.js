const express = require('express');
const router = express.Router();

const { fetchOpinions } = require('../helpers/scrapping')

router.get('/scrap/', async ({ query }, res) => {
    console.log(query)
    const opiniones = await fetchOpinions(query.title, query.year);
    if (opiniones.ok) res.status(200).json(opiniones)
    else res.status(500).json(opiniones)
})

router.get('/', (req, res) => {
    if (!req.oidc.isAuthenticated()) return res.render("test", {
        msg: 'No logeado',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        token: req.oidc.refreshToken
    })

    return res.render("test", {
        msg: 'Logeado correctamente',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        token: req.oidc.refreshToken
    })
});

module.exports = router;