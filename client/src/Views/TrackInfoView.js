define([
  'text!templates/TrackInfoViewTemplate.html'
], function(template){
  var TrackInfoView = Backbone.View.extend({

    template: Handlebars.compile(template),

    initialize: function() {
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
          this.model.set('tempo', ui.value)
        }.bind(this)
      });


      $( "#amount" + port ).val( $( "#slider-vertical" + port ).slider( "value" ) );


      return this;
    },

    logTempo: function() {
      console.log('tempo changed: ', this.model.get('tempo'));
    } 

  });


  return TrackInfoView;
});