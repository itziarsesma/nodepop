"use strict";

const mongoose = require("mongoose");

var advertSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    image: String,
    tags: [String]
});

var Advert = mongoose.model('Advert', advertSchema);