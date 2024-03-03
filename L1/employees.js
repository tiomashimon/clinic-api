const express = require('express');
const router = express.Router();

let employees = [];

// Зчитування списку працівників
router.get('/', (req, res) => {
    res.json(employees);
});

// Створення нового працівника
router.post('/', (req, res) => {
    const employee = req.body;
    employees.push(employee);
    res.status(201).send('Employee added successfully');
});

// Оновлення інформації про працівника за його ідентифікатором
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedEmployee = req.body;
    employees[id] = updatedEmployee;
    res.send('Employee updated successfully');
});

// Видалення працівника за його ідентифікатором
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    employees = employees.filter((employee, index) => index !== id);
    res.send('Employee deleted successfully');
});

module.exports = router;
