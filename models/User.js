"use strict";

const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});
userSchema.index({email: 1});

var User = mongoose.model('User', userSchema);