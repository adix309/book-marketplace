var express = require('express');
var router = express.Router();


const buyercontroller = require("../controllers/buyerControler.js");



router.get('/',buyercontroller.profil);
router.get('/cart',buyercontroller.cart);

//post ruta
router.post('/addToCart',buyercontroller.addToCart);


//delete ruta
router.delete('/cart/DeleteItem',buyercontroller.DeleteItem);

//PATCH
router.patch("/cart/OrderItem",buyercontroller.OrderItem);

module.exports = router;