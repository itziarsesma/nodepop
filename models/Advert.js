"use strict";

const mongoose = require("mongoose");

var advertSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    image: String,
    tags: [String]
});

advertSchema.statics.list = function(filter, limit, skip, fields, sort, cb) {
    const query = Advert.find(filter);
    query.limit(limit); // maximum number of documents the query will return.
    query.skip(skip); // number of documents to skip.
    query.select(fields); // document fields to include
    query.sort(sort); // sort order
    query.exec(cb);
};

var Advert = mongoose.model('Advert', advertSchema);