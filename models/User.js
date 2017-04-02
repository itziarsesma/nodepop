"use strict";

const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var User = mongoose.model('User', userSchema);