const buyerservice = require("../services/buyerservice.js");

const userservice = require("../services/userservice.js");//ovo sam stavio radi alllanguages i allgenres


module.exports = {



    async profil(req, res) {

        const name = await buyerservice.getName(req.signedCookies.user.id);
        const AllBooks = await buyerservice.AllBooks();
        const randomBooks = await buyerservice.AllBooks();
        const recommendedBooks = await buyerservice.AllBooks();

        const alllanguages = await userservice.getAllLanguages();
        const allgenres = await userservice.getAllGenres();


        const onlineUsers = req.app.get("onlineUsers");
        onlineUsers.delete(req.signedCookies.user.id);
        const online = Array.from(onlineUsers.keys());


        res.render('ProfilOdBuyera', {
            title: name.first_name,
            buyer_id: req.signedCookies.user.id,
            css: '/stylesheets/Profilbuyer.css',
            AllBooks, randomBooks, recommendedBooks,alllanguages,allgenres,online
        });

    },
    async addToCart(req, res) {
        try {
            const buyerId = req.signedCookies.user.id; 
            const { bookId } = req.body;               
            console.log("buyer:", buyerId);
            console.log("book:", bookId);

            await buyerservice.addToCart(buyerId, bookId);
            return res.sendStatus(200);

        } catch (err) {
            console.log("ne moze")
            res.status(400).json({ message: "Ne mogu dodati u korpu" });
        }
    },
    async cart(req, res) {
        try {
            const buyer_id = req.signedCookies.user.id;
            const BooksFromCart = await buyerservice.BooksFromCart(buyer_id);
            const cartstatus = await buyerservice.cartstatus();

            const MyOrderBooks = await buyerservice.MyOrderBooks(buyer_id);

            console.log(" sve sto sam ja narucio ",MyOrderBooks);

            

            res.render('cart', { BooksFromCart, cartstatus,MyOrderBooks });
        } catch (err) {
            console.log("ne moze", err);


        }
    },
    async DeleteItem(req, res) {
        try {

            const buyerId = req.user.id;       
            const { bookId } = req.body;

            const DeleteItemFromCart = await buyerservice.DeleteItemFromCart(buyerId, bookId);
            console.log("doso")
            return res.sendStatus(204);
        } catch (err) {

            return res.status(500).json({ message: "Greska pri brisanju" });
        }
    },

    async OrderItem(req, res) {
        try {
            const buyerId = req.user.id;
            const result = await buyerservice.OrderItem(buyerId);
            return res.sendStatus(204);

        } catch (err) {
            return res.status(500).json({ message: "Greska pri narucivanju" });
        }

    },
    async review(req,res){
        try{
            console.log("doso evo ti req.body",req.body,"---",req.body.book_rating,"---",req.body.comment);
            const result = await buyerservice.BookCommentRating(req.body.order_id,req.body.book_rating,req.body.comment);
            
            const result1= await buyerservice.rateSeller(req.body.seller_id,req.body.seller_rating);
      
            return res.sendStatus(200);


        }catch(err){ return res.status(500).json({ message: "Greska pri ocjenjivanju" });}


    },

    logout(req, res) {
    res.clearCookie("user");
    res.redirect("/users/login");
},





}