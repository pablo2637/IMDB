const {
    modelGetFavorites,
    modelGetFavorite,
    modelAddFavorite,
    modelDeleteFavorite
} = require('../models/modelFavorites');



const getFavorites = async (req, res) => {

    res.send('Pintando getFavorites');

}; //!FUNC-GETFAVORITES


const getFavorite = async (req, res) => {

    res.send('Pintando getFavorite')

}; //!FUNC-GETFAVORITE


const addFavorite = async (req, res) => {

    res.send('Pintando addFavorite')

}; //!FUNC-ADDFAVORITE


const deleteFavorite = async (req, res) => {

    res.send('Pintando deleteFavorite')

}; //!FUNC-DELETEFAVORITE



module.exports = {
    getFavorites,
    getFavorite,
    addFavorite,
    deleteFavorite
};