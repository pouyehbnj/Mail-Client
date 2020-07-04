var path = require('path');

module.exports = {

    ip: '0.0.0.0',
    port: '3000',

    path: {
        controllers: path.resolve('./controllers'),
        model: path.resolve('./models')
    },
};