const Book = require('../models/Book.js');
const User = require('../models/User.js');
const Cart_item = require('../models/Cart_item.js')
const Order =     require('../models/Orders.js');


module.exports = {

    async AllBooks() {
        
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
    },
    async MyOrderBooks(buyer_id){

        const result = await Order.query().where('buyer_id',buyer_id); 
        return result;
    },
    async BookCommentRating(order_id,book_rating,comment){
        const result = await Order.query().patch({ book_rating: book_rating, comment: comment })
        .where('id', order_id);
        return result;

    },
    async rateSeller(seller_id,seller_rating){
        seller_rating = Number(seller_rating); 
        
        const seller = await User.query().select('user_rating','number_of_ratings').where('id',seller_id).first();
        const currentAverage = seller.user_rating || 0;
        const currentCount = seller.number_of_ratings || 0;
        // novu prosjecnu ocjenu
        const newCount = currentCount + 1;
        console.log(seller_rating,"stara prosjecna ----novi broj ocjena --------------",newCount);
        const newAverage = ((currentAverage * currentCount) + seller_rating) / newCount;
        console.log("nova prosjecna ocjena -------------",newAverage);
        //azurirati sellerja
        await User.query().patch({ user_rating: newAverage, number_of_ratings: newCount })
            .where('id', seller_id);
     
            return newAverage;
    }

}
