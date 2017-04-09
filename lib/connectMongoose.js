'use strict';

const mongoose = require('mongoose');
const localConfig = require('../localConfig');

module.exports.connect = function(cb) {
    var db = mongoose.connection;
    mongoose.Promise = global.Promise;

    db.on('error', function(err) {
        console.log('Connection error', err);
        if(cb) {
            cb(err);
        }
    });

    db.once('open', function() {
        console.log('Connected to mongodb');
        if(cb) {
            cb(null, db);
        }
    });

    db.on('disconnected', function() {
        console.log('Disconnected from mongodb');
    });

    mongoose.connect(localConfig.db.connectionString);
};