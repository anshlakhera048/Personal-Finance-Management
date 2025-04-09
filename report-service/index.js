const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/report', async (req, res) => {
    const budgets = await (await fetch('http://localhost:5001/budgets')).json();
    const expenses = await (await fetch('http://localhost:5002/expenses')).json();

    const report = budgets.map(b => {
        const totalSpent = expenses
            .filter(e => e.category === b.category)
            .reduce((sum, e) => sum + e.amount, 0);

        return {
            category: b.category,
            limit: b.limit,
            spent: totalSpent,
            remaining: b.limit - totalSpent
        };
    });

    res.send(report);
});

app.listen(5003, () => console.log('Report Service running on port 5003'));
