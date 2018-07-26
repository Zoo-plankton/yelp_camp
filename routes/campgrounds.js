var express       = require("express");
    Campground    = require("../models/campground"),
    Comment       = require("../models/comment"),
    methodOverride = require("method-override"),
    middleware    = require("../middleware");


var router  = express.Router();

router.use(methodOverride("_method"))

//Campground - Index
router.get("/", function(req, res){
  Campground.find({}, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index" , {campground: campground});
    }
  });
});

//Campground - Create
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var description = req.body.description;
  var newCamp = {name: name, image: image, description:description, author: author};
  Campground.create(newCamp, function(err, createdCamp){
    if (err){
      console.log(err);
    } else {
      req.flash("success", "Your new campground has been created!");
      res.redirect("/campgrounds");
    }
  })
});

//Campground - New(form)
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//Campground - Show
router.get("/:id", function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/show", {campground: foundCampground})
    }
  });
});

//Campground - Edit(form)
router.get("/:id/edit", middleware.checkCampOwnership, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      res.render("campgrounds/edit", {campground: campground})
    }
  });
});

//Campground - Update 
router.put("/:id", middleware.checkCampOwnership, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var editedCamp = {name:name, image:image, description:description};
  Campground.findByIdAndUpdate(req.params.id, editedCamp, function(err, camp){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      req.flash("success", name + " has been updated successfully!")
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Campground - Delete
router.delete("/:id", middleware.checkCampOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds/" + req.params.id + "/edit");
    } else {
      req.flash("success", "Campground has been removed successfully.")
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;