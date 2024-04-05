const express = require('express');
const { saveRequest, calculateZ, calculateBigSum } = require('./middlewares');

const router = express.Router();

router.use(saveRequest);

router.get('/calculate', calculateZ, (req, res) => {
  res.json({ result: res.locals.result });
});

router.get('/bigsum', calculateBigSum, (req, res) => {
  res.json({ result: res.locals.result });
});

module.exports = router;
