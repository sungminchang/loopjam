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
}, function(username,password, email,done){
  User.find({where: {username:username}})
  .then(function(user){
    if (!user){
      return done(null, false, {message: 'Ain\'t nobody round here wit\' dat name'});
    } else if (user){
      return done(null, user, {message:'User exists!'});
    }
  });

}));

module.exports = passport;
