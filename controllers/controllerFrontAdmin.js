const {fetchData} = require('../helpers/fetchData');



const getMovies = async (req, res) => {

    const tipo = 'getMoviesInt';

    const {data} = await fetchData(tipo, req);

    const {movies} = data;


    res.render('../views/admin/dashboard-admin.ejs', {
        movies
    })

}; //!FUNC-GETMOVIES


const mostrarFormularioNueva = async (req, res) => {



}; //!FUNC-MOSTRARFORMULARIONUEVA


const crearMovieNueva = async (req, res) => {



}; //!FUNC-CREARMOVIENUEVA


const mostrarFormularioEditar = async (req, res) => {

    const id = req.params.id;
    const tipo = 'putMovieInt';

    try {
        const {data} = await fetchData(tipo, req, id);
        const {movie} = data;

        //esta es la ruta del formulario que no esta creado todavia
        res.render('../views/admin/editar-movie.ejs', {
            movie
        });
    } catch (error) {
        console.log(error);
    }
  

}; //!FUNC-MOSTRARFORMULARIOEDITAR


const editarMovie = async (req, res) => {

    const id = req.params.id;

    const tipo = 'putMovieInt';
  
    try {
        const body = JSON.stringify(req.body);
        await fetchData(tipo, req, id, body);
        res.redirect('/dashboard-admin');
    } catch (error) {
        console.log(error);
    }
//funcion 

}; //!FUNC-EDITARMOVIE


const eliminarMovie = async (req, res) => {

    const tipo = 'deleteMovieInt';
    console.log("Holaaa")

    //const {data} = await fetchData(tipo, req);

    const movies=await fetchData(tipo, req);
    
     //const {movies} = data;

    try {

    console.log(movies)
      if (!movies) {
        return res.status(404).json({
          ok: false,
          msg: 'Película no encontrada',
        });
      }

      res.redirect('/dashboard-admin');
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar la película',
      });
    }

//funcion eliminar 

}; //!FUNC-ELIMINARMOVIE



module.exports = {
    getMovies,
    mostrarFormularioNueva,
    crearMovieNueva,
    mostrarFormularioEditar,
    editarMovie,
    eliminarMovie
};