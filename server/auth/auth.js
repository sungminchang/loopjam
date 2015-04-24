var passport = require('./passport');
var utils = require('./authController.js');

module.exports = function (router){
	
// router.post('/signup',passport.authenticate('signup'),utils.createUser);
router.post('/signup',passport.authenticate('signup', {
      successRedirect: '/',
      failureRedirect: '#/tracks/new'
}));
// router.post('/login', passport.authenticate('local'),utils.login);
router.post('/login', passport.authenticate('login',  {
      successRedirect: '#/tracks/new',
      failureRedirect: '/'
}));

// router.get('/login', function(req, res) {
//   res.send();
// });

router.post('/logout', utils.logout);

router.get('/isLoggedIn', utils.checkLoggedIn);

router.get('/signup', function(req, res){
  console.log("user bro", req.user);
  res.status(200).send('YOU GOOD MAN')
})

}

