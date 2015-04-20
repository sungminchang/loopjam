var utils = require('./authController.js');

module.exports = function (router){
	
router.post('/signup', utils.createUser);

router.get('/login', utils.checkUser);

router.post('/logout',utils.logout);

router.post('/isLoggedIn', utils.checkLoggedIn);

}

