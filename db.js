require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USERNAME||"postgres",
    password: process.env.DB_PASSWORD||"password",
    database:'order_database',
    host: process.env.DB_HOST||"localhost",
    port:5432
})

module.exports = pool