//stari
const query = require("../db/dao/dao.admin.js");
// novi
const ormQuery = require("../db/dao.orm/dao.admin.orm.js");

module.exports = {

  async getAllKupci() {
    console.log("usao u admin service");
    return ormQuery.getAllKupci();
  },
  async getAllProdavci() {
    return ormQuery.getAllProdavci();
  },
  async updateUserStatus(userId, status) {
    return ormQuery.updateUserStatus(userId, status);
  },
  async getAllLanguages() {
    return await ormQuery.getAllLanguages();
  },
  async getAllGenres() {
    return await ormQuery.getAllGenres();

  },
  async deleteLanguage(languageId) {
    return await ormQuery.deleteLanguage(languageId);
  },
  async deleteGenre(genreId) {
    return await ormQuery.deleteGenre(genreId);
  },
  async addLanguage(name) {
    return await ormQuery.addLanguage(name);
  },
  async addGenre(name) {
    return await ormQuery.addGenre(name);
  }
  

}