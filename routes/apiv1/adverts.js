"use strict";

const express = require('express');
const router = express.Router();

const customError = require('../../lib/customError');

const mongoose = require('mongoose');
const Advert = mongoose.model('Advert');

router.get('/', function(req, res, next) {
    Advert.find().exec(function(err, rows) {
        if(err) {
            return customError(req, res, 'ADV_FIND_ERROR');
        }
        res.json({sucess: true, adverts: rows});
    });
});

module.exports = router;
