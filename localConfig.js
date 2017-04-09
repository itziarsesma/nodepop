'use strict';

module.exports = {
    db: {
        connectionString: 'mongodb://localhost/nodepop',
        initialData: 'initialData.json',
        schemasToLoad: 2
    },
    error: {
        MESSAGES: 'errorMessages.json',
        DEFAULT_STATUS_CODE: 500
    },
    jwt: {
        EXPIRES_IN: '2h',
        SECRET_WORD: 'nodepop_segura'
    }
};