const pool = require('./db');

class Halereya {
  static async getAllPaintings() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Halereya');
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async insertPainting(artistSurname, paintingTitle, price, status) {
    const client = await pool.connect();
    try {
      await client.query('INSERT INTO Halereya (artist_surname, painting_title, price, status) VALUES ($1, $2, $3, $4)', [artistSurname, paintingTitle, price, status]);
    } finally {
      client.release();
    }
  }
}

module.exports = Halereya;
