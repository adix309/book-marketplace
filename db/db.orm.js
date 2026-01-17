const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
});

Model.knex(knex);

module.exports = Model;
