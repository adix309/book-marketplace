const query = require("../db/dao/dao.users.js");
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {

  async testpoziv() {
    return query.findall();
  },

  async loginUser(email, password) {
    const user = await query.GetByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) { throw new Error("Invalid email or password."); }
    return user;

  },

  async registerUser(first_name, last_name, email, password, age, gender, phone, country, city, role, status, bio, selectedGenres, selectedLanguages) {
    const existing = await query.GetByEmail(email);
    if (existing) {
      throw new Error("Email already in use.");  }

    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await query.InsertUser(first_name, last_name, email, hashedPassword, age, gender, phone, country, city, role, status, bio, selectedGenres, selectedLanguages);
    return newUser;


  },


  async getUserById(id) {
    const res = await query.getUserById(id);
    return res;


    return result.rows[0];
  },

  async getBooksByUser(id) {

    return await query.getBooksByUser(id);

  },

  async addbooks(
    seller_id,
    title,
    author,
    price,
    description,
    status,
    publication_year,
    genre,
    language,
    condition,
    exchange_available,
    publisher
  ) {
    console.log("radi");
    return await query.addbooks(seller_id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher);

  },



  async updatebook(id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher) {
    if (!id || !price || !publication_year) {
      throw new Error('iz service Invalid input: id, price, or publication_year is missing or not a number');
    }
    return await query.updatebook(id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher);
  },
  async deletebook(id) {
    return await query.deletebook(id);
  },

  async MyPartFromCart(seller_id) {

    return await query.MyPartFromCart(seller_id);
  },

  async buyerID(seller_id, book_id) {
    console.log("iz service buyerID");
    return await query.buyerID(seller_id, book_id);
  },

  async setOrder(buyer_id, seller_id, book_id, stanje) {
    return await query.setOrder(buyer_id, seller_id, book_id, stanje);
  },

  async oldOrders(seller_id) {
    return await query.oldOrders(seller_id);
  },
  async getAllLanguages() {
    return await query.getAllLanguages();
  },
  async getAllGenres() {
    return await query.getAllGenres();

  }
}