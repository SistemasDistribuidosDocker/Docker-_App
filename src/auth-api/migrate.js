const Knex = require('knex')

// You can dynamically pass the database name
// as a command-line argument, or obtain it from
// a .env file
const databaseName = process.env.DATABASE
const connection = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.USER_PASSWORD
}

async function main() {
    let knex = Knex({
        client: process.env.CLIENT,
        connection
    })

    const { rows } = await knex.raw('SELECT datname FROM pg_catalog.pg_database');

    if (!rows.some(({ datname }) => datname === databaseName)) {
        // Lets create our database if it does not exist
        await knex.raw('CREATE DATABASE ??', databaseName)
    }

    // Now that our database is known, let's create another knex object
    // with database name specified so that we can run our migrations
    knex = Knex({
        client: process.env.CLIENT,
        connection: {
            ...connection,
            password: process.env.USER_PASSWORD,
            database: databaseName,
        }
    })

    // Now we can happily run our migrations
    await knex.migrate.latest()

    // Done!!
}

main().catch(console.log).then(process.exit)