var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Models
var Recipe = require("./app/models/recipe")

mongoose.connect("psiops-whats_for_dinner_service-2414574:27017"); 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// all of our routes will be prefixed with /api
app.use('/api', router);

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route("/recipes")
    .post(function(res, req){
        
        var recipe = new 
    });


app.listen(port);
console.log('Magic happens on port ' + port);