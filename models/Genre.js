const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genresSchema  = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

module.exports = mongoose.model('Genres',genresSchema);