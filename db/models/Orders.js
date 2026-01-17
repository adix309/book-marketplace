const  Model  = require('../db.orm.js');

class Order extends Model {
    static get tableName() { return 'orders'; }


}


module.exports = Order;