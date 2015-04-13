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
    d3Obj: null
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

  events:{
    "hello": function(){
      console.log("Listened to Hello")
    }
  },

  initialize: function(){
     this.on('change:volume', function(){
       var gainNode = this.get('gainNode')
       gainNode.gain.value = this.get('volume') / 100;
       
       this.trigger('volumeChange', this);
     })
   }

});