"use strict";

const mongoose = require('mongoose');
const localConfig = require('../localConfig');

var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', function(err) {
    // TODO mensaje a traducir
    console.log('Connection error', err);
    return process.exit(1);
});

db.on('open', function() {
    // TODO mensaje a traducir
   console.log('Connected to mongodb');
});

mongoose.connect('mongodb://localhost/' + localConfig.DB_NAME);