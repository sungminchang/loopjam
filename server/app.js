'use strict'
//Module dependencies
var express = require('express');
//Create express server
var app = express();
//Express configuration
require('./routes')(app);
//Set up ports
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 9000;
//Set up server
var server = require('http').createServer(app);
// Listen
server.listen(port, function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

//Sockets Setup





// Expose app
exports = module.exports = app;






//Extra, for now
// var config = require('./config/environment');
// require('./config/express')(app);