const { Rental, validate } = require('../models/rentals');
const { Customer } = require('../models/customers');
const { Movie } = require('../models/movies');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('date');
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});


module.exports = router;