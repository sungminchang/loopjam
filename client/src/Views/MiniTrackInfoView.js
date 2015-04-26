define([
  'text!templates/TrackInfoTemplate.html'
], function(template){

  var MiniTrackInfoView = Backbone.View.extend({
  
    initialize: function(){
    },

    events:{
    },

    template: Handlebars.compile(template),

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
    
  });

  return MiniTrackInfoView;
});