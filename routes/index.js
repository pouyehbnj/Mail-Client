const express = require('express')
const router = express.Router()
const ClientController = require(`${config.path.controllers}/ClientController`)
router.post('/login', ClientController.login.bind(ClientController))



module.exports = router