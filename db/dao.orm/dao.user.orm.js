const Book = require('../models/Book.js');
const User = require('../models/User.js');
const Language = require('../models/Language.js');
const Genre = require('../models/Genre.js');
const Orders = require('../models/Orders.js');
const Cart_item = require('../models/Cart_item.js');

const pool = require('../db');


module.exports = {

  async findall() {
    const res = await Book.query();
    console.log(res, " ---------- koristi se findall");
    return res.rows;
  },

  async GetByEmail(emaill) {
    return await User.query().where('email', emaill).first();;
  },

  async InsertUser(
    first_name,
    last_name,
    email,
    hashedPassword,
    age,
    gender,
    phone,
    country,
    city,
    role,
    status,
    bio,
    selectedGenres,
    selectedLanguages
  ) {
    const user = await User.query().insert({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      age,
      gender,
      phone,
      country,
      city,
      role,
      status,
      bio
    });


    if (selectedGenres.length > 0) {
      await user.$relatedQuery('genres').relate(selectedGenres);
    }

    if (selectedLanguages.length > 0) {
      await user.$relatedQuery('languages').relate(selectedLanguages);
    }


    return { id: user.id, };
  },
  async getUserById(id) {
    const result1 = await User.query().where('id', id).first();
    return result1;;
  },
  async getBooksByUser(id) {
    return await Book.query().where('seller_id', id);
  },

  async addbooks(seller_id, title, author, price, description, status, publication_year,
    genre_id, language_id, condition, exchange_available, publisher) {

    const result1 = await Book.query().insert({
      seller_id,
      title,
      author,
      price,
      description,
      status,
      publication_year,
      genre_id,
      language_id,
      condition,
      exchange_available, publisher
    }).first();
    return [result1];

  },


  async updatebook(id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher) {
    if (!id || !price || !publication_year) {
      throw new Error('Invalid input: id, price, or publication_year is missing or not a number');
    }


    console.log("radim ORM");
    const updatedBook = await Book
      .query()
      .patchAndFetchById(id, {
        title,
        author,
        price,
        description,
        status,
        publication_year,
        genre_id: genre,
        language_id: language,
        condition,
        exchange_available,
        publisher
      });

    if (!updatedBook) {
      throw new Error('Book not found');
    }


    return updatedBook;
  },


  async deletebook(id) {
    const deletedBook = await Book.query()
      .deleteById(id);

    if (!deletedBook) {
      throw new Error("Book not found");
    }

    return deletedBook;
  },

  //prebaci na orm 
  async MyPartFromCart(seller_id) {
    const result = await pool.query(
      `SELECT b.*
FROM books b
WHERE b.seller_id = $1
AND EXISTS (
  SELECT 1
  FROM cart_items ci
  WHERE ci.book_id = b.id
    AND ci.status = 'NARUCENO');  `,
      [seller_id]
    );
    const result1 = await Book
      .query()
      .where('books.seller_id', seller_id)
      .whereExists(
        Cart_item
          .query()
          .select(1)
          .whereRaw('cart_items.book_id = books.id')
          .where('cart_items.status', 'NARUCENO')
      );

    return result1;

  },


  async buyerID(seller_id, book_id) {

    const result1 = await Cart_item.query().where('seller_id', seller_id)
      .andWhere('book_id', book_id).first();
    return result1.buyer_id

  },


  async setOrder(buyer_id, seller_id, book_id, status) {


    await Orders.query().insert({
      buyer_id,
      seller_id,
      book_id,
      status
    });


  },
  async oldOrders(seller_id) {
    console.log("uso sam u old orders")
    const result1 = await Orders.query().where('seller_id', seller_id);
    return result1;
  },

  async getAllLanguages() {
    console.log(" sa orm ispisujem Language ");
    const result1 = await Language.query();
    return result1;
  },

  async getAllGenres() {
    const result1 = await Genre.query();
    return result1;
  }







};
