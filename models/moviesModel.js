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
        type: Array,
        required: true,
    },
    genres: {
        type: String,
        required: true,
    },
    runtimeStr: {
        type: Number,
        required: true
    },
    plot: {
        type: String,
        required: true,
        trim: true
    },
    imDbRating: {
        type: String,
    }
})

module.exports = model('Movie', MovieSchema);