define([
  'text!templates/AppViewTemplate.html',
  'Views/NavView',
  'Views/AppView',
  'Views/TrackView'
], function(template, NavView, AppView, TrackView){
  var MainView = Backbone.View.extend({

    initialize: function(){
    },

    events:{
    },

    template: Handlebars.compile(template),

    render: function() {
      // Load Template
      this.$el.html(this.template());



      return this;
    },
    
  });

  return MainView;
});
