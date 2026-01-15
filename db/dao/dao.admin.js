const pool = require('../db');


module.exports = {
    async getAllKupci() {
        const res = await pool.query(
            "SELECT * FROM users WHERE role='Kupac'");
        return res.rows;
    },

    async getAllProdavci() {
        const res = await pool.query(
            "SELECT * FROM users WHERE role='Prodavac'");
        return res.rows;
    },

    async updateUserStatus(userId, status) {
        return await pool.query(
            'UPDATE users SET status = $1 WHERE id = $2',
            [status, userId]
        );
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
    },
    async deleteLanguage(languageId) {
        console.log("DAO deleting language with ID:", languageId);
        return await pool.query(
            'DELETE FROM languages WHERE id = $1',
            [languageId]
        );
    },
    async deleteGenre(genreId) {
        console.log("DAO deleting genre with ID:", genreId);
        return await pool.query(
            'DELETE FROM genres WHERE id = $1',
            [genreId]
        );
    },
    async addLanguage(name) {
        console.log("DAO adding language with name:", name);
        return await pool.query(
            'INSERT INTO languages (name) VALUES ($1)',
            [name]
        );
    },
    async addGenre(name) {
       
        return await pool.query(
            'INSERT INTO genres (name) VALUES ($1)',
            [name]
        );
    }


}