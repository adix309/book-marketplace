const Model = require('../db.orm.js');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Lan = require('./Language.js');
    const Gen = require('./Genre.js');

    return {
      genres: {
        relation: Model.ManyToManyRelation,
        modelClass: Gen,
        join: {
          from: 'users.id',
          through: {
            from: 'buyer_genres.user_id',
            to: 'buyer_genres.genre_id'
          },
          to: 'genres.id'
        }
      },

      languages: {
        relation: Model.ManyToManyRelation,
        modelClass: Lan,
        join: {
          from: 'users.id',
          through: {
            from: 'buyer_languages.user_id',
            to: 'buyer_languages.language_id'
          },
          to: 'languages.id'
        }
      }
    };
  }
}

module.exports = User;
