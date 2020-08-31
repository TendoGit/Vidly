const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    phone: {
        type: Number,
        required: true
    }
}));

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    customer = await customer.save();

    res.send(customer)
});

function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().required().min(3).max(255),
        phone: Joi.number().required()
    });

    return schema.validate(customer);
}

module.exports = router;