const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'store',
    password: '',
});
module.exports = db;
