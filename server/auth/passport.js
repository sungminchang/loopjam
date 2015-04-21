var models = require('../database/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
  console.log(user);
  done(null,user);

});

passport.deserializeUser(function(user,done){
  console.log(user);
  done(null,user);

});

passport.use(new LocalStrategy({
  usernameField: 'username',
  emailField: 'email',
  passwordField: 'password'
}, function(username,password, accessToken, email,done){

}));



module.exports = passport;
