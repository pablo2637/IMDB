const {fetchData} = require('../helpers/fetchData');



const getMovies = async (req, res) => {

    const tipo = 'getMoviesInt';

    const {data} = await fetchData(tipo, req);

    const {movies} = data;


    res.render('../views/admin/dashboard-admin.ejs', {
        movies
    })

}; //!FUNC-GETMOVIES



module.exports = {getMovies};