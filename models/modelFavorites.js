const {Pool} = require('pg');

const queries = require('./queries');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'imdb',
    password: 'admin',
    //ssl: { rejectUnauthorized: false }
});



const modelGetFavorites = async (id) => {

    let client, result;

    try {

        client = await pool.connect();

        const data = await client.query(queries.queryGetFavorites, [id])

        data.rowCount != 0 ? result = data.rows : result = false;
        
    } catch (error) {
        
        console.log(error);
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELGETFAVORITES


const modelAddFavorite = async (datos) => {

    let client, result;

    const {user_id, movie_id, api_movie} = datos;

    try {

        client = await pool.connect();

        const data = await client.query(queries.queryAddFavorite, [user_id, movie_id, api_movie]);

        result = data;
        
    } catch (error) {

        console.log(error);
        throw error;
        
    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELADDFAVORITE


const modelDeleteFavorite = async () => {



}; //!FUNC-MODELDELETEFAVORITE


const modelSearchMovieByID = async (datos) => {

    let client, result;

    const {user_id, movie_id} = datos;

    try {

        client = await pool.connect();

        const data = await client.query(queries.querySearchMovieByID, [user_id, movie_id]);

        data.rowCount == 0 ? result = true : result = false;
                
    } catch (error) {

        console.log(error);
        throw error;
        
    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELSEARCHMOVIEBYID



module.exports = {
    modelGetFavorites,
    modelAddFavorite,
    modelDeleteFavorite,
    modelSearchMovieByID
};