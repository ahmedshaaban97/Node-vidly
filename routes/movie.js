const express = require('express');
const {Genre} = require('../models/Genre');
const {Movie,validate} = require('../models/Movie');
const router = express.Router();


router.get('/',async (req,res)=>{
    let movies = await Movie.find();
    res.send(movies);
});

router.post('/',async (req,res)=>{
    const data = req.body;
    const {error} = await validate(data);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findOne({_id : data.genreId});
    if (!genre) return res.status(400).send('invalid genre');

    let newMovie = new Movie({
        title : data.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : data.numberInStock,
        dailyRentalRate: data.dailyRentalRate
    });
    let savedMovie = await newMovie.save();
    res.send(savedMovie);
});



module.exports = router;