/*Endpoints
	/tracks
		-landing page for all tracks
	/tracks/signup
		-route to allow user to sign up and create an account.
	/tracks/save/:id
		-route to allow a user to save a track and post to the database
	/tracks/:id
		-allow someone to pull down tracks by id name
	/tracks/user/:id
		-allow a user to pull down tracks that are uniquely associated with their accounts
*/

var utils = require('./tracksController.js');

module.exports = function (router){
	
router.post('/', utils.saveTrack);

router.get('/', utils.fetchTracks);

router.get('/user/:id', utils.fetchByUser);


}


