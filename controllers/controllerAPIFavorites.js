const {
    modelGetFavorites,
    modelAddFavorite,
    modelDeleteFavorite,
    modelSearchMovieByID
} = require('../models/modelFavorites');



const getFavorites = async (req, res) => {


    const id = 2; // no sé si capturamos el id del params (habría que modificar la ruta (/:id) o de otra parte, pero lo falseo de momento

    try {

        const data = await modelGetFavorites(id);

        if(data){

            return res.status(200).json({
                ok: true,
                data
            });

        } else {

            return res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID '${id}' no tiene guardada ninguna película en favoritas.`
            });

        };
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });
        
    };

}; //!FUNC-GETFAVORITES


const addFavorite = async (req, res) => {

    try {

        const searchMovie = await modelSearchMovieByID(req.body);

        if(searchMovie){ // si no existe movie_id en user_id, se guarda como favorita

            await modelAddFavorite(req.body);

            return res.status(201).json({
                ok: true,
                msg: '¡La película ha sido guardada en favoritas!'
            });

        } else {

            return res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID '${req.body.user_id}' ya tiene la película con ID '${req.body.movie_id}' guardada como favorita en su perfil.`
            });

        };
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });
        
    };
    
}; //!FUNC-ADDFAVORITE


const deleteFavorite = async (req, res) => {

    res.send('Pintando deleteFavorite')

}; //!FUNC-DELETEFAVORITE



module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite
};