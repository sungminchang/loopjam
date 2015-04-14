define([
  'text!templates/LoopNodeInfoViewTemplate.html'
], function(template){
  var LoopNodeInfoView = Backbone.View.extend({

    initialize: function(){
      this.model.on('change:volume', this.changeVolume, this);
    },

    events:{
      'click .record-new': function() {
        this.model.record();
        // console.log("record")
      },
      'click .play': function() {
        this.model.play();
        // console.log("record")
      },
      'click .pause': function() {
        this.model.pause();
        // console.log("record")
      },
      'change .volumeControl': function(){
        
      }
      
    },

    template: Handlebars.compile(template),

    render: function() {

      this.$el.html(this.template(this.model.attributes));

      var port = this.model.get('port')
      this.$el.find('.slider-vertical' + port).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: 100,
        slide: function( event, ui ) {
          $( ".amount" + port ).val( ui.value );
          this.model.set('volume', ui.value)
        }.bind(this)
      });
      
      $( ".amount" + port ).val( $( ".slider-vertical" + port ).slider( "value" ) );

      return this;
    },

    changeVolume: function(){
      var port = this.model.get('port');
      this.$el.find('.slider-vertical' + port).slider( "option", "value" , this.model.get('volume'));
      $( ".amount" + port ).val( $( ".slider-vertical" + port ).slider( "value" ) );
    }

    
  });

  return LoopNodeInfoView;
});