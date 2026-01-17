const Language = require('../models/Language.js');
const Genre = require('../models/Genre.js');
const User = require('../models/User.js');

module.exports = {
    async getAllKupci() {
        return await User.query().where('role','Kupac');
    },

    async getAllProdavci() {
        return await User.query().where('role','Prodavac');
    },

    async updateUserStatus(userId, status) {
        return await User.query().patch({ status }).where('id',userId);
    },
    async getAllLanguages() {
        const result =  await Language.query();
       
        return result;
    },
    async getAllGenres() {
        const result =  await Genre.query();
        return result;
    },
    async deleteLanguage(languageId) {
        return await Language.query().deleteById( languageId );
    },
    async deleteGenre(genreId) {
        return await Genre.query().deleteById( genreId );
    },
    async addLanguage(name) {
        return await Language.query().insert({ name });
    },
    async addGenre(name) {
  
       return await Genre.query().insert({ name });
    }


}