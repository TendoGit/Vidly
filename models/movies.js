const Joi = require('joi'); 
const { genreSchema } = require('./genres');
const mongoose = require('mongoose');

const Movie = mongoose.model( new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(50),
        genreId: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate =validateMovie;