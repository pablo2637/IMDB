const urlBase = 'https://imdb-api.com/API';

const fetchMovies = async (url) => {

    try {

        const request = await fetch(`${urlBase}/${url}`); //! pendiente: modificar url en controller

        const response = await request.json();

        if(response){
            return {
                ok: true,
                data: response
            };
        }else{
            return {
                ok: false,
                msg: 'ERROR: no se ha podido conectar con la API.'
            };
        };
        
    } catch (error) {

        console.log(error);
        return error;
        
    };

}; //!FUNC-FETCHMOVIES


module.exports = {fetchMovies};