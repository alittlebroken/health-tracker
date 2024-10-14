const pg = require('pg');
const { Pool } = pg;

/* set up a connection pool to the DB */
const pool = new Pool({
    host: config.DB_HOST,
    user: config.DB_USER,
    port: config.DB_PORT,
    database: config.DB_NAME,
    password: config.DN_PASS
});

module.exports = {
    query: (sql, values = []) => {
        pool.query(sql, values);
    },
}