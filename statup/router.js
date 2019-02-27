const genres = require('../routes/genre');
const customers =  require('../routes/customer');
const auth = require('../routes/auth');
const users = require('../routes/user');
const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}