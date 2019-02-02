const mongoose = require('mongoose');
const movies = require('./routes/movie');
const genres = require('./routes/genres');
const rentails = require('./routes/rentails');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/movies',movies);
app.use('/api/genres', genres);
app.use('/api/rentails',rentails);
app.use('/api/customers',customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));