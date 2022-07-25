const {Client} = require("pg");
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'pita2',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'tournament',
})
module.exports = pool;
