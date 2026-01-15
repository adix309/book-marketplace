const query = require("../db/dao/dao.admin.js");


module.exports = {

  async getAllKupci() {
    console.log("usao u admin service");
    return query.getAllKupci();
  },
  async getAllProdavci() {
    return query.getAllProdavci();
  },
  async updateUserStatus(userId, status) {
    return query.updateUserStatus(userId, status);
  },
  async getAllLanguages() {
    return await query.getAllLanguages();
  },
  async getAllGenres() {
    return await query.getAllGenres();

  },
  async deleteLanguage(languageId) {
    return await query.deleteLanguage(languageId);
  },
  async deleteGenre(genreId) {
    return await query.deleteGenre(genreId);
  },
  async addLanguage(name) {
    return await query.addLanguage(name);
  },
  async addGenre(name) {
    return await query.addGenre(name);
  }
  

}