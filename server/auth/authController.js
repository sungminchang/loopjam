var models = require('../database/db');
var passport = require("./passport.js");



module.exports.login = function(req, res){

};

module.exports.logout = function (req,res){
	req.logout();
	// req.session.destroy();
	res.redirect('/');
};

module.exports.createUser = function(req,res){
  //No state change on creating a user!
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  //To-Do: hash and store the password
  models.Users
  .find({where:{username:username, email:email}})
  .then(function(user){
    console.log(user);
    if (!user){
      models.Users
      .create({email:email, username:username})
      .then(function(newUser){
        res.json({
          response:"User Created!",
        });
      });
    }
    if (!username || !email || !password){
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
