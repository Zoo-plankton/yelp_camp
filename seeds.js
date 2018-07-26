var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


data = [
    {
       name:"Camp Turajo",
       image:"https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg",
       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Pharetra et ultrices neque ornare. Molestie a iaculis at erat pellentesque. Massa eget egestas purus viverra accumsan in nisl nisi."
    }, 
    {
        name:"The Crossroads",
        image:"https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Pharetra et ultrices neque ornare. Molestie a iaculis at erat pellentesque. Massa eget egestas purus viverra accumsan in nisl nisi."

    },
    {
        name:"Thousand Needles",
        image:"https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5259404.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Pharetra et ultrices neque ornare. Molestie a iaculis at erat pellentesque. Massa eget egestas purus viverra accumsan in nisl nisi."

    }
]

function seedDB(){
    Campground.remove({}, function(err,camp) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campgrounds removed!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Campground created");
                        Comment.create(
                            {
                            text: "Lok'tar ogar.",
                            author: "Thrall"
                            }, function(err, comment){
                               if (err) {
                                   console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Comment Created");
                                }
                        });
                    }
                });
            });
        }
    });
};


module.exports = seedDB;