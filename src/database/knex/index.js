require('process')
const config = require("../../../knexfile.js");

const knex = require("knex");

const connection = process.env.NODE_ENV ? knex(config.production) : knex(config.development);

module.exports = connection;