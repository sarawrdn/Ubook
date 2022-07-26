const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');

//PUBLIC 
router.get('/', function(req, res) {
    if(req.session.loggedin) {
        if(req.session.isUser)
        {
            res.redirect("/user/homepage");
        }
        else{
            res.redirect("/admin/homepage");
        }
    }
    else
    {
        Book.find({status:'Approved'}).exec(function(err,buku){
        console.log(buku);
        res.render('index.ejs', {buku});   
    });
    }
});
router.get("/allbook", (req, res) => { res.render("allbook.ejs");});//untuk search nnt display ni
router.get("/booksearched", (req, res)=>{ 
    var search=req.query.search;
    console.log(search);
    let regex = new RegExp(`^[${search}0-9._-]+$`, "ig");
    Book.find({$or: [{ title: {$regex: search}}, { category: {$regex: search}},{ description: {$regex: search}}]}, function(err,buku){
        console.log(buku);
        res.render('allbook.ejs', {buku});   
      });  
});
router.get('/login', (req, res) => res.render('login.ejs'));
router.post('/login', (req, res) => {

        this.email =  req.body.email;
        this.password = req.body.password;

        User.findOne({ email: this.email }).then(user => {
            if (user) {

                if (user.password == this.password) {
                    //Session Start
                    req.session.loggedin = true;
                    req.session.email = user.email;
                    req.session.isUser = user.isUser;
    
                    if(req.session.isUser) {
                        res.redirect('/user/homepage'); // user-side
                    } else {
                        res.redirect('/admin/homepage') // admin-side
                    }

                } 
                else {
                    res.send({ "Failed": "Wrong password!" });
                }
            } else {
                res.send({ "Failed": "This Email Is not registered!" });
            }
        });
    });
router.get('/register', (req, res) => res.render('register.ejs'));
router.post('/register',(req,res)=> {
        // Data akan datang form -> ejs/html file
        // Data: Email, Password, Name
        // Tambah dekat sini based on input form
        this.email = req.body.email;
        this.password = req.body.password;
        this.name = req.body.name;
    
        // Assume form checking dekat html punya side
        User.findOne({ email: this.email }).then(user => {
            if (user) {
                res.send("Email already exist");
            } 
            else {
              const newUser = new User({
                email: this.email,
                password: this.password,
                name: this.name,
                isUser: true
              });
              newUser.save();
              console.log('User successfully registered =>', newUser);
              res.redirect('/login')
            }
    })
});

router.get('/bookdetails/:id', function(req, res) {
    Book.findOne({_id: req.params.id}).exec(function (err, buku) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("bookdetails.ejs", {buku});
      }
    });
  });

/*
//USER
router.get('/user/homepage', function(req, res) {
    if(req.session.loggedin) {
        console.log("data session dalam ni => ", req.session.email)
        res.render("User/index.ejs");
    } else {
        res.redirect('/login');
    }
});
router.get('/user/logout', function(req, res) {

    if(req.session.loggedin == true) {
        req.session.loggedin = false;
        req.session.email = '';
        req.session.isUser = null;
    }
    res.redirect('/login');
});
router.get('/user/account', function(req, res) {

    email = req.session.email;
    if(req.session.loggedin == true) {
        User.findOne({email}, function(err,info){
        res.render('User/account.ejs', {info});    
        });
    }
    else
    {
    res.redirect('/login');
    }
});


router.get("/user/allbook", (req, res) => { res.render("User/allbook.ejs");});
router.get('/user/bookdetails', (req, res) => res.render('User/bookdetails.ejs'));
router.get("/user/booklist", (req, res) => { res.render("User/booklist.ejs");});
router.get("/user/addbook", (req, res) => { res.render("User/addbook.ejs");});
*/

/*
//ADMIN
router.get("/admin/homepage", (req, res) => { res.render("Admin/index.ejs");});
router.get("/admin/account", (req, res) => { res.render("Admin/account.ejs");});
router.get("/admin/allbook", (req, res) => { res.render("Admin/allbook.ejs");});
router.get('/admin/bookdetails', (req, res) => res.render('Admin/bookdetails.ejs'));
router.get('/admin/pendingbooks', (req, res) => res.render('Admin/pendingbook.ejs'));
router.get('/admin/userlist', (req, res) => res.render('Admin/userlist.ejs'));
router.get('/admin/edituserlist', (req, res) => res.render('Admin/useraccount.ejs'));
*/

module.exports = router;