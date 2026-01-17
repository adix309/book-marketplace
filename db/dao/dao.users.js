const pool = require('../db');


module.exports = {

  async findall() {
    const res = await pool.query(
      'SELECT * FROM users');
    return res.rows;
  },

  async GetByEmail(emaill) {

    //console.log(emaill);
    const res = await pool.query(
      'SELECT * FROM users WHERE email = $1', [emaill]);
    return res.rows[0] || null;;
  },


  async InsertUser(
    first_name,
    last_name,
    email,
    password,
    age,
    gender,
    phone,
    country,
    city,
    role,
    status,
    bio,
    selectedGenres, selectedLanguages
  ) {
    console.log("iz user dao ", selectedGenres, selectedLanguages);
    const result = await pool.query(
      `INSERT INTO users (
        first_name,
        last_name,
        email,
        password_hash,
        age,
        gender,
        phone,
        country,
        city,
        role,
        status,
        bio
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING
        id,
        first_name,
        last_name,
        email,
        role,
        status`,
      [
        first_name,
        last_name,
        email,
        password,
        age,
        gender,
        phone,
        country,
        city,
        role,
        status,
        bio
      ]
    );

    const id = result.rows[0].id;

    for (let i = 0; i < selectedGenres.length; i++) {
      const genreId = selectedGenres[i];

      await pool.query(
        "INSERT INTO buyer_genres (user_id, genre_id) VALUES ($1, $2)",
        [id, genreId]
      );
    }

    for (let j = 0; j < selectedLanguages.length; j++) {
      const languageId = selectedLanguages[j];
      await pool.query(
        "INSERT INTO buyer_languages (user_id, language_id) VALUES ($1, $2)",
        [id, languageId]
      );
    }


    return result.rows[0];
  },



  async getUserById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async getBooksByUser(id) {
    const result = await pool.query(
      'SELECT * FROM books   WHERE seller_id = $1',
      [id]
    );

    return result.rows;
  },

  async addbooks(seller_id, title, author, price, description, status, publication_year, genre_id, language_id, condition, exchange_available, publisher) {
    console.log("kreno iz dao");
    const result = await pool.query(
      `INSERT INTO books (
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
      exchange_available,
      publisher
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
    RETURNING *`,
      [
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
      ]
    );

    return result.rows;

  },

  async updatebook(id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher) {
    // Provjera da li su numeričke vrijednosti validne
    if (!id || !price || !publication_year) {
      throw new Error('Invalid input: id, price, or publication_year is missing or not a number');
    }
    console.log("trazim publisher iz dao", publisher)
    const result = await pool.query(
      `
    UPDATE books
    SET
      title = $2,
      author = $3,
      price = $4,
      description = $5,
      status = $6,
      publication_year = $7,
      genre_id = $8,
      language_id = $9,
      condition = $10,
      exchange_available = $11,
      publisher = $12
    WHERE id = $1
    RETURNING *
    `,
      [id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher]
    );

    return result.rows[0];
  },


  async deletebook(id) {
    const result = await pool.query(
      `
    DELETE FROM books
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );

    return result.rows[0];
  },

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
    console.log("--------------------", result.rows);
    return result.rows;

  },

  async buyerID(seller_id, book_id) {

    const result = await pool.query(
      `select buyer_id from cart_items where seller_id=$1 and book_id =$2 `, [seller_id, book_id]);
    return result.rows[0].buyer_id;
  },

  async setOrder(buyer_id, seller_id, book_id, status) {
    console.log("iz dao");

    await pool.query(
      ` INSERT INTO orders (buyer_id, seller_id, book_id, status)  VALUES ($1, $2, $3, $4) `,
      [buyer_id, seller_id, book_id, status]
    );
  },
  async oldOrders(seller_id) {

    const result = await pool.query(
      `select * from orders where seller_id=$1  `, [seller_id]);
    return result.rows;

  },

  async getAllLanguages() {
    const result = await pool.query(
      `SELECT * FROM languages `);
    return result.rows;
  },
  async getAllGenres() {
    const result = await pool.query(
      `SELECT * FROM genres `);
    return result.rows;
  }







};
