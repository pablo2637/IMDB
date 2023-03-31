const {
    modelGetFavorites,
    modelAddFavorite,
    modelDeleteFavorite,
    modelDeleteAllFavorites,
    modelSearchUserMovieByID,
    modelSearchMovieByID
} = require('../models/modelFavorites');



const getFavorites = async (req, res) => {


    const id = req.params.user_id; // no sé si capturamos el id del params (habría que modificar la ruta (/:id) o de otra parte, pero lo "falseo" de momento

    try {

        const data = await modelGetFavorites(id); // no valido si existe o no el usuario, pues para acceder a esta vista ya tiene que estar registrado y logueado

        if(data){

            return res.status(200).json({
                ok: true,
                data
            });

        } else {

            return res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID '${id}' no tiene ninguna película guardada como favorita.`
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

        const searchMovie = await modelSearchUserMovieByID(req.body);

        if(!searchMovie){ // si no existe movie_id en user_id, sí se guarda como favorita en la lista del usuario

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

    const datos = {
        user_id: req.params.user_id,
        movie_id: req.query.movie_id
    };

    try {

        const searchMovie = await modelSearchUserMovieByID(datos);

        if(searchMovie){ // al contrario que en addFavorite, si movie_id y user_id coinciden y existen en la base de datos, se elimina la favorita de la lista del usuario

            await modelDeleteFavorite(datos);

            return res.status(200).json({
                ok: true,
                msg: `La película con ID '${datos.movie_id}' se ha eliminado de la lista de favoritas del usuario.`
            });

        } else {

            return res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID '${datos.user_id}' no tiene guardada la película con ID '${datos.movie_id}' como favorita en su perfil.`
            });

        };
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });
        
    };

}; //!FUNC-DELETEFAVORITE


const deleteAllFavorites = async (req, res) => {

    const id = req.params.movie_id;

    try {

        const searchMovie = await modelSearchMovieByID(id);

        if(searchMovie){

            await modelDeleteAllFavorites(id);

            return res.status(200).json({
                ok: true,
                msg: `Se ha eliminado la película con ID '${id}' de la base de datos.`
            });

        }else{

            return res.status(400).json({
                ok: false,
                msg: `ERROR: no se ha encontrado ninguna película con ID '${id}' en la base de datos.`
            });

        };
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });
        
    };

}; //!FUNC-DELETEALLFAVORITES



module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite,
    deleteAllFavorites
};