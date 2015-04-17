var utils = require('./authController.js');

module.exports = function (router){
	
router.post('/signup', utils.createUser);

router.get('/signin', utils.checkUser);


}

