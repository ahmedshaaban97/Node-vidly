const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
});


userSchema.methods.genetateToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

exports.User = mongoose.model('users', userSchema);
exports.validate = validateUser;