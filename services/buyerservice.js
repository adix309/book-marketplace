const query = require("../db/dao/dao.buyer.js");



module.exports = {

    async AllBooks() {

        return await query.AllBooks();
    },

    async getName(id) {
        return await query.getName(id);
    },

    async addToCart(buyer_id, book_id) {
        console.log("iz service");
        const seller_id = await query.findSeller(book_id);
        console.log(seller_id,"--------------------",buyer_id);
        return await query.addToCart(buyer_id, book_id,seller_id);
    },

    async BooksFromCart(buyer_id) {

        return await query.BooksFromCart(buyer_id);
    },

    async DeleteItemFromCart(buyerId, bookId) {


        return await query.DeleteItemFromCart(buyerId, bookId);
    },
    async OrderItem(buyerId) {
        console.log("iz service OrderItem");
        return await query.OrderItem(buyerId);

    },
    async cartstatus() {
        console.log("iz service cartstatus");
        return await query.cartstatus();
    }


}