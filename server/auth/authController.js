var models = require('../database/db');
var passport = require('./passport');
var bcrypt = require('bcrypt-nodejs');


module.exports.login = function(req, res,next){
  //compare password against one from database
};

module.exports.logout = function (req,res){
	req.logout();
	req.session.destroy();
	res.redirect('/');
	// res.send(200);
};


module.exports.createUser = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  models.Users
  .find({where:{username:username}})
  .then(function(user){
    if (!username || !password || !email){
      res.send("Please fill out all forms.");
    }
    if (!user){
      bcrypt.hash(password,null,null,function(err,hash){
        models.Users
        .create({password:hash, username:username, email:email})
        .then(function(newUser){
          res.json(newUser);
        });
      });
    } else if (user){
      res.send('Username already exists!');
    }
  });
}


module.exports.checkLoggedIn = function(req,res,next){
	//if the user is authenticated, continue on to the next function call
	if (req.isAuthenticated()){
		return next();
	}
	//if not authenticated, return them to the main page
	res.redirect('/');
};


//Archaic user checker
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
		} else {
			res.json(results);
		}
	});
};
