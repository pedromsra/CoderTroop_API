const path = require("path")


// DESIRED METHOD, BUT I GET A LOT OF PROBLEMS WITH MY PSQL HOST, WITH JUST 5 CONNECTIONS,
//THEN I HAVE TO USE SQLITE IN DEV AND PROD ENVIROMMENT
// module.exports = {
//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: path.resolve(__dirname, "src", "database", "database.db")
//     },
//     pool: {
//       afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
//     },
//     migrations: {
//       directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
//     },
//     useNullAsDefault: true
//   },
//   production: {
//     client: 'pg',
//     connection: {
//       url: process.env.DB_URL,
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       ssl: { rejectUnauthorized: false },
//     },
//     pool: { min: 0, max: 5 },
//     migrations: {
//       directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
//     }
//   }
// };

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
  }
};
