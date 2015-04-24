var passport = require('./passport');
var utils = require('./authController.js');

module.exports = function (router){
	
// router.post('/signup',passport.authenticate('signup'),utils.createUser);
router.post('/signup',passport.authenticate('signup', {
      successRedirect: '#/tracks/new',
      failureRedirect: '/'
}));
// router.post('/login', passport.authenticate('local'),utils.login);
router.post('/login', passport.authenticate('login',  {
      successRedirect: '#/tracks/new',
      failureRedirect: '/'
}));

router.post('/logout', utils.logout);

router.get('/isLoggedIn', utils.checkLoggedIn);

}

