const Movie = require('../models/moviesModel');

//Trae todas las películas
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        if (!movies) return res.status(400).json({
            ok: false,
            msg: 'getMovies: no hay ninguna película aún en la bbdd.'
        })

        return res.status(200).json({
            ok: true,
            msg: 'getMovies: OK',
            movies
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en getMovie',
            e
        })
    }
}

//Trae una película
const getMovie = async ({ params }, res) => {
    try {
        const response = await Movie.findById(params.id);
        if (!response) return res.status(400).json({
            ok: false,
            msg: `getMovie: no se ha encontrado la película con _id: ${params.id}`,
            id: params.id
        })
        
        return res.status(200).json({
            ok: true,
            msg: `getMovie: OK, _id:${params.id}`,
            response
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en getMovie',
            e
        })
    }
}

//Crea una película nueva
const postMovie = async ({ body }, res) => {
    try {
        const response = await new Movie(body).save();
        return res.status(201).json({
            ok: true,
            msg: 'postMovie: OK',
            response
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en postMovie',
            e
        })
    }
}

//Modifica la película
const putMovie = async ({ params, body }, res) => {
    try {
        const movie = await Movie.findById(params.id);
        if (!movie) return res.status(400).json({
            ok: false,
            msg: `putMovie: no se ha encontrado la película con _id: ${params.id}`,
            id: params.id
        })

        const response = await Movie.findByIdAndUpdate(params.id, body);        
        if (!response) return res.status(400).json({
            ok: false,
            msg: `putMovie: falló al intentar modificar la película con _id: ${params.id}`,
            response
        })      

        return res.status(201).json({
            ok: true,
            msg: 'putMovie: OK',
            response: movie
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en putMovie',
            e
        })
    }
}

//Borra la película
const deleteMovie = async ({ params }, res) => {
    try {
        const response = await Movie.findByIdAndDelete(params.id);
        if (!response) return res.status(400).json({
            ok: false,
            msg: `deleteMovie: no se ha encontrado la película con _id: ${params.id}`,
            id: params.id
        })

        return res.status(200).json({
            ok: true,
            msg: `deleteMovie: OK, _id:${params.id}`,
            response
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en deleteMovie',
            e
        })
    }
}

module.exports = {
    getMovies,
    getMovie,
    postMovie,
    putMovie,
    deleteMovie
}