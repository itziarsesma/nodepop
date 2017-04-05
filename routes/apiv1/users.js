"use strict";

const express = require('express');
const router = express.Router();

const sha256 = require('sha256');
const jwt = require('jsonwebtoken');

const customError = require('../../lib/customError');
const config = require('../../localConfig');

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
        res.json({sucess: true, user: user});
    });

});

router.post("/authenticate", function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if(!user) {
            return customError(req, res, 'USR_NOT_FOUND', 401);
        }
        if(!password || user.password !== sha256(password)) {
            return customError(req, res, 'USR_BAD_PWD', 401);
        }
        jwt.sign({email: email}, config.jwt.SECRET_WORD, {expiresIn: config.jwt.EXPIRES_IN}, function(err, token) {
            if(err) {
                return customError(req, res, 'USR_SIGN_ERR');
            }
            res.json({success: true, token: token});
        });
    });
});

module.exports = router;