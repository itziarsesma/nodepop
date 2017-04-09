'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const sha256 = require('sha256');

require('../models/Advert');
require('../models/User');

const config = require('../localConfig');

const dbConnection = require('./connectMongoose');

var loaded = [];

dbConnection.connect(function(err, con) {
    if (err) {
        console.log('Can not execute the script');
        return process.exit(1);
    }
    // borrar database
    con.dropDatabase();
    console.log('Drop done');

    // cargar datos
    fs.readFile(config.db.initialData, 'utf8', function (err, data) {
        if (err) {
            console.log('Can not read initial data ' + config.db.initialData, err);
            con.disconnect();
            return process.exit(1);
        }
        const initialData = JSON.parse(data);

        loadInitialData(initialData.usuarios, 'User', disconnect);
        loadInitialData(initialData.anuncios, 'Advert', disconnect);
    });
});

function loadInitialData(array, modelName, cb) {
    if(array.length == 0) {
        loaded.push(modelName);
        return cb();
    }
    const item = array.shift();
    if (item.password) {
        item.password = sha256(item.password);
    }
    const model = mongoose.model(modelName);
    new model(item).save(function(err, data) {
        if(err) {
            console.log('Error saving item ' + item.name, err);
        } else {
            console.log(item.name + ' saved');
        }
        loadInitialData(array, modelName, cb);
    });
}

function disconnect() {
    if (loaded.length === config.db.schemasToLoad) {
        mongoose.disconnect();
    }
}










