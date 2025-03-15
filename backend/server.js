// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const errHandler = require('./middlewares/errorHandlerMiddleware');
const PORT = process.env.PORT || 5002;
require("./db");

require('dotenv').config();

const app = express();
app.use(bodyParser.json()); //pass incoming json data
app.use(cors());
//call Routes
app.use('/', userRouter);
app.use(errHandler);

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
