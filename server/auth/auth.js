var utils = require('./authController.js');
var passport = require('./passport');

module.exports = function (router){
	
router.post('/signup', utils.createUser);

router.get('/login', passport.authenticate('local'),utils.login);

router.post('/logout',utils.logout);

router.post('/isLoggedIn', utils.checkLoggedIn);

}

