var models = require('../database/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
  console.log("Serializing", user);
  done(null,user);

});

passport.deserializeUser(function(user,done){
  console.log("Deserializing", user);
  done(null,user);
});


//To-Do
passport.use(new LocalStrategy({
  username: 'username',
  password: 'password'
}, function(username,password, accessToken, email,done){
}));

module.exports = passport;
