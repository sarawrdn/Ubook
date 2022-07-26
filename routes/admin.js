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
router.get('/admin/pendingbooks', function(req, res) {

    if(req.session.loggedin) {
        if(req.session.isUser === false){
            Book.find({status:'Pending'}, function(err,buku){
            console.log('Ini info', buku);
            res.render('Admin/pendingbook.ejs', {buku});    
            });
        }
    else {res.send('Sorry not authorized');}
    }
    else {
    res.redirect('/login');
    }
});
router.get('/admin/allbooks', function(req, res) {

    if(req.session.loggedin) {
        if(req.session.isUser === false){
            Book.find({status:'Approved'}, function(err,buku){
            console.log('Ini info', buku);
            res.render('Admin/allbook.ejs', {buku});    
            });
        }
    else {res.send('Sorry not authorized');}
    }
    else {
    res.redirect('/login');
    }
});
router.get('/admin/deletebook/:id', function(req, res) {
    if(req.session.loggedin) {
        if(req.session.isUser === false){
    Book.deleteOne({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        res.redirect("/admin/allbooks");
      }
    });
    } else {res.send('Sorry not authorized');}
    }
    else {
        res.redirect('/login');
    }
  });
router.get('/admin/verifybook/:id', function(req, res) {
    if(req.session.loggedin) {
        if(req.session.isUser===false){
    Book.findByIdAndUpdate(req.params.id, {$set: {status: 'Approved'}},function (err, buku) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Product Uploaded!");
        res.redirect("/admin/pendingbooks");
      }
    });
    } else {res.send('Sorry not authorized');}
    }
    else {
        res.redirect('/login');
    }
  });

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
router.get('/admin/deleteuser/:id', function(req, res) {
    if(req.session.loggedin) {
        if(req.session.isUser === false){
    User.deleteOne({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        res.redirect("/admin/userlist");
      }
    });
    } else {res.send('Sorry not authorized');}
    }
    else {
        res.redirect('/login');
    }
  });

module.exports = router;