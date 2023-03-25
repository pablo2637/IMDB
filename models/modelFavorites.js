const {Pool} = require('pg');

const pool = new Pool({
    host: 'imdb.c0aymyj9upbq.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    database: 'imdb',
    password: 'FullStack23',
    ssl: { rejectUnauthorized: false }
});



const modelGetFavorites = () => {



}; //!FUNC-MODELGETFAVORITES


const modelGetFavorite = () => {



}; //!FUNC-MODELGETFAVORITE


const modelAddFavorite = () => {



}; //!FUNC-MODELADDFAVORITE


const modelDeleteFavorite = () => {



}; //!FUNC-MODELDELETEFAVORITE



module.exports = {
    modelGetFavorites,
    modelGetFavorite,
    modelAddFavorite,
    modelDeleteFavorite
};