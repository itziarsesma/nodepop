"use strict";

const mongoose = require('mongoose');
const fs = require('fs');
const sha256 = require('sha256');

require('../models/Advert');
require('../models/User');

const config = require('../localConfig');

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', function(err) {
    // TODO mensaje a traducir
    console.log('Connection error', err);
    return process.exit(1);
});

db.on('open', function() {
    // TODO mensaje a traducir

    // borrar database
    db.dropDatabase();
    console.log('Drop done');

    // cargar datos
    fs.readFile(config.INITIAL_DATA, 'utf8', function (err, data) {
        if (err) {
            console.log("Can not read initial data " + config.INITIAL_DATA, err);
            mongoose.disconnect();
            return process.exit(1);
        }
        const initialData = JSON.parse(data);

        const objectNum = initialData.anuncios.length + initialData.usuarios.length;
        let objectsSaved = 0;

        const Advert = mongoose.model('Advert');
        initialData.anuncios.forEach(function(advertData) {
            new Advert(advertData).save(function(err, data) {
                objectsSaved += 1;
                if(err) {
                    console.log('Error saving advert ' + advertData, err);
                    return;
                }
                console.log(data.name + ' saved');
                disconnect(objectsSaved, objectNum);
            });
        });

        const User = mongoose.model('User');
        initialData.usuarios.forEach(function(userData) {
            objectsSaved += 1;
            userData.password = sha256(userData.password);
            new User(userData).save(function(err, data) {
                if(err) {
                    console.log('Error saving user ' + userData, err);
                    return;
                }
                console.log(data.name + ' saved');
                disconnect(objectsSaved, objectNum);
            });
        });
    });
});

function disconnect(saved, processed) {
    if(saved === processed) {
        mongoose.disconnect();
    }
}

mongoose.connect('mongodb://localhost/' + config.DB_NAME);










