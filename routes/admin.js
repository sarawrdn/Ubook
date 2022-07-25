const express = require('express');
const router = express.Router();
const User = require('../models/User');

//ADMIN
router.get('/admin/homepage', function(req, res) {
    if(req.session.loggedin) {
        //count user
   
         console.log("data session dalam ni => ", req.session.email)
        res.render("Admin/index.ejs");
    } else {
        res.redirect('/login');
    }
});
router.get('/admin/logout', function(req, res) {

    if(req.session.loggedin == true) {
        req.session.loggedin = false;
        req.session.email = '';
        req.session.isUser = null;
    }
    res.redirect('/login');
});
router.get('/admin/account', function(req, res) {

    email = req.session.email;
    if(req.session.loggedin == true) {
        User.findOne({email}, function(err,info){
        res.render('Admin/account.ejs', {info});    
        });
    }
    else
    {
    res.redirect('/login');
    }
});
router.get("/admin/allbook", (req, res) => { res.render("Admin/allbook.ejs");});
router.get('/admin/bookdetails', (req, res) => res.render('Admin/bookdetails.ejs'));
router.get('/admin/pendingbooks', (req, res) => res.render('Admin/pendingbook.ejs'));
router.get('/admin/userlist', (req, res) => res.render('Admin/userlist.ejs'));
router.get('/admin/edituserlist', (req, res) => res.render('Admin/useraccount.ejs'));

module.exports = router;