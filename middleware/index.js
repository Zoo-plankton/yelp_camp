var middlewareObj = {};

middlewareObj.checkCampOwnership = function(req, res, next) {
  if (req.isAuthenticated){
      Campground.findById(req.params.id, function(err, campground){
      if (err || !campground) {
        req.flash("error", "Oops! Something when wrong while trying to find that campground.")
        res.redirect("back");
      } else {
        if (campground.author.id.equals(req.user.id)){
        next();
        } else {
          req.flash("error", "You do not have permission to do that.");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
  if (req.isAuthenticated){
      Comment.findById(req.params.comment_id, function(err, comment){
      if (err || !comment) {
        req.flash("error", "Oops! Something when wrong while trying to find that comment.")
        res.redirect("back");
      } else {
        if (comment.author.id.equals(req.user.id)){
         next();
        } else {
          req.flash("error", "You do not have permission to do that.")
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You must be logged in to do that.");
  res.redirect('/login');
};

module.exports = middlewareObj