'use strict';

const express = require('express');
const router = express.Router();

const customError = require('../../lib/customError');

const mongoose = require('mongoose');
const Advert = mongoose.model('Advert');

const jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth);

router.get('/', function(req, res) {
    const tag = req.query.tag;
    const sale = req.query.sale;
    const price = req.query.price;
    const name = req.query.name;

    const filter = {};
    if (tag) {
        filter.tags = tag;
    }
    if (sale) {
        filter.sale = sale;
    }
    if(price) {
        const priceSplit = price.split('-');
        if (priceSplit.length === 2) {
            if(priceSplit[0] === '') {
                filter.price = { '$lte': priceSplit[1] };
            }
            else if(priceSplit[1] === '') {
                filter.price = { '$gte': priceSplit[0] };
            } else {
                filter.price = { '$gte': priceSplit[0], '$lte': priceSplit[1] };
            }
        } else {
            filter.price = parseInt(price);
        }
    }
    if (name) {
        filter.name = new RegExp('^' + name, 'i'); //{ $regex: /^ABC/i }
    }

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    Advert.list(filter, limit, skip, fields, sort, function(err, rows) {
        if(err) {
            return customError(req, res, 'ADV_FIND_ERROR');
        }
        res.json({sucess: true, adverts: rows});
    });

});

router.get('/tags', function(req, res) {
    Advert.distinct('tags', function(err, tags) {
        if(err) {
            return customError(req, res, 'TAGS_FIND_ERROR');
        }
        res.json({sucess: true, tags});
    });
});

module.exports = router;
