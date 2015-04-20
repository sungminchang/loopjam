'use strict'
//Module dependencies
var express = require('express');
//Create express server

var app = express();

var cors = require('cors');

//Database configuration
var db = require('./server/database/db');

//Express configuration
require('./routes')(app);

// allow cross origin requests
app.use(cors());

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Set up ports
var port = process.env.PORT || 3000;

//Set up server
var server = require('http').createServer(app);

server.listen(port, function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;

