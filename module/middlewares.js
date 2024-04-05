const { saveRequestData } = require('./models');
const { validateParams, validateBigSumParams } = require('./validation');

function requestLogger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body:`, req.body);
  next();
}

async function saveRequest(req, res, next) {
  try {
    await saveRequestData(req.path, req.query, res.locals.result);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateZ(req, res, next) {
  try {
    validateParams(req.query);
    const { x, y } = req.query;
    res.locals.result = 2 * parseInt(x) + 3 * parseInt(y);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function calculateBigSum(req, res, next) {
  try {
    validateBigSumParams(req.query);
    const { n } = req.query;
    let sum = 0;
    for (let i = 1; i <= parseInt(n); i++) {
      sum += (i - 2) / (i + 1);
    }
    res.locals.result = sum;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { requestLogger, saveRequest, calculateZ, calculateBigSum };
