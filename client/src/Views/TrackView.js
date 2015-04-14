define([
  'text!templates/TrackViewTemplate.html',
  'Views/LoopNodesView',
  'Views/LoopNodeInfoView',
  'Views/TrackInfoView'


], function(template, LoopNodesView, LoopNodeInfoView, TrackInfoView){
  var TrackView = Backbone.View.extend({

    initialize: function(){
    },

    events:{
    },

    template: Handlebars.compile(template),

    render: function() {
      // Load Template
      this.$el.html(this.template());

      // Append child views to corresponding class div
      // this.$el.find('.trackInfoView').append(new TrackInfoView().render().el);

      var defaultLoopNode = this.model.get('loopNodes').models[0]; //setting default to first
      this.updateLoopNodeInfoView(defaultLoopNode);

      // this.$el.find('.visualizerView').append(new VisualizerView().render().el);
      this.$el.find('.trackInfoView').append(new TrackInfoView({model: this.model}).render().el);
      this.$el.find('.loopNodesView').append(new LoopNodesView({collection: this.model.get('loopNodes')}).render().el);


      return this;
    },

    updateLoopNodeInfoView: function(loopNode){
      this.$el.find('.loopNodeInfoView').html(new LoopNodeInfoView({ model: loopNode}).render().el);
      return this;
    }
    
  });

  return TrackView;
});