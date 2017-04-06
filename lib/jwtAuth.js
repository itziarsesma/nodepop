"use strict";

const jwt = require('jsonwebtoken');
const customError = require('./customError');
const config = require('../localConfig');

module.exports = function(req, res, next) {
    const token = req.body.token || req.query.token || req.get('x-access-token');
    if(!token) {
        return customError(req, res, "USR_NO_TOKEN", 401);
    }
    jwt.verify(token, config.jwt.SECRET_WORD, function(err, tokenDecoded) {
        if(err) {
            return customError(req, res, "USR_INVALID_TOKEN", 401);
        }
        req.email = tokenDecoded.email;
        next();
    });
}