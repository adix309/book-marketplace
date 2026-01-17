//stari
const query = require("../db/dao/dao.users.js");
//novi
const ormQuery = require("../db/dao.orm/dao.user.orm.js");


const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {

  async testpoziv() {
    return query.findall();
  },

  async loginUser(email, password) {
    const user = await ormQuery.GetByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) { throw new Error("Invalid email or password."); }
    return user;

  },

  async registerUser(first_name, last_name, email, password, age, gender, phone, country, city, role, status, bio, selectedGenres, selectedLanguages) {
    const existing = await ormQuery.GetByEmail(email);
    console.log(existing, " ovo je taj rezultattt ");
    if (existing) {
      throw new Error("Email already in use.");  }

    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await ormQuery.InsertUser(first_name, last_name, email, hashedPassword, age, gender, phone, country, city, role, status, bio, selectedGenres, selectedLanguages);
    return newUser;


  },


  async getUserById(id) {
    const res = await ormQuery.getUserById(id);
    return res;


   
  },

  async getBooksByUser(id) {

    return await ormQuery.getBooksByUser(id);

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
    return await ormQuery.addbooks(seller_id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher);

  },



  async updatebook(id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher) {
    if (!id || !price || !publication_year) {
      throw new Error('iz service Invalid input: id, price, or publication_year is missing or not a number');
    }
    return await ormQuery.updatebook(id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher);
  },
  async deletebook(id) {
    return await ormQuery.deletebook(id);
  },

  async MyPartFromCart(seller_id) {

    return await ormQuery.MyPartFromCart(seller_id);
  },

  async buyerID(seller_id, book_id) {
    console.log("iz service buyerID");
    return await ormQuery.buyerID(seller_id, book_id);
  },

  async setOrder(buyer_id, seller_id, book_id, stanje) {
    return await ormQuery.setOrder(buyer_id, seller_id, book_id, stanje);
  },

  async oldOrders(seller_id) {
    return await ormQuery.oldOrders(seller_id);
  },
  async getAllLanguages() {
    return await ormQuery.getAllLanguages();
  },
  async getAllGenres() {
    return await ormQuery.getAllGenres();

  }
}