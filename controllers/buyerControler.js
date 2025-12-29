const buyerservice = require("../services/buyerservice.js");

module.exports = {



    async profil(req, res) {

        const name = await buyerservice.getName(req.signedCookies.user.id);
        const AllBooks = await buyerservice.AllBooks();
        const randomBooks = await buyerservice.AllBooks();
        const recommendedBooks = await buyerservice.AllBooks();


        res.render('ProfilOdBuyera', {
            title: name.first_name,
            buyer_id: req.signedCookies.user.id,
            css: '/stylesheets/Profilbuyer.css',
            AllBooks, randomBooks, recommendedBooks
        });

    },
    async addToCart(req, res) {
        try {
            const buyerId = req.signedCookies.user.id; // ✅ COOKIE
            const { bookId } = req.body;               // ✅ BODY
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
            console.log("zavrsilo");
            const cartstatus = await buyerservice.cartstatus();

            res.render('cart', { BooksFromCart, cartstatus });
        } catch (err) {
            console.log("ne moze", err);


        }
    },
    async DeleteItem(req, res) {
        try {

            const buyerId = req.user.id;       // ili session
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
            console.log("ooooo");
            const buyerId = req.user.id;
            console.log("---------", buyerId);
            const result = await buyerservice.OrderItem(buyerId);
            return res.sendStatus(204);

        } catch (err) {
            return res.status(500).json({ message: "Greska pri narucivanju" });
        }






    }




}