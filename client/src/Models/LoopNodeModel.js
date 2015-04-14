define([
], function(){
var LoopNodeModel = Backbone.Model.extend({
  defaults: {
    url: '',
    //refactor speed to barTime
    speed: 2,
    multiplier: 1,
    source: null,
    volume: 100,
    gainNode: null,
    recordedAtBpm: null,
    // port: loopNodeForTrack.nextPort(),
    startPlayingTime: null,
    endPlayingTime: null,
    d3Obj: null,
    play: false,
    recording: false,
    recorded: true
  },


    record: function(){
      console.log("inLoopNodeModel")
      this.trigger("record", this);
    },

    play: function(){
      this.trigger("play", this);
    },

    pause: function(){
      this.trigger("pause", this);
    },


    initialize: function(){
       this.on('change:volume', function(){
         var gainNode = this.get('gainNode')
         gainNode.gain.value = this.get('volume') / 100
       });

       this.on('change:recording', function(){
        debugger
        if(this.get('recording') === false){
          this.trigger("recording", this)
          console.log("Start Recording!")
        } else if (this.get('recording') === true && this.get('recorded')) {
          this.trigger("playLoop", this)
          console.log("finished Recording!")
        }
      })

     }
  });
  return LoopNodeModel;
});