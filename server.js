var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var config = require("./config.js")

// TODO: Create deploy routine to droplet
// TODO: Move routes to their own files, best practice
// TODO: Implement token based authentication
// TODO: Add swagger stuff to this api

// Models
var Recipe = require("./app/models/recipe")

mongoose.connect(config.db.host + ":27017"); 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// all of our routes will be prefixed with /api
app.use('/api', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route("/recipes")
    .post(function(req, res){
        
        var recipe = new Recipe();
        
        recipe.name = req.body.name;
        
        recipe.save(function(err){
            if(err){
                res.send(err);
            }
                
            res.json({message: "Recipe created!"})
        })
    })

    .get(function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err){
                res.send(err);
            }

            res.json(recipes);
        });
    });

app.listen(port);
console.log('Magic happens on port ' + port);