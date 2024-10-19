const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'like_me_2',
  password: 'insomnia2321',
  port: 5432,
});

module.exports = pool;