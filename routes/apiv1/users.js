"use strict";

const express = require('express');
const router = express.Router();

const sha256 = require('sha256');

const customError = require('../../lib/customError');

const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post("/", function(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        name: name,
        email: email,
        password: sha256(password)
    });

    user.save(function(err, user) {
        if(err) {
            if (err.code === 11000) {
                return customError(req, res, 'USR_DUPLICATE_KEY', 400);
            } else if (err.name === "ValidationError") {
                return customError(req, res, 'USR_VALIDATION_ERR', 400);
            } else {
                return customError(req, res, 'USR_ADD_ERROR');
            }
        }
        res.json({sucess: true, adverts: user});
    });

});

module.exports = router;