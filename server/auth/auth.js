var utils = require('./authController.js');

module.exports = function (router){
	
// router.post('/signup', utils.createUser);

router.get('/login', utils.login);

router.post('/logout',utils.logout);

router.post('/isLoggedIn', utils.checkLoggedIn);

}

