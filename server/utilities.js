var models = require('./database/db');

//TODO
	//Use Passport for User Authentication, employed by the
	//createAccount & signIn

module.exports.createSession = function (req,res,account){
	console.log("this is the session", req.session);
	return req.session.regenerate(function(err){
		req.session.user = account;
	});
}

module.exports.createUser = function(req,res){
	//No state change on creating a user!
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	//To-Do: hash and store the password
	models.Users
	.find({where:{username:username}})
	.then(function(user){
		if (!user){
			models.Users
			.create({where:{email:email, username:username}})
			.then(function(newUser){
				res.json({
					response:"User Created!",
				});
			});
		}
		if (!username || !email){
			res.json({
				response:"Please fill out all forms."
			});
		}else if (user){
			res.json({
				response:"Error-User already exists"
			});
		}
	});
};

module.exports.checkUser = function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	//Check entered password against database password
	models.Users
	.find({where: {username:username}})
	.then(function(results){
		if (!username){
			res.json({
				response:"Please fill out all forms"
			});
		} else if (!results){
			res.json({
				response:"username doesn't exist"
			});
		}else{
			console.log("SUCCESS MUTHABITCH!");
			res.json(results);
		}
	});
};

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

