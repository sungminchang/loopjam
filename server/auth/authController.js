var models = require('../database/db');
var passport = require('./passport');



module.exports.login = function(req, res,next){
	passport.authenticate('local', function(){});
};

module.exports.logout = function (req,res){
	req.logout();
	// req.session.destroy();
	res.redirect('/');
};


module.exports.checkLoggedIn = function(req,res){
	//if the user is authenticated, continue on to the next function call
	if (req.isAuthenticated()){
		return next();
	}
	//if not authenticated, return them to the main page
	res.redirect('/');
};


module.exports.checkUser = function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	//Check entered password against database password
	models.Users
	.find({where: {username:username}})
	.then(function(results){
		if (!username || !password){
			res.json({
				response:"Please fill out all forms"
			});
		} else if (!results){
			res.json({
				response:"username doesn't exist"
			});
		}else{
			res.json(results);
		}
	});
};
