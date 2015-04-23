define([
  'text!templates/LoopNodeEntryRecPausePlayViewTemplate.html'],
  function(template){
    var LoopNodeEntryPlayPauseView = Backbone.View.extend({

    initialize: function(){

      this.model.on('playLoop', this.render, this)
      this.model.on('change:rerender', this.render, this)
      this.model.on('disableRecord', this.disableRecord, this)
    },

    events:{
      'click .record-new': function() {
        console.log("record click")
        this.model.record();
        this.model.trigger('recording');
        this.model.set('queue', !this.model.get('queue'));
        this.model.set('rerender', !this.model.get('rerender'));        
      },
      'click .play': function() {
        this.model.playQueue();
        this.model.set('queue', !this.model.get('queue'));
        this.model.set('rerender', !this.model.get('rerender'));  
        
      },
      'click .pause': function() {
        this.model.pause();
        this.model.set('playing', !this.model.get('playing'))
        this.model.set('rerender', !this.model.get('rerender'));
      }
    },

    template: Handlebars.compile(template),


    render: function() {
      var recorded = this.model.get('recorded');
      var recording = this.model.get('recording');
      var queue = this.model.get('queue');
      var playing = this.model.get('playing');
  
      this.$el.html(this.template(this.model.attributes));
      // Pre-recording
      if(queue && !recording && !playing && !recorded){
        console.log("Queue View Activated")
        $("#" + "loopNodeRecord" + this.model.get('port')).children().children().attr('class', 'record-wait');
        $("#" + "loopNodeRecord" + this.model.get('port')).click(false);
      }

      // Recording
      if(!queue && recording && !playing && !recorded){
        $("#" + "loopNodeRecord" + this.model.get('port')).children().children().css('fill', 'red');
        console.log("Recording View Activated") 
        $("#" + "loopNodeRecord" + this.model.get('port')).click(false);
      }

      console.log("activated --- ", "queue: ", queue, " recording: " , recording," playing: " , playing, " recorded: ", recorded)

      // Playing
      if(!queue && !recording && playing && recorded){
        console.log("Playing View Activated")
        $("#" + "loopNodePause" + this.model.get('port')).css("display", "inline");
        $("#" + "loopNodeRecord" + this.model.get('port')).css("display", "none");
        // setTimeout(function(){$("#" + "loopNodePlay" + this.model.get('port')).click()}.bind(this),400);
      }

      // Paused
      if(!queue && !recording && !playing && recorded){
        console.log("Paused View Activated")          
        $("#" + "loopNodePlay" + this.model.get('port')).css("display", "inline");
        $("#" + "loopNodeRecord" + this.model.get('port')).css("display", "none");

      }

      if(queue && !recording && !playing && recorded){
        console.log("play Queue Activated")

        $("#" + "loopNodePlay" + this.model.get('port')).css("display", "inline").children().children().attr('class', 'play-wait')
        $("#" + "loopNodeRecord" + this.model.get('port')).css("display", "none")
        $("#" + "loopNodePlay" + this.model.get('port')).click(false);
      }

      return this;
    },

    disableRecord: function() {
      this.stopListening('click .record-new');
      setTimeout(function() {this.$('.record-new').listenTo('click')}.bind(this), 1000);
    }
    
  });
  return LoopNodeEntryPlayPauseView;
});