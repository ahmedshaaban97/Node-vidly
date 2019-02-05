const Joi = require('joi');
const config = require('config');
const bcrypt =  require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const {error} = await validate(data);
    } catch (e) {
        return res.status(400).send(e.details[0].message);
    }

    const user = await User.findOne({email: data.email});
    if (!user) return res.status(400).send('invalid email or password');

    const password = await bcrypt.compare(data.password, user.password);
    if (!password) return res.status(400).send('invalid email or password');
    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.send(token);


});


function validate(user) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}


module.exports = router;