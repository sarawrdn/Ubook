const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

//EJS
app.set("view engine", "ejs");
app.use('/public', express.static('public'));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/User', require('./routes/users.js'));


const PORT = process.env.PORT || 5000;

app.listen (PORT, console.log(`Server started on port ${PORT}`));