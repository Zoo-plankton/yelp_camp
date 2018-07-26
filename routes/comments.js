var express       = require("express");
    Campground    = require("../models/campground"),
    Comment       = require("../models/comment"),
    User          = require("../models/user"),
    middleware    = require("../middleware");


var router  = express.Router({mergeParams: true});

//Comment - New(form)
router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
      if(err || !foundCampground){
        req.flash("error", "Campground not found.");
        res.redirect("back");
      } else {
        res.render("comments/new", {campground: foundCampground})
      }
  });
});

//Comment - Create
router.post("/", function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        console.log(err);
        redirect("/campgrounds");
      } else { 
        Comment.create(req.body.comment, function(err, newComment){
          if(err){
            console.log(err);
          } else{
            newComment.author.id = req.user._id;
            newComment.author.username = req.user.username;
            newComment.save();
            foundCampground.comments.push(newComment);
            foundCampground.save();
            req.flash("success", "Comment created successfully!")
            res.redirect("/campgrounds/" + foundCampground._id);
          }
        });
      }
  });
});

//Comment - Edit(form)
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if (err || !campground) {
      req.flash("error", "Campground not found.");
      res.redirect("/campgrounds")
    } else {
      Comment.findById(req.params.comment_id, function(err, comment){
       if (err) {
        console.log(err);
        res.redirect("/campgrounds")
      } else {
        res.render("comments/edit", {comment: comment, campground:campground})
        }
      });
    }
  });
});

//Comment - Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        console.log(err);
        redirect("/campgrounds");
      } else { 
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
          if(err){
            console.log(err);
          } else{
            res.redirect("/campgrounds/" + foundCampground._id);
          }
        });
      }
  });
});

//Comment - Delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
    if(err) {
      console.log(err);
    } else {
      req.flash("success", "Your comment has been removed sucessfully.")
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

module.exports = router;