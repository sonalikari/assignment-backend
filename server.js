const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/exchange-rate', async (req, res) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const exchangeRate = response.data.rates;
    res.json({ rates: exchangeRate });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/convert', async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;

    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const exchangeRate = response.data.rates;

    const convertedAmount = (amount * exchangeRate[toCurrency]) / exchangeRate[fromCurrency];

    res.json({ convertedAmount });
  } catch (error) {
    console.error('Error converting currency:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
