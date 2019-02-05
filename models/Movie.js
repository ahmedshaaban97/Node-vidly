const joi = require('joi');
const mongoose = require('mongoose');
const {genresSchema} = require('./Genre');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim : true
    },
    genre : {
        type: genresSchema,

    },
    numberInStock : {
        type : Number,

    },
    dailyRentalRate : {
        type : Number,
        required : true
    }
});


function validateMovie(movie){
    const schema = {
        title : joi.string().required(),
        genreId : joi.string().required(),
        numberInStock : joi.number().required(),
        dailyRentalRate : joi.number().required()

    };
    return joi.validate(movie,schema);
}


module.exports.Movie = mongoose.model('movies', movieSchema);
module.exports.movieSchema = movieSchema;
module.exports.validate = validateMovie;