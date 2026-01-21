//stari 
const query = require("../db/dao/dao.buyer.js");
// novi
const ormQuery = require("../db/dao.orm/dao.buyer.orm.js");


module.exports = {

    async AllBooks() {
        return await ormQuery.AllBooks();
    },

    async getName(id) {
        return await ormQuery.getName(id);
    },

    async addToCart(buyer_id, book_id) {
        const seller_id = await ormQuery.findSeller(book_id);
        return await ormQuery.addToCart(buyer_id, book_id, seller_id);
    },

    async BooksFromCart(buyer_id) {

        return await ormQuery.BooksFromCart(buyer_id);
    },

    async DeleteItemFromCart(buyerId, bookId) {
        return await ormQuery.DeleteItemFromCart(buyerId, bookId);
    },
    async OrderItem(buyerId) {
        console.log("iz service OrderItem");
        return await ormQuery.OrderItem(buyerId);

    },
    async cartstatus() {
        return await ormQuery.cartstatus();
    },async MyOrderBooks(buyer_id){
        return await ormQuery.MyOrderBooks(buyer_id);

    },
    async BookCommentRating(order_id,book_rating,comment){
        return await ormQuery.BookCommentRating(order_id,book_rating,comment);
    },
    async rateSeller(seller_id,seller_rating){
        return await ormQuery.rateSeller(seller_id,seller_rating);
    }


}