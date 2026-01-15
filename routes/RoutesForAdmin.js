var express = require('express');
var router = express.Router();



const admincontroller = require("../controllers/adminController.js");


router.get('/',admincontroller.adminProfil);

//POST
router.post('/languages', admincontroller.addLanguage);
router.post('/genres', admincontroller.addGenre);

//DELETE
router.delete("/languages/:id", admincontroller.deleteLanguage);
router.delete("/genres/:id", admincontroller.deleteGenre);


// routes/admin.js
router.post('/block/:id', admincontroller.blockUser);

module.exports = router;