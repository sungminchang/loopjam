var LoopNodeEntryPlayPauseView = Backbone.View.extend({

  initialize: function(){
  },

  events:{
    'click .record-new': function() {
      this.model.record();
      this.model.set('record', !this.model.get('record'));
    },

    'click .play': function() {
      this.model.play();
    },

    'click .pause': function() {
      this.model.pause();
    }
  },

  template: Handlebars.compile( $("#loopnode-pauseplayrec-template").html() ),

  render: function() {

    this.$el.html(this.template(this.model.attributes));
    return this;
  }
  
});