const express = require('express');
const app = express();
const employeesRouter = require('./employees');

app.use(express.json());

// Підключення маршрутів 
app.use('/employees', employeesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
