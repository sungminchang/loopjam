'use strict'
//Module dependencies
var express = require('express');
//Create express server
var app = express();


//Database configuration
var db = require('./server/database/db');

//cors headers
app.all('/', function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});


//Express configuration
require('./routes')(app);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Set up ports
var port = process.env.PORT || 3000;

//Set up server
var server = require('http').createServer(app);

// Listen
server.listen(port, function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;
