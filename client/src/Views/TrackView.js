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


      // Remove later
      this.createFreqVisualizer();

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
    },

    createFreqVisualizer: function(){
      // Refacor this code later to move out of track View, posssibly
      var canvas_div = this.$el.find('.FreqVisualizerView')
      var canvas = this.$el.find('.freqVisCanvas');


      var ctx = canvas[0].getContext("2d");
      ctx.imageSmoothingEnabled = !1;
      ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = !1;


      this.model.set('visualFreqCanvas', canvas);
      this.model.set('visualFreqCanvasCtx', ctx);
    }
    
  });

  return TrackView;
});
