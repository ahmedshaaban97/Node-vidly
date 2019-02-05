const joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    isGold : {
        type: Boolean,
        default : false
    },
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 15,
        uppercase : true
    },
    phone :{
        type : Number,
        required : true,
        minlength : 3,
        maxlength : 16,
    },

});


function validateCustomer(customer) {
    const schema = {
        name: joi.string().min(5).max(15).required(),
        phone: joi.number().integer().required(),
        isGold: joi.boolean()
    };
    return joi.validate(customer, schema);
}



module.exports.Customer = mongoose.model('Customer',customerSchema);
module.exports.customerSchema = customerSchema;
module.exports.validate = validateCustomer;