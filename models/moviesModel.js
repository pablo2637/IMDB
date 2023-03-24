const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    directors: {
        type: String,
        required: true,
        trim: true
    },
    stars: {
        type: String,
        required: true,
    },
    genres: {
        type: String,
        required: true,
    },
    runtimeStr: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true,
        trim: true
    },
    imdbRating: {
        type: String,
    }
})

module.exports = model('Movie', MovieSchema);