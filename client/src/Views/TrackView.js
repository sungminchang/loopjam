define([
  'text!templates/TrackViewTemplate.html',
  'Views/LoopNodesView'

], function(template, LoopNodesView){
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
      // this.$el.find('.loopNodeInfoView').append(new LoopNodeInfoView().render().el);
      // this.$el.find('.visualizerView').append(new VisualizerView().render().el);
      this.$el.find('.loopNodesView').append(new LoopNodesView({collection: this.model.get('loopNodes')}).render().el);

      return this;
    }
    
  });

  return TrackView;
});