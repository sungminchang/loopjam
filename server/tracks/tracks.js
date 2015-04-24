var utils = require('./tracksController.js');

module.exports = function (router){
	
  //specify for user
router.post('/', utils.saveTrack);

router.post('/:id', utils.fetchTrackById);

router.get('/', utils.fetchAllTracks);

router.get('/user/:id', utils.fetchTrackByUserID);

}


