const joi = require('joi');
const mongoose = require('mongoose');
const {customerSchema} = require('./Customer');
const {movieSchema} = require('./Movie');
const Schema = mongoose.Schema;


const rentailSchema = new Schema({
    customer : {
        type  : customerSchema,
        required : true
    },
    movie : {
        type: movieSchema,
        required: true
    },
    dateOut : {
        type : Date,
        required : true,
        default  :Date.now
    },
    dateReturend : {
        type : Date
    },
    rentalFee : {
        type : Number,
        min : 0
    }
});

function validateRental(rental) {
    const schema = {
        customerId : joi.string().required(),
        movieId : joi.string().required(),
    };
    return joi.validate(rental,schema);

}


module.exports.Rentail = mongoose.model('rentails',rentailSchema);
module.exports.validate = validateRental;
