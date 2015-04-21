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
  models.Users
  .find({where:{username:username}}).success(function(user){
    if (!user){
      return done(null, false, {message: 'User does not exist.'});
    }
  });
}));


// module.exports.createUser = function(req,res){
//   //No state change on creating a user!
//   var username = req.body.username;
//   var email = req.body.email;
//   var password = req.body.password;
//   //To-Do: hash and store the password
//   models.Users
//   .find({where:{username:username, email:email}})
//   .then(function(user){
//     console.log(user);
//     if (!user){
//       models.Users
//       .create({email:email, username:username})
//       .then(function(newUser){
//         res.json({
//           response:"User Created!",
//         });
//       });
//     }
//     if (!username || !email || !password){
//       res.json({
//         response:"Please fill out all forms."
//       });
//     }else if (user){
//       res.json({
//         response:"Error-User already exists"
//       });
//     }
//   });
// };

module.exports = passport;
