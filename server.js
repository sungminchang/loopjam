'use strict'
//Module dependencies
var express = require('express');
var cors = require('cors');
//Create express server
var app = express();

//Database configuration
var db = require('./server/database/db');

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
