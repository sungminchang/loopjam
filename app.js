'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var port = process.env.PORT || 9000;

// var config = require('./config/environment');
// require('./config/express')(app);

var express = require('express');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./routes')(app);

// Start server
server.listen(port, function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;