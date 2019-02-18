const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt =  require('bcrypt');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let _user = await User.findOne({ email: req.body.email });
    if (_user) return res.status(400).send('User already registered.');

    let user = new User(_.pick(req.body, ['_id','name', 'email','password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send(_.pick(user, ['_id','name', 'email']));
});

router.get('/me', auth, async (req, res) => {
    console.log(req.user._id);
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;