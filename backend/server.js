// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5002;
require("./db");

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
