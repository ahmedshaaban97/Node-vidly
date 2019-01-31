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
        maxlength : 15,
    },

});

module.exports = mongoose.model('Customer',customerSchema);