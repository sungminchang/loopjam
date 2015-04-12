'use strict'


var errors = require('./components/errors');
var express = require('express');
var session = require('express-session');
module.exports = function (app){



 //To-Do Insert routes here



 // All other routes should redirect to the index.html
  // app.route('/*')
  //   .get(function(req, res) {
  //     res.sendfile(app.get('appPath') + '/index.html');
  //   });
    app.use(express.static(__dirname + '/../client'));
    // app.get('*', function(req, res){
    //   res.sendFile(__dirname + '/../client/index.html');
    // });
}