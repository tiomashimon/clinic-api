const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
const halereyaRoutes = require('./routes/halereyaRoutes');
app.use('/halereya', halereyaRoutes);

// Background task
const calculateTotalPrice = require('./backgroundTasks/calculateTotalPrice');
calculateTotalPrice();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
