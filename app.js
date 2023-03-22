const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connect } = require('./helpers/dbConnect')

const { auth } = require('express-openid-connect'); //Auth0
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.A0_SECRET_KEY,
    baseURL: process.env.URL_BASE,
    clientID: process.env.A0_CLIENT_ID,
    issuerBaseURL: process.env.A0_ISSUER_BASE_URL
};

const app = express();                              //Servidor
const port = process.env.PORT;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static

app.set('view engine', 'ejs');                      //Template engine
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }))    // Parse application/x-www-form-urlencoded
app.use(express.json())                             // Parse application/json

app.use(auth(config));                              //Auth0 config

//Conexión
connect();

//Rutas
app.use('/', require('./routers/routerFront')); //test  
app.use('/api/movies/mongo', require('./routers/routerApiMoviesAdmin'));
app.use('/api/movies/imdb', require('./routers/routerAPIExterna')); // ruta API externa (IMDb)
app.use('/dashboard-usuario', require('./routers/routerMoviesFav')); // ruta usuario películas favoritas
app.use('/dashboard-admin', require('./routers/routerFrontAdmin')); // ruta admin para crear, editar y eliminar películas

//404


//Listener
app.listen(port, () => console.log(`Server listening on port ${port}...`))