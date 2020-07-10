const express = require('express')
const router = express.Router()
const ClientController = require(`${config.path.controllers}/ClientController`)
router.post('/login', ClientController.login.bind(ClientController))



router.get('/receive/emails',ClientController.receiveEmails.bind(ClientController))
router.get('/receive/sent/emails',ClientController.receiveSentEmails.bind(ClientController))
router.get('/receive/deleted/emails',ClientController.receiveDeletedEmails.bind(ClientController))

router.delete('/delete/emails',ClientController.deleteEmails.bind(ClientController))
router.post('/mark/seen',ClientController.markSeen.bind(ClientController))

router.post('/send/email',ClientController.sendEmail.bind(ClientController))



module.exports = router