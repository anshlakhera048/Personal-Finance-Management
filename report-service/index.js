const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 5003;

app.use(cors());

app.get('/report', async (req, res) => {
  try {
    const response = await fetch('http://localhost:5001/expenses');
    const expenses = await response.json();

    const response2 = await fetch('http://localhost:5002/budget');
    const budget = await response2.json();

    const report = budget.map(b => {
      const spent = expenses
        .filter(e => e.category === b.category)
        .reduce((acc, e) => acc + e.amount, 0);
      return {
        category: b.category,
        limit: b.limit,
        spent: spent,
        remaining: b.limit - spent
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Report Service running on http://localhost:${PORT}`);
});
