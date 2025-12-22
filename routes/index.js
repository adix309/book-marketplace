var express = require('express');
var router = express.Router();


const indexcontroller = require("../controllers/indexControler.js");



router.get('/',indexcontroller.indexfunction);
router.get('/testBaza',indexcontroller.testBaze);







 

module.exports = router;
