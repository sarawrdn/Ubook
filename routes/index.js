const express = require('express');
const router = express.Router();

//PUBLIC 
router.get("/", (req, res) => { res.render("index.ejs");});
router.get("/allbook", (req, res) => { res.render("allbook.ejs");});//untuk search nnt display ni
router.get('/login', (req, res) => res.render('login.ejs'));
router.get('/register', (req, res) => res.render('register.ejs'));
router.get('/bookdetails', (req, res) => res.render('bookdetails.ejs'));

//USER
router.get("/user/homepage", (req, res) => { res.render("User/index.ejs");});
router.get("/user/account", (req, res) => { res.render("User/account.ejs");});
router.get("/user/allbook", (req, res) => { res.render("User/allbook.ejs");});
router.get('/user/bookdetails', (req, res) => res.render('User/bookdetails.ejs'));
router.get("/user/booklist", (req, res) => { res.render("User/booklist.ejs");});
router.get("/user/addbook", (req, res) => { res.render("User/addbook.ejs");});

//ADMIN
router.get("/admin/homepage", (req, res) => { res.render("Admin/index.ejs");});
router.get("/admin/account", (req, res) => { res.render("Admin/account.ejs");});
router.get("/admin/allbook", (req, res) => { res.render("Admin/allbook.ejs");});
router.get('/admin/bookdetails', (req, res) => res.render('Admin/bookdetails.ejs'));
router.get('/admin/pendingbooks', (req, res) => res.render('Admin/pendingbook.ejs'));
router.get('/admin/userlist', (req, res) => res.render('Admin/userlist.ejs'));
router.get('/admin/edituserlist', (req, res) => res.render('Admin/useraccount.ejs'));

module.exports = router;