const express = require('express');
const router = express.Router();
const User = require('../models/user');

//index.js ni macam homepage kot. 
router.get("/", (req, res) => {
    res.render("index.ejs"); // send index(homepage) refers to index.ejs
   });

// Login Call Front 
router.get('/login', (req, res) => res.render('login.ejs'));

//Login API will redidrect to dashboard
router.post('/login', (req, res, next) => {
});


//Register Call Front
router.get('/register', (req, res) => res.render('register.ejs'));

router.get('/details', (req, res) => res.render('bookdetails.ejs'));

//Register API will redirect to login


module.exports = router;