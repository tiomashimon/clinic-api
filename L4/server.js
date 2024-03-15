const express = require('express');
const bodyParser = require('body-parser');
const { checkEmployeeExists, logRequests, errorHandler, isValidDayOfWeek, isValidTimeFormat } = require('./middlewares');
const pool = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// GET all clinic employees
app.get('/employees', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM clinic_employees');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new clinic employee with data validation
app.post('/employees', async (req, res) => {
  const { fullName, specialty, schedule } = req.body;

  // Перевірка обов'язкових полів та валідація даних
  if (!fullName || !specialty || !schedule) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { dayOfWeek, start, end, office, area } = schedule;

  if (!isValidDayOfWeek(dayOfWeek)) {
    return res.status(400).json({ error: 'Invalid day of week' });
  }

  if (!isValidTimeFormat(start) || !isValidTimeFormat(end)) {
    return res.status(400).json({ error: 'Invalid time format' });
  }

  try {
    const { rowCount } = await pool.query(
      'INSERT INTO clinic_employees (full_name, specialty, day_of_week, start_time, end_time, office, area) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [fullName, specialty, dayOfWeek, start, end, office, area]
    );
    res.status(201).json({ message: 'Employee added successfully', rowCount });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update an existing clinic employee with data validation
app.put('/employees/:id', checkEmployeeExists, async (req, res) => {
  const { id } = req.params;
  const { fullName, specialty, schedule } = req.body;

  // Перевірка обов'язкових полів та валідація даних
  if (!fullName || !specialty || !schedule) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { dayOfWeek, start, end, office, area } = schedule;

  if (!isValidDayOfWeek(dayOfWeek)) {
    return res.status(400).json({ error: 'Invalid day of week' });
  }

  if (!isValidTimeFormat(start) || !isValidTimeFormat(end)) {
    return res.status(400).json({ error: 'Invalid time format' });
  }

  try {
    const { rowCount } = await pool.query(
      'UPDATE clinic_employees SET full_name = $1, specialty = $2, day_of_week = $3, start_time = $4, end_time = $5, office = $6, area = $7 WHERE id = $8',
      [fullName, specialty, dayOfWeek, start, end, office, area, id]
    );
    res.json({ message: 'Employee updated successfully', rowCount });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE an existing clinic employee
app.delete('/employees/:id', checkEmployeeExists, async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query('DELETE FROM clinic_employees WHERE id = $1', [id]);
    res.json({ message: 'Employee deleted successfully', rowCount });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Логування запитів
app.use(logRequests);

// Обробка помилок
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
