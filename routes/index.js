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
router.get("/booksearched", (req, res)=>{ 
    var search=req.query.search;
    console.log(search);
    let regex = new RegExp(`^[${search}0-9._-]+$`, "ig");
    Book.find({ title: {$regex: search},status:'Approved'}, function(err,buku){
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

  router.get('/about', (req, res) => res.render('about.ejs'));

module.exports = router;