const fawn = require('fawn');
const express = require('express');
const mongoose = require('mongoose');
const {Movie} = require('../models/Movie');
const {Customer} = require('../models/Customer');
const {Rentail, validate} = require('../models/Rentail');
const router = express.Router();
fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentail = await Rentail.find();
    res.send(rentail);
});

router.post('/', async (req, res) => {
    const data = req.body;
    try {
       const {error} = await validate(data);
   }catch (e) {
        return res.status(400).send(e.details[0].message);
   }

    const customer = await Customer.findOne({_id: data.customerId});
    if (!customer) return res.status(400).send('invalid customer');

    const movie = await Movie.findOne({_id: data.movieId});
    if (!movie) return res.status(400).send('invalid movie');

    if (movie.numberInStock === 0) return res.status(400).send('movie is not in stock');

    const newRentail = new Rentail({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    let savedRentail = await newRentail.save();
    movie.numberInStock--;
    await movie.save();
    res.send(savedRentail);
});


module.exports = router;
