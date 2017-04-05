"use strict";

const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true},
    password: {
        type: String,
        required: true}
});
userSchema.index({email: 1}, { unique: true });

var User = mongoose.model('User', userSchema);