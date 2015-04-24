var models = require('../database/db');
var passport = require('passport');
var utils = require('./authController.js');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user,done){
  console.log("Serializing", user);
  done(null,user);

});

passport.deserializeUser(function(user,done){
  console.log("Deserializing", user);
  done(null,user);
});


passport.use('login', new LocalStrategy({
  username: 'username',
  password: 'password'
}, function(username,password, done){
  models.Users.find({where: {username:username}})
    .then(function(user){
      console.log('checking passport user...', user);
    if (!user){
      return done(null, false, {message: 'That user does not exist!'});
    } else if (!utils.isValidPassword(user,password)){
      return done(null, user, {message:'Invalid password!'});
    } else if (user){
      //verify password
      return done(null, user, {message:'User exists!'});
    }
  });
}));

passport.use('signup', new LocalStrategy({},
  function(req, username,password, email, done){
    models.Users.find({where: {username:username}})
    .then(function(user){
      if(!username || !email || !password){
        return done(null, false, {message: 'Please fill out all forms!'});
      } else if (!user){
        bcrypt.genSalt(10,function(err,salt){
          bcrypt.hash(password,salt,null,function(err,hash){
            models.Users
            .create({password:hash,username:username,email:email, salt:salt});
          });
        });
        return done(null,false,{message:'User Created!'});
      } else if (user){
        return done(null,false,{message:'User already exists!'});
      }
    });
}));





module.exports = passport;
