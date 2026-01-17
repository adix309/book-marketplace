const Model = require('../db.orm.js');

class Cart_item extends Model{
    static get tableName(){ return 'cart_items';}



    static get relationMappings(){
        const bookClass = require('./Book.js');

        return{
            book:{
                relation: Model.BelongsToOneRelation,
                modelClass:bookClass,
                join:{
                    from:'cart_items.book_id',
                    to:'books.id'
                }
            }
        };
    }
}

module.exports=Cart_item;