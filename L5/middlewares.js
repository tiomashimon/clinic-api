const pool = require('./db');

async function checkEmployeeExists(req, res, next) {
  const employeeId = req.params.id;
  try {
    const { rowCount } = await pool.query('SELECT * FROM clinic_employees WHERE id = $1', [employeeId]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    next();
  } catch (err) {
    console.error('Error checking employee existence', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function logRequests(req, res, next) {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
}

function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
}

// Перевірка формату дня тижня (наприклад, може бути 1-7)
function isValidDayOfWeek(day) {
  return Number.isInteger(day) && day >= 1 && day <= 7;
}

// Перевірка формату часу (наприклад, "HH:MM")
function isValidTimeFormat(time) {
  return /^\d{2}:\d{2}$/.test(time);
}

module.exports = { checkEmployeeExists, logRequests, errorHandler, isValidDayOfWeek, isValidTimeFormat };
