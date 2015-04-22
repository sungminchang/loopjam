define([
  'text!templates/TrackViewTemplate.html',
  'Views/LoopNodesView',
  'Views/LoopNodeInfoView',
  'Views/TrackInfoView'


], function(template, LoopNodesView, LoopNodeInfoView, TrackInfoView){
  var TrackView = Backbone.View.extend({

    initialize: function(){
      this.model.on("change:selectedLoopNode", this.updateLoopNodeInfoView, this);
      // $(window).resize(this.createFreqVisualizer).bind(this);


      window.onbeforeunload = function (e) {
          e = e || window.event;
          var hash = (window.location.hash);

          if (e && hash === '#/tracks/new') {
              e.returnValue = 'Before you go, you might want to save your loopnodes.';
          }

          // For Safari
          if (hash === '#/tracks/new') {
            return 'Before you go, you might want to save your loopnodes.';
          }
      };
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

      // set height to window
      this.$el.find('.loopNodesView').height($( window ).height());

      //Event listening for mp3 data retrieval
      this.$el.find('.mp3Blob').on('newmp3', this.attachMp3ToNode.bind(this));
      

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
      var height = $( window ).height();
      var width = $( window ).width();

      var canvas_div = this.$el.find('.bgVisualizerView')
      canvas_div.height(height);
      canvas_div.width(width);
      canvas_div.css('position','absolute');
      canvas_div.css('z-index', -1);

      var canvas = this.$el.find('.bgfreqVisCanvas');
      canvas.attr('height', canvas_div.height());
      canvas.attr('width', canvas_div.width());



      var ctx = canvas[0].getContext("2d");
      ctx.imageSmoothingEnabled = !1;
      ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = !1;

      this.model.set('bgFreqCanvas', canvas);
      this.model.set('bgFreqCanvasCtx', ctx);
    },

    attachMp3ToNode: function(){
      var mp3Data = this.$el.find('.mp3blobData').text();
      var loopNodePort = parseInt(this.$el.find('.loopNodePort').text());
      this.model.attachMp3ToNode(mp3Data, loopNodePort);

    }
    
  });

  return TrackView;
});
