define([
  'text!templates/MainViewTemplate.html',
  'Models/AppModel',
  'Views/NavView',
  'Views/AppView',
  'Views/TrackView'
], function(template, AppModel, NavView, AppView, TrackView){
  var MainView = Backbone.View.extend({

    initialize: function(){
    },

    events:{
    },

    template: Handlebars.compile(template),

    render: function() {
      // Load Template
      this.$el.html(this.template());
      // attach navBar
      var navView = new NavView();
      this.$el.find('.navBar').html(navView.render().el);
      return this;
    },
    renderAppView: function(){
      // attach appView
      var appModel = new AppModel();
      var appView = new AppView({model: appModel});
      this.$el.find('.main').html(appView.render().el);

      return this;
    },
    renderTrackView: function(trackView){
      // attach trackView
      this.$el.find('.main').html(trackView.render().el);
      return this;
    }
    
  });

  return MainView;
});
