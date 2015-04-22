define([
  'text!templates/LoopNodeInfoViewTemplate.html'
], function(template){
  var LoopNodeInfoView = Backbone.View.extend({

    initialize: function(){
      this.model.on('change:volume', this.changeVolume, this);
      this.model.on('change:playing', this.rerecordButtonDisable, this);
    },

    events:{
      'click .re-record': function() {
        this.model.record();
        this.model.set('recorded', !this.model.get('recorded'));
        this.model.set('queue', !this.model.get('queue'));
        this.model.set('rerender', !this.model.get('rerender')); 
      },
      'click .play': function() {
        this.model.play();
        // console.log("record")
      },
      'click .pause': function() {
        this.model.pause();
        // console.log("record")
      },
      'click .remove': function() {
        this.model.removeLoopNode();
      },
      'change .volumeControl': function(){
        
      }
      
    },

    template: Handlebars.compile(template),

    render: function() {

      this.$el.html(this.template(this.model.attributes));

      var port = this.model.get('port');
      var volume = this.model.get('volume');

      this.$el.find('.slider-vertical' + port).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: volume,
        slide: function( event, ui ) {
          $( ".amount" + port ).val( ui.value );
          console.log('volume will be set to ', ui.value);
          this.model.set('volume', ui.value)
        }.bind(this)
      });
      
      $( ".amount" + port ).val( $( ".slider-vertical" + port ).slider( "value" ) );

      return this;
    },

    changeVolume: function(){
      var port = this.model.get('port');
      var volume = this.model.get('volume');

      this.$el.find('.slider-vertical' + port).slider( "option", "value" , volume);
      $( ".amount" + port ).val( $( ".slider-vertical" + port ).slider( "value" ) );
    },

    rerecordButtonDisable: function(){
      var playing = this.model.get('playing');

      if(playing){
        $('.re-record').prop('disabled', true);
      } else {
        $('.re-record').prop('disabled', false);
      }

    }

    
  });

  return LoopNodeInfoView;
});