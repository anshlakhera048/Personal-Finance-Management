const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let expenses = [];

app.post('/expense', (req, res) => {
    const { category, amount } = req.body;
    expenses.push({ category, amount });
    res.send({ message: 'Expense added' });
});

app.get('/expenses', (req, res) => {
    res.send(expenses);
});

app.listen(5002, () => console.log('Expense Service running on port 5002'));