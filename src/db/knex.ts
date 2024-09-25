import knex from 'knex';
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    },
    pool: { min: 1, max: 10 }
});

export { db };