//databse class
var redis = require("redis");
var client = redis.createClient(config.redis.port, config.redis.host);
var Promise = require('promise');
module.exports = class redis {

    async connectToDatabase() {

        client.on('connect', function () {
            console.log("Connected to Redis")
        }).on('error', function (error) {
             console.log(error);
        });
    }

    // cacheData( key, value, callback) {
  
    //         client.hmset(key, value, (error) => { return callback(error) });
   
    // }

    async cacheDataExpire(key, value) {
        return new Promise((res, rej) => {
            console.log(JSON.stringify(key)+" "+JSON.stringify(value))
            client.hmset(key, value, function(err, resolved) { 
                if(err)
                rej()
                else
                res()
             });
           // client.expire(key, 180)
        })

    }

    async getData(key) {
        return new Promise((res, rej) => {
            client.hgetall(key, function (error, results) {
                if (error) {
                    rej()
                } else {
                    res(results)
                }
            })
        })
        
    }

    getKeys(callback) {
            client.keys('*', (error, results) => {
                if (error) {
                    callback(error)
                }
                else {
                    callback(results)
                }
            })
        
    }

    deleteData( key, callback) {
            client.keys('*', (err, results) => {
                client.del(key, error => {
                    callback(error)
                })
            })

        
    }

}