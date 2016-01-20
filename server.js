var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var config = require("./config.js")

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

var router = require("./app/routes/routes.js")

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);