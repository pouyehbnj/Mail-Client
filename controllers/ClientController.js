var imaps = require('imap-simple');
var jwt = require('jsonwebtoken');
var CircularJSON = require('circular-json');
var promise = require('promise');
var htmlToText = require('html-to-text');
var nodemailer = require('nodemailer');
//var config = require("./config");
module.exports = new class ClientController {
    constructor() {
        this.models = {

        }
    }

    async getUserByToken(token) {
        return new promise((res, rej) => {
            const redisDatabase = require(`${config.path.database}/redis`);
            const redisDatabaseObj = new redisDatabase();
            redisDatabaseObj.getData(token).then(userInfo => {
                console.log(userInfo)
                res(userInfo)
            })
        })

    }
    async fetchMails(box, connection, filter, emails = []) {
        return new promise(async (res, rej) => {
            var email = {}
            await connection.openBox(box).then(function () {
                var searchCriteria = [
                    filter
                ];

                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT'],
                    markSeen: false
                };

                connection.search(searchCriteria, fetchOptions).then(async function (results) {
                   // console.log(results[0])
                    await results.forEach(result => {
                        
                        email = {}
                        email["date"] = result.parts[1].body.date[0].slice(0,22)
                        email["subject"] = result.parts[1].body.subject[0]
                        email["from"] = result.parts[1].body.from[0]
                        email["status"] = filter
                        email["uid"]=result.attributes.uid
                        var text = htmlToText.fromString(result.parts[0].body, {
                            wordwrap: 130
                        });

                        email["text"] = text

                        emails.push(email)
                       

                    })
                    //console.log(emails)
                    res(emails)

                })



                //  })

            })
            
        })
    }

    async login(req, res) {
        console.log("req.bodyyyyyy:")
        console.log(req.body)
        var hostMail
        if (req.body.email.includes("gmail"))
            hostMail = 'imap.gmail.com'
         else hostMail = 'imap.mail.yahoo.com'
        var configConn = {
            imap: {
                user: req.body.email,
                password: req.body.password,
                host: hostMail,
                port: 993,
                tls: true,
                authTimeout: 9000
            }
        };
        var token = jwt.sign(configConn, "secretKey");
        console.log("token:" + token)
        const redisDatabase = require(`${config.path.database}/redis`);
        const redisDatabaseObj = new redisDatabase();
        redisDatabaseObj.cacheDataExpire(token.toString(), configConn.imap).then(result => {
            // if(result){
            console.log("savedddddddd")
            imaps.connect(configConn).then(function (connection) {
                if (connection) {
                    connection.end()
                    return res.status(200).json({
                        success: true,
                        token: token
                    })
                }else{
                    return res.status(400).json({
                        success: false,
                        message: "wrong credentials"
                    })
                }

            })
            // .catch(err =>{
            //     return res.status(400).json({
            //         success: false,
            //         message: "wrong credentials"
            //     })
            // })

            // }
        })


    }

    async receiveEmails(req, res) {

        var that = this
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ')
            var bearerToken = bearer[1]
            req.token = bearerToken
        }

        this.getUserByToken(req.token).then(user => {
            var emails = []
            var email = {};
            imaps.connect({ imap: user }).then(async function (connection) {
                await that.fetchMails('INBOX', connection, 'UNSEEN',emails).then(async UnseenResualt => {
                    emails = UnseenResualt
                    console.log("unseens:")
                    console.log(emails)
                    await that.fetchMails('INBOX', connection, 'SEEN', emails).then(async seenResualt => {
                        emails = seenResualt
                        console.log("seens:")
                        console.log(emails)
                        await emails.sort((a, b) => new Date(b.date) - new Date(a.date));
                    })
                })
                connection.end()
                return res.status(200).json({
                    success: true,
                    emails: emails
                })

            });
        })



    }

    async sendEmail(req, res) {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ')
            var bearerToken = bearer[1]
            req.token = bearerToken
        }

        this.getUserByToken(req.token).then(user => {
            if(user.host.includes("yahoo"))
                user.host = 'smtp.mail.yahoo.com'
            var transporter = nodemailer.createTransport({
                host: user.host,
                secure: false,
                auth: {
                    user: user.user,
                    pass: user.password
                },

                tls: {
                    rejectUnauthorized: false
                }
            });

            var mailOptions = {
                from: user.user,
                to: req.body.to,
                subject: req.body.subject,
               // text: req.body.text,
                html:req.body.text
            }
            console.log(mailOptions)
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Failed to Send Email.')
                } else {
                    console.log('Email Sent')
                    return res.status(200).json({
                        success: true,
                        message: "email successfully sent to " + req.body.to
                    })

                }
            })

        })
    }

    async receiveSentEmails(req, res) {
        var that = this
        
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ')
            var bearerToken = bearer[1]
            req.token = bearerToken
        }

        this.getUserByToken(req.token).then(user => {
            imaps.connect({ imap: user }).then(async function (connection) {
                var hostMail
                if (user.host.includes("gmail"))
                    hostMail = 'Gmail'
                else hostMail = 'Yahoo'
                await that.fetchMails('[' + hostMail + ']/Sent Mail', connection, 'ALL', []).then(emails => {
                    console.log(emails)
                    connection.end()
                    return res.status(200).json({
                        success: true,
                        emails: emails
                    })
                })
            })
        })
    }

    async deleteEmails(req,res) {
        var that = this
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ')
            var bearerToken = bearer[1]
            req.token = bearerToken
        }

        this.getUserByToken(req.token).then(user => {
            imaps.connect({ imap: user }).then(async function (connection) {
                connection.openBox('INBOX').then(function () {
                connection.addFlags(req.body.uid, '\\Deleted', function(err) {
                    console.log("Done")
                    connection.end()
                    return res.status(200).json({
                        success: true,
                        emails: 'Email Successfully Deleted'
                    })
                })
            })
            })
        })

    }


    async markSeen(req,res) {
        var that = this
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ')
            var bearerToken = bearer[1]
            req.token = bearerToken
        }

        this.getUserByToken(req.token).then(user => {
            imaps.connect({ imap: user }).then(async function (connection) {
                connection.openBox('INBOX').then(function () {
                connection.addFlags(req.body.uid, '\\Seen', function(err) {
                    console.log("Done")
                    connection.end()
                    return res.status(200).json({
                        success: true,
                        emails: 'Email Successfully Marked As Seen'
                    })
                })
            })
            })
        })

    }

    async receiveDeletedEmails(req, res) {
        var that = this
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ')
            var bearerToken = bearer[1]
            req.token = bearerToken
        }

        this.getUserByToken(req.token).then(user => {
        imaps.connect({ imap: user }).then(async function (connection) {
            connection.openBox('INBOX').then(function () {
               
                    var searchCriteria = [
                        'Deleted'
                    ];

                    var fetchOptions = {
                        bodies: ['HEADER', 'TEXT'],
                        markSeen: false
                    };

                    connection.search(searchCriteria, fetchOptions).then(async function (results) {
                        console.log(results)
                    })
                
            })
        })
    })

    }
    async getNumberOfEmails(req,res){
        var that = this
        var hostMail 

        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ')
            var bearerToken = bearer[1]
            req.token = bearerToken
        }

        this.getUserByToken(req.token).then(user => {
            imaps.connect({ imap: user }).then(async function (connection) {
            that.fetchMails('INBOX', connection, 'UNSEEN',[]).then(async UnseenResult => {
                console.log("unseen:"+UnseenResult.length)
                if (user.host.includes("gmail"))


                
                    hostMail = 'Gmail'
                else hostMail = 'Yahoo'
                await that.fetchMails('[' + hostMail + ']/Sent Mail', connection, 'ALL', []).then(sentResult => {
                    console.log("unseen:"+sentResult.length)
                    connection.end()
                    return res.status(200).json({
                        success: true,
                        inbox: UnseenResult.length,
                        sent:sentResult.length
                    })

                })
                
            })
        })
    })
    }

}