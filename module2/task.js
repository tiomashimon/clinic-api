const { Client } = require('pg');
const pool = require('./db');

async function calculateTotalPrice() {
  const client = new Client({
    user: 'tioma',
    host: 'localhost',
    database: 'clinicdb',
    password: '20clinicdb24',
    port: 5432, 
  });

  try {
    await client.connect();
    const result = await client.query('SELECT SUM(price) AS total_price FROM Halereya');
    console.log('Total price of all paintings:', result.rows[0].total_price);
  } catch (err) {
    console.error('Error calculating total price:', err);
  } finally {
    await client.end();
  }
}

module.exports = calculateTotalPrice;
