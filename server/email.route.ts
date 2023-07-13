const express  = require("express");
const router  = express.Router();
var emailController = require('./email-controller')

router.get('/send-email', emailController.sendMessage);

export {};

module.exports = router;