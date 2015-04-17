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
    filter: null,
    // port: loopNodeForTrack.nextPort(),
    startPlayingTime: null,
    endPlayingTime: null,
    d3Obj: null,
    recorded: false,
    recording: false,
    playing: false,
    queue: false,
    rerender: false
  },


    record: function(){
      this.trigger("record", this);
    },

    playQueue: function(){
      this.trigger("queue", this);
    },

    pause: function(){
      this.trigger("pause", this);
    },


    initialize: function(){
      this.on('change:volume', function(){
        var volume = Math.floor(this.get('volume'));
        var gainNode = this.get('gainNode')
        gainNode.gain.value = volume / 100;
        console.log('gainNode.gain.value = ', gainNode.gain.value);
       });

      this.on('change:filter', function(changed){

        console.log('changed thing: ', changed);

        // var biquadFilter = this.get('biquadFilterNode');
        // biquadFilter.type = "lowshelf";
        // biquadFilter.frequency.value = volume * 30;
        // biquadFilter.gain.value = 25;
      });

       // this.on('change:recording', function(){
       //    if(this.get('recording') === true){
       //      this.trigger("recording", this)
       //    } else if (this.get('recording') === false && this.get('recorded')) {
       //      this.trigger("playLoop", this)
       //    }
       //  }) 

     }
  });
  return LoopNodeModel;
});