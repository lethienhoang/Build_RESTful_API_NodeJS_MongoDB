const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { validate, Genre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/' , auth, async (req, res) => {
    console.log(req);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.body.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(400).send('The genre with the given ID was not found');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.findOneAndDelete(req.body.id);

    if (!genre) return res.status(400).send('The genre with the given ID was not found');

    res.send(genre);
})

module.exports = router;