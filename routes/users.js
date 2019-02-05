const _ = require('lodash');
const bcrypt = require('bcrypt');
const config =  require('config');
const express = require('express');
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../helper/hash');
const {User, validate} = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
    const data = req.body;
    try {
        const {error} = await validate(data);
    } catch (e) {
        return res.status(400).send(e.details[0].message);
    }
    try {
        let user = await User.findOne({email: data.email});
        if (user) return res.status(400).send('email already exists');

        let newUser = new User(_.pick(data, ['name', 'password', 'email']));
        newUser.password = await hashPassword(data.password);
        await newUser.save();
        const token = jwt.sign({_id: newUser._id}, config.get('jwtPrivateKey'));
        res.header('auth-token',token).send(_.pick(newUser, ['_id', 'name', 'email']));
    } catch (e) {
        return res.status(400).send('some went wrong')
    }

});


module.exports = router;