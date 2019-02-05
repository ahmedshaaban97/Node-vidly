const mongoose = require('mongoose');
const auth = require('./routes/auth');
const users = require('./routes/users');
const movies = require('./routes/movie');
const genres = require('./routes/genres');
const rentails = require('./routes/rentails');
const customers = require('./routes/customers');
const express = require('express');
const config = require('config');
const app = express();

if (!config.get('jwtPrivateKey')){
    console.log('fatal error,env variable is not set');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/users', users);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/rentails', rentails);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));