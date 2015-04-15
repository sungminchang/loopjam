'use strict'
var errors = require('./components/errors');
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

//Require needed routes
require('./tracks/tracks')(trackRouter);

//Register our routes
app.use('/tracks', trackRouter);

//Serve index files
 app.use(express.static(__dirname + '/../client'));
}