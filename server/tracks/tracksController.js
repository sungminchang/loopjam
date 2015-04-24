var models = require('../database/db');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var csap = require('../azure/createSharedAccessPolicy.js');

// module.exports.createSession = function (req,res,account){
// 	console.log("this is the session", req.session);
// 	return req.session.regenerate(function(err){
// 		req.session.user = account;
// 	});
// };

module.exports.saveTrack = function(req,res){
	//check the current user session
	//save by User and create new Track table

	//check user loggedIn

	var reqTrack = req.body.audioData;
	var trackName = req.body.trackname;
	var currentDate = Date.now().valueOf().toString();
	var trackHash = crypto.createHash('sha1').update(trackName + currentDate).digest('hex').slice(5);
	var outputURLs = [];
	for (var i = 0; i<reqTrack.length; i++){
		console.log('reqTrack[i].url', reqTrack[i].url.substr(reqTrack[i].url.length - 10));
		if(reqTrack[i].url.substr(reqTrack[i].url.length - 10) !== ".mp3Base64"){
			reqTrack[i].url = crypto.createHmac('sha1', trackName + currentDate).update((Math.random()*10000).toString()).digest('hex').slice(13) + ".mp3Base64";
			outputURLs.push(reqTrack[i].url);			
		}
	}
	console.log('outputURLs', outputURLs);
	reqTrack = JSON.stringify(reqTrack);
		models.Tracks.findOrCreate({where:{trackname:trackName, audioData: reqTrack, trackID: trackHash}})
		.then(function(response){				
		res.send(csap.createSharedAccess(outputURLs, trackHash));
	});

};

module.exports.fetchAllTracks = function(req,res){
	//retrieve all tracks by a particular ID
	models.Tracks
	.findAll({limit:10, order:'"createdAt" DESC'})
	.then(function(response){
		if (!response){
			//in the one case that our site is created, and no tracks have been created.
			res.json('No tracks have been created!');
		}
		res.json(response);
	});
};


module.exports.fetchTrackById = function (req,res){
	var trackHash = req.body.trackID;
	models.Tracks
	.find({where:{trackID:trackHash}})
	.then(function(track){
		console.log(track);
		if (track){
			res.json(track);
		} else if (!track){
			res.json({
				response:'Track doesn\'t exist!'
			});
		}
	});
};

module.exports.fetchTrackByUserID = function(req,res){
	//search Tracks by User
};

