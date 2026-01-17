const  Model  = require('../db.orm.js');

class Language extends Model {
    static get tableName() { return 'languages'; }


}


module.exports = Language;