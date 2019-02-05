const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
const {movieSchema} = require('./Movie');

const {customerSchema} = require('./Customer');
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
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
    };
    return Joi.validate(rental,schema);

}


module.exports.Rentail = mongoose.model('rentails',rentailSchema);
module.exports.validate = validateRental;
