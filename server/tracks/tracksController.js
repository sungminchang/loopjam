var models = require('../database/db');

//TODO
	//Use Passport for User Authentication, employed by the
	//createAccount & signIn

module.exports.createSession = function (req,res,account){
	console.log("this is the session", req.session);
	return req.session.regenerate(function(err){
		req.session.user = account;
	});
}
module.exports.saveTrack = function(req,res){
	//check the current user session
	//save by User and create new Track table
	var trackName = req.body.trackName;
};

module.exports.fetchTracks = function(req,res){
	//retrieve all tracks by a particular ID
	models.Tracks
	.findAll({limit:10, order:'updatedAt DESC'})
	.then(function(tracks){
		res.json(tracks);
	});
};

module.exports.fetchByUser = function(req,res){
	//search Tracks by User
};

