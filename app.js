var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local");
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds.js"),
    methodOverride = require("method-override");

var campgroundsRoute = require("./routes/campgrounds.js"),
    commentsRoute    = require("./routes/comments.js"),
    indexRoute       = require("./routes/index.js");

mongoose.connect(process.env.DATABASEURL);

app.use(require("express-session")({
  secret: "now i know what im doing",
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride("_method"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// seedDB();

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.use(indexRoute);
app.use("/campgrounds/:id/comments", commentsRoute);
app.use("/campgrounds", campgroundsRoute);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server is listening!")
});