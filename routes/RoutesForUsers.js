var express = require('express');
var router = express.Router();


const usercontroller = require("../controllers/usersControler.js");




router.get('/profil',usercontroller.profil);



router.get('/usersLogin',usercontroller.RenderUserLogin);
router.get('/usersRegister',usercontroller.RenderUserRegister);


//ajax
router.post("/RegisterUser",usercontroller.RegisterUser);
router.post("/LoginUser",usercontroller.LoginUser);

// Logout
router.get("/logout", usercontroller.logout);



router.post("/addbooks",usercontroller.addbooks);
router.put("/updatebook/:id",usercontroller.updatebook);
router.delete("/delete/:id",usercontroller.deletebook);


module.exports = router;
