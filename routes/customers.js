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



function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().required().min(3).max(255),
        phone: Joi.number().required()
    });

    return schema.validate(customer);
}

module.exports = router;