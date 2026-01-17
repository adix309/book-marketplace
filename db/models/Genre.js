const  Model  = require('../db.orm.js');

class Genre extends Model {
    static get tableName() { return 'genres'; }



}


module.exports = Genre;