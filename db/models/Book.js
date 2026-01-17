const Model = require('../db.orm.js');

class Book extends Model{
    static get tableName(){return 'books';}

    static get relationMappings(){
        const Lan = require('./Language.js');
        const Gen = require('./Genre.js');

        return {
            language:{
                relation: Model.BelongsToOneRelation,//1-1
                modelClass: Lan,
                join: {
                    from:'books.language_id',
                    to:'languages.id'
                }
            },
            genre:{
                relation: Model.BelongsToOneRelation,
                modelClass: Gen,
                join:{
                    from:'books.genre_id',
                    to:'genres.id'
                }
            }
        };
    }

}

module.exports=Book;