var path = require('path');

module.exports ={

    ip: '0.0.0.0',
    port: '5000',

    path: {
        controllers: path.resolve('./controllers'),
        model: path.resolve('./models'),
        database: path.resolve('./database')
    },

    redis:{
       // database: 'CacheDB',
        host: '192.168.97.194',
        port: '6379'
    }
}
