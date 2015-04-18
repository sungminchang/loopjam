define([
  'text!templates/TrackInfoViewTemplate.html'
], function(template){
  var TrackInfoView = Backbone.View.extend({

    template: Handlebars.compile(template),

    initialize: function() {
    },

    events: {
      'click .playMet': 'playMetronome',
      'click .saveTrackBtn': 'saveTrackModel',

    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));

      var port = this.model.get('port');

      $(this.el).find('#slider-vertical' + port).slider({
        orientation: "horizontal",
        range: "min",
        min: 30,
        max: 180,
        value: 120,
        slide: function( event, ui ) {
          $( "#amount" + port ).val( ui.value );
          this.model.changeTempo(ui.value, this.model.get('context').currentTime);
        }.bind(this)
      });


      $( "#amount" + port ).val( $( "#slider-vertical" + port ).slider( "value" ) );

      // this.delegateEvents();

      return this;
    },

    playMetronome: function() {
      var metronomePlaying = this.model.get('metronomePlaying');
      var metronomeNode = this.model.get('metronomeNode');
      var metronomeBuffer = this.model.get('metronomeBuffer');

      if (!metronomePlaying) {
        this.model.set('metronomePlaying', !metronomePlaying);
        this.model.queue(metronomeNode, metronomeBuffer);
      } else {
        this.model.set('metronomePlaying', !metronomePlaying);
        this.model.pause(metronomeNode, metronomeBuffer);
      }

      console.log('tempo changed: ', this.model.get('tempo'));
    },

    saveTrackModel: function(){
      // POST request to server
      var trackName = this.$el.find('.trackName').val();
      this.model.saveTrack(trackName);
    }

  });


  return TrackInfoView;
});