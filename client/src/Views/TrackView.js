define([
  'text!templates/TrackViewTemplate.html',
  'Views/LoopNodesView',
  'Views/LoopNodeInfoView',
  'Views/TrackInfoView'


], function(template, LoopNodesView, LoopNodeInfoView, TrackInfoView){
  var TrackView = Backbone.View.extend({

    initialize: function(){
      this.model.on("change:selectedLoopNode", this.updateLoopNodeInfoView, this);
    },

    events:{
    },

    template: Handlebars.compile(template),

    render: function() {
      // Load Template
      this.$el.html(this.template());

      // Append child views to corresponding class div
      // this.$el.find('.trackInfoView').append(new TrackInfoView().render().el);

      this.updateLoopNodeInfoView();

      // this.$el.find('.visualizerView').append(new VisualizerView().render().el);
      this.$el.find('.trackInfoView').append(new TrackInfoView({model: this.model}).render().el);
      this.$el.find('.loopNodesView').append(new LoopNodesView({collection: this.model.get('loopNodes')}).render().el);

      return this;
    },

    updateLoopNodeInfoView: function(){
      var selectedNode = this.model.get('selectedLoopNode');
      var port = selectedNode.get('port');

      // $(".glow").removeClass('glow');
      // $(".glow-effect" + port).addClass('glow');


      this.$el.find('.loopNodeInfoView').html(new LoopNodeInfoView({ model: selectedNode}).render().el);
      this.$el.find('.loopNodeInfoTitle').effect( "highlight", {color:"grey"}, 1000 );
      
      return this;
    }
    
  });

  return TrackView;
});