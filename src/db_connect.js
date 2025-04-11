const { Pool } = require('pg');

const pool = new Pool({
  user: 'arv',
  host: 'localhost',
  database: 'userDeviceInfo',
  password: 'password123',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res.rows);
  pool.end();
});