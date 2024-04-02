const { Pool } = require('pg');

const pool = new Pool({
  user: 'tioma',
  host: 'localhost',
  database: 'clinicdb',
  password: '20clinicdb24',
  port: 5432, 
});

module.exports = pool;
