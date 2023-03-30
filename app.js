const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connect } = require('./helpers/dbConnect')

const app = express();                              //Servidor
const port = process.env.PORT;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static

app.set('view engine', 'ejs');                      //Template engine
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }))    // Parse application/x-www-form-urlencoded
app.use(express.json())                             // Parse application/json

//Conexión
connect();

//Rutas
app.use('/api/scrapping', require('./routers/routerScrapping')); //ruta Scrapping
app.use('/api/movies/mongo', require('./routers/routerApiMoviesAdmin')); // ruta interna (MongoDB)
app.use('/api/movies/imdb', require('./routers/routerAPIExterna')); // ruta API externa (IMDb)
app.use('/api/favorites', require('./routers/routerAPIFavorites')); // ruta API SQL - favoritas
app.use('/dashboard-admin', require('./routers/routerFrontAdmin')); // ruta admin para crear, editar y eliminar películas


//404


//Listener
app.listen(port, () => console.log(`Server listening on port ${port}...`))