const express = require('express');
const router = express.Router();
const Halereya = require('./models');

router.get('/', async (req, res) => {
  try {
    const paintings = await Halereya.getAllPaintings();
    res.json(paintings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { artistSurname, paintingTitle, price, status } = req.body;
  try {
    await Halereya.insertPainting(artistSurname, paintingTitle, price, status);
    res.status(201).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
