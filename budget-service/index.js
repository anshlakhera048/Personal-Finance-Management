const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let budgets = [];

app.post('/budget', (req, res) => {
    const { category, limit } = req.body;
    budgets.push({ category, limit });
    res.send({ message: 'Budget added' });
});

app.get('/budgets', (req, res) => {
    res.send(budgets);
});

app.listen(5001, () => console.log('Budget Service running on port 5001'));
