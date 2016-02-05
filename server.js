var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var createServer = require("auto-sni");

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

// Add routes
var router = require("./app/routes/routes.js")

// all of our routes will be prefixed with /api
app.use('/api', router);

// Start listening
createServer({
	email: psiopssoftware@gmail.com, // Emailed when certificates expire. 
	agreeTos: true, // Required for letsencrypt. 
	debug: true, // Add console messages and uses staging LetsEncrypt server. (Disable in production) 
	domains: ["lemmingsontour.nl", "(dev|staging|production).lemmingsontour.nl"], // Optional list of allowed domains (uses pathtoregexp) 
	forceSSL: true, // Make this false to disable auto http->https redirects (default true). 
	ports: {
		http: 80, // Optionally override the default http port. 
		https: 443 // // Optionally override the default https port. 
	}, app);


console.log('Magic happens');