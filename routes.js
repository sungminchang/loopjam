'use strict'
var errors = require('./server/components/errors');
var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app){

//Logger for Development
 app.use(morgan('dev'));
 //Parse JSON
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

//Create Router
var trackRouter = express.Router();
var authRouter = express.Router();


//Require needed routes
require('./server/tracks/tracks')(trackRouter);
require('./server/auth/auth')(authRouter);

//Register our routes
app.use('/tracks', trackRouter);
app.use('/auth', authRouter);

//Serve index files
 app.use(express.static(__dirname + '/client'));
}