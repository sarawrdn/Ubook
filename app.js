const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

//EJS
app.set("view engine", "ejs");
app.use('/public', express.static('public'));

// Routes
app.use('/', require('./routes/index.js'));

const PORT = process.env.PORT || 5000;

app.listen (PORT, console.log(`Server started on port ${PORT}`));