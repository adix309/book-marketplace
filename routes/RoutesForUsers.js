var express = require('express');
var router = express.Router();


const usercontroller = require("../controllers/usersControler.js");

const { requireRole } = require('../auth/requireRole');





router.get('/usersLogin',usercontroller.RenderUserLogin);
router.get('/usersRegister',usercontroller.RenderUserRegister);

router.post("/RegisterUser",usercontroller.RegisterUser);
router.post("/LoginUser",usercontroller.LoginUser);



router.use(requireRole('Prodavac'));

router.get('/profil',usercontroller.profil);
router.get('/cart',usercontroller.cart);
router.get('/oldOrders',usercontroller.oldOrders);
//ajax

router.post("/addbooks",usercontroller.addbooks);
router.put("/updatebook/:id",usercontroller.updatebook);

router.post("/setOrder",usercontroller.setOrder);

// Logout
router.get("/logout", usercontroller.logout);


//delete
router.delete("/delete/:id",usercontroller.deletebook);



module.exports = router;
