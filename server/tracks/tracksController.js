var models = require('../database/db');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var csap = require('../azure/createSharedAccessPolicy.js');

var key = "sprinkle";

//TODO
	//Use Passport for User Authentication, employed by the
	//createAccount & signIn

module.exports.createSession = function (req,res,account){
	console.log("this is the session", req.session);
	return req.session.regenerate(function(err){
		req.session.user = account;
	});
};

module.exports.saveTrack = function(req,res){
	//check the current user session
	//save by User and create new Track table
	
	var reqTrack = req.body.audioData;
	var trackName = req.body.trackname;
	var currentDate = Date.now().valueOf().toString();
	var Track = JSON.parse(reqTrack);
	var outputURLs = [];
	for (var i = 0; i<Track.length; i++){
		Track[i]['url'] = crypto.createHmac('sha1', trackName + currentDate).update((Math.random()*10000).toString()).digest('hex').slice(13);
		outputURLs.push(Track[i]['url']);
	}
	Track = JSON.stringify(Track);
	models.Tracks.findOrCreate({where:{trackname:trackName, audioData: Track}})
  .then(function(response){				
		res.send(csap.createSharedAccess(outputURLs));
	});
		 
};

module.exports.fetchTracks = function(req,res){
	//retrieve all tracks by a particular ID
	models.Tracks
	.findAll({limit:10, order:'"updatedAt" DESC'})
	.then(function(response){
		res.json(response);
	});
};

module.exports.fetchByUser = function(req,res){
	//search Tracks by User
};

