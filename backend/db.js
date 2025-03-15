const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to wise Database..');
}).catch((err) => {
    console.log("Error connecting to the database: " + err);
})