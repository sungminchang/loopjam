var LoopNodeModel = Backbone.Model.extend({
  defaults: {
    url: '',
    //refactor speed to barTime
    speed: 2,
    multiplier: 1,
    source: null,
    gainNode: null,
    recordedAtBpm: null,
    // port: loopNodeForTrack.nextPort(),
    startPlayingTime: null,
    endPlayingTime: null,
    d3Obj: null
  },

});