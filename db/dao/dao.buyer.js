const pool = require('../db');


module.exports = {

  async AllBooks() {

    const result = await pool.query('select * from books');

    return result.rows;
  },
  async getName(id) {
    const result = await pool.query('select first_name from users where id=$1', [id]);
    console.log(result.rows[0]);
    return result.rows[0];
  },

  async addToCart(buyer_id, book_id) {
    const result = await pool.query(
      ` INSERT INTO cart_items (buyer_id, book_id)
    VALUES ($1, $2)
    RETURNING *    `, [buyer_id, book_id]);

    return result.rows[0];
  },

  async BooksFromCart(buyer_id) {
    const result = await pool.query(
      `
        SELECT b.*
        FROM cart_items ci
        JOIN books b ON b.id = ci.book_id
        WHERE ci.buyer_id = $1
        `,
      [buyer_id]
    );

    return result.rows;
  },

  async DeleteItemFromCart(buyer_id, book_id) {
    return await pool.query(
      `DELETE FROM cart_items
        WHERE buyer_id = $1 AND book_id = $2 `,
      [buyer_id, book_id]
    );

  },

  async OrderItem(buyerId) {
    return await pool.query(
      `UPDATE cart_items
    SET status = 'NARUCENO'
    WHERE buyer_id = $1
        AND status = 'U_KORPI' `, [buyerId]);
  },

  async cartstatus() {
    const result = await pool.query(
      `SELECT * FROM cart_items`
    );

    return result.rows;
  }








}
