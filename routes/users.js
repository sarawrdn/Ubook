// Importing the module
const express=require("express")
  
// Creating express Router
const router=express.Router()
  
// Handling login request
router.get("/",(req,res,next)=>{
    res.render("User/index"); // send index(homepage) refers to index.ejs
})
module.exports=router