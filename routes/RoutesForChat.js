var express = require('express');
var router = express.Router();



const chatController = require("../controllers/chatController.js");


router.get('/:userId',chatController.chat);






module.exports = router;