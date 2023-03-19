const urlBase = 'https://imdb-api.com/API';

const fetchMovies = async (url) => {

    try {

        const request = await fetch(`${urlBase}/AdvancedSearch/k_9yd5ebs9?title=Inception`); //! pendiente modificar

        const {results} = await request.json();

        if(results){
            return {
                ok: true,
                data: results
            }
        }else{
            return {
                ok: false,
                msg: 'ERROR: no se ha podido conectar con la API.'
            }
        };
        
    } catch (error) {

        console.log(error);
        
    };

}; //!FUNC-FETCHMOVIES


module.exports = {fetchMovies};