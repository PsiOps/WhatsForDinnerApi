var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Start the app
var app = express();

// Load configuration
var config = require("./config.js")

// TODO: Implement token based authentication
// TODO: Add swagger stuff to this api

// Connect to db
mongoose.connect(config.db.host + ":27017"); 

// configure app to use bodyParser. This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;

// Add routes
var router = require("./app/routes/routes.js")

// all of our routes will be prefixed with /api
app.use('/api', router);

// Start listening
app.listen(port);
console.log('Magic happens on port ' + port);