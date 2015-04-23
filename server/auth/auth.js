var passport = require('./passport');
var utils = require('./authController.js');

module.exports = function (router){
	
// router.post('/signup',passport.authenticate('signup'),utils.createUser);
router.post('/signup',passport.authenticate('signup'));
// router.post('/login', passport.authenticate('local'),utils.login);
router.post('/login', passport.authenticate('local'));

router.post('/logout', utils.logout);

router.get('/isLoggedIn', utils.checkLoggedIn);

}

