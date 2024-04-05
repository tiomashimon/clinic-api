const pool = require('./db');

async function saveRequestData(endpoint, params, result) {
  try {
    const client = await pool.connect();
    const queryText = 'INSERT INTO requests (endpoint, params, result) VALUES ($1, $2, $3)';
    const values = [endpoint, JSON.stringify(params), result];
    await client.query(queryText, values);
    client.release();
  } catch (error) {
    console.error('Error saving request data:', error);
  }
}

module.exports = { saveRequestData };
