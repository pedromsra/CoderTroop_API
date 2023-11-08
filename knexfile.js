const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: {
      url: "postgres://lwrheget:re5BfoWX6j2nNFZ7ZHJL_GexuEdfjdVq@suleiman.db.elephantsql.com/lwrheget",
      host: "suleiman.db.elephantsql.com",
      port: "5432",
      user: "lwrheget",
      password: "re5BfoWX6j2nNFZ7ZHJL_GexuEdfjdVq",
      database:"lwrheget",
      ssl: {rejectUnauthorized: false},
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true,
  }
};
