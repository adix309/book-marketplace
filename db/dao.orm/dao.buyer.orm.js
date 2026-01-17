const Book = require('../models/Book.js');
const User = require('../models/User.js');
const Cart_item = require('../models/Cart_item.js')


module.exports = {

    async AllBooks() {
        console.log("uso u orm za allBooks ");
        const result = await Book.query()
            .leftJoin('languages', 'languages.id', 'books.language_id')
            .leftJoin('genres', 'genres.id', 'books.genre_id')
            .select('books.*',
                'languages.name AS language_name',
                'genres.name AS genre_name'
            );
        const result1 = await Book
            .query()
            .withGraphFetched('[language, genre]');

        //console.log("obicni rezultat ",result);
        // console.log("sa relation maping rezultat ",result1);
        return result1;
    }
    ,
    async getName(id) {
        const result = await User.query().select('first_name').where('id', id).first();
        return result;
    },

    async addToCart(buyer_id, book_id, seller_id) {
        console.log("dodajem sa orm ");
        const result = await Cart_item.query().insert({ buyer_id, book_id, seller_id });
        console.log("rezultat sa ormom ", result);
    },

    async BooksFromCart(buyer_id) {
        console.log("cart item sa ORM ");
        const result = await Cart_item.query().
            join('books', 'books.id', 'cart_items.book_id').
            where('cart_items.buyer_id', buyer_id).
            select('books.*');
        const items = await Cart_item
            .query()
            .where('buyer_id', buyer_id)
            .withGraphFetched('book');

        const result1 = items.map(item => item.book);
        //ili sam ovo mogo rjesit nekako bolje ?



       // console.log("obicni rezultat ", result);
       // console.log("sa relation maping rezultat ", result1);


        return result1;
    },

    async DeleteItemFromCart(buyer_id, book_id) {
        const result = await Cart_item.query().delete().where({ buyer_id, book_id });
    },

    async OrderItem(buyerId) {
        const result = await Cart_item.query().patch({ status: 'NARUCENO' })
            .where('buyer_id', buyerId).andWhere('status', 'U_KORPI');;
        console.log("ovo je rezultat ", result);
    },

    async cartstatus() {
        return await Cart_item.query();
    },
    async findSeller(book_id) {
        const result = await Book.query().select('seller_id').where('id', book_id).first();
        return result.seller_id;
    }




}
