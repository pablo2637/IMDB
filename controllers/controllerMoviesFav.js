const {fetchData} = require('../helpers/fetchData');



const getMoviesFav = async (req, res) => {

    //* tengo que hacer un req del id del usuario para hacer el fetch en MongoDB

    const tipo = 'getMoviesFav';

    const respuesta = await fetchData(tipo, req);

    //* en const respuesta tendría que destructurar para pasarle esa info al render.


    res.send('Probando desde getMoviesFav');

}; //!FUNC-GETMOVIESFAV



const guardarMovieFav = async (req, res) => {

    //* tengo que hacer dos req: uno para el id del usuario y otro para el id de la película.
    //* comprobación: si el id_movie ya existe asociado al id_usuario, mostrar mensaje "la película ya está guardada como favorita"; en caso contrario, guardar (pasar req al fetchData)
    //? hacer res.redirect según la página en la que se encuentre (buscador o detalle-pelicula) o directamente a favoritas? a lo mejor capturando la url, con una condicional indicarle que haga redirect de una u otra (buscador o detalle-pelicula)

    const tipo = 'guardarMovieFav';

    await fetchData(tipo, req);


    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-GUARDARMOVIEFAV



const eliminarMovieFav = async (req, res) => {

    //* tengo que hacer dos req: uno para el id del usuario y otro para el id de la película.
    //* comprobación: si el id_movie NO existe asociado al id_usuario en la bbdd, mostrar mensaje "la película no está guardada como favorita y no se puede eliminar" (¿inhabilitar/habilitar botón?); en caso contrario, eliminar (pasar req al fetchData)

    const tipo = 'eliminarMovieFav';

    await fetchData(tipo, req);
    


    res.send('Probando desde eliminarMovieFav')
    //res.redirect('/dashboard-usuario/favoritas');

}; //!FUNC-ELIMINARMOVIEFAV



module.exports = {
    getMoviesFav,
    guardarMovieFav,
    eliminarMovieFav
};