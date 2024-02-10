// Update with your config settings.
require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.USER_PASSWORD.toString()
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.USER_PASSWORD.toString()
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.USER_PASSWORD.toString()
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
