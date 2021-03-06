'use strict';

const fs = require('fs');
const config = require('../localConfig');

module.exports = function(req, res, errorCode, status) {
    const defaultLang = 'en';

    let reqLang = null;
    if (req.headers['accept-language']) {
        reqLang = req.headers['accept-language'];
    }

    /* se podria sacar como promesa que devolviera messages */
    fs.readFile(config.error.MESSAGES, 'utf8', function (err, data) {
        if (err) {
            console.log('Can not load error descriptions ' + config.error.MESSAGES, err);
            return;
        }
        const messages = JSON.parse(data);

        let description = messages[defaultLang][errorCode];
        if (messages && reqLang && messages[reqLang] && messages[reqLang][errorCode]) {
            description = messages[reqLang][errorCode];
        }
        res.status(status || config.error.DEFAULT_STATUS_CODE).json({sucess: false, errorCode: errorCode, errorDescription: description});
    });
};