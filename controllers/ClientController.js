var imaps = require('imap-simple');
module.exports = new class ClientController {
    constructor() {
        this.models = {
            
        }
    }

    

    async login(req,res) {
        
       
        var config = {
            imap: {
                user: 'test.dehghanpour@gmail.com',
                password: 'zahra22554440',
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 3000
            }
        };
         
        imaps.connect(config).then(function (connection) {
         
            return connection.openBox('INBOX').then(function () {
                var searchCriteria = [
                    'UNSEEN'
                ];
         
                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT'],
                    markSeen: false
                };
         
                return connection.search(searchCriteria, fetchOptions).then(function (results) {
                    var subjects = results.map(function (res) {
                        return res.parts.filter(function (part) {
                            return part.which === 'HEADER';
                        })[0].body.subject[0];
                    });
         
                    console.log(subjects);
                    // =>
                    //   [ 'Hey Chad, long time no see!',
                    //     'Your amazon.com monthly statement',
                    //     'Hacker Newsletter Issue #445' ]
                });
            });
        });

        return res.status(200).json({
            success: true
        })
    }

}