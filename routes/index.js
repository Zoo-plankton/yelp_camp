var express       = require("express");
    User          = require("../models/user"),
    passport      = require("passport");

var router  = express.Router();

//Landing Page
router.get("/", function(req, res){
  res.redirect("/campgrounds");
});

//Authentication - User - New(form)
router.get("/register", function(req,res){
  res.render('register');
})

//Authentication - User Create
router.post('/register', function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
      if (err) {
        return res.render("register", {"error": err.message});
      }
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Account created successfully!");
        res.redirect("/campgrounds");
      });
    });
});

//Authentication - Login
router.get("/login", function(req, res) {
    res.render('login');
})

//Authentication - Login Logic
router.post('/login', passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {});
  
//Logout Route  
router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "Logged out successfully.")
    res.redirect('/campgrounds');
})

module.exports = router;