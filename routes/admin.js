const express = require('express');
const Book = require('../models/Book');
const router = express.Router();
const User = require('../models/User');

//ADMIN
router.get('/admin/homepage', function(req, res) {
    if(req.session.loggedin) {
        if(req.session.isUser ===false)
        {
            User.count({isUser:true}, function(err,countuser){
            Book.count({status:'Pending'}, function(err,countbuku){
            Book.count({status:'Approved'}, function(err,countok){
                console.log(countuser);
                console.log(countbuku);
                console.log(countok);
                res.render('Admin/index.ejs', {countuser,countbuku,countok}); 
                     });
                 });
            });
              
        }
        else {res.send('Sorry not authorized');}
    }
    else 
    {
    res.redirect('/login');
    }
});

router.get('/admin/logout', function(req, res) {

    if(req.session.loggedin) {
        if(req.session.isUser ===false)
        {
        req.session.destroy();
        res.redirect('/login');
        }
        else {res.send('Sorry not authorized');}
        }
    else {
         res.redirect('/login');
        }
});
router.get('/admin/account', function(req, res) {
    email = req.session.email;
    if(req.session.loggedin) {
        if(req.session.isUser ===false)
        {
            User.findOne({email}, function(err,info){
            res.render('Admin/account.ejs', {info});    
            });
        }
        else {res.send('Sorry not authorized');}
        }
    else {
         res.redirect('/login');
        }
});
router.get("/admin/allbook", (req, res) => { res.render("Admin/allbook.ejs");});
router.get('/admin/bookdetails', (req, res) => res.render('Admin/bookdetails.ejs'));
router.get('/admin/pendingbooks', (req, res) => res.render('Admin/pendingbook.ejs'));
router.get('/admin/userlist', function(req, res) {
    if(req.session.loggedin) {
        if(req.session.isUser ===false)
        {
            User.find({isUser:true}, function(err,info){
            res.render('Admin/userlist.ejs', {info});    
            });
        }
        else {res.send('Sorry not authorized');}
        }
    else {
         res.redirect('/login');
        }
});
router.get('/admin/edituserlist', (req, res) => res.render('Admin/useraccount.ejs'));

module.exports = router;