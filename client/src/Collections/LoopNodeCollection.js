define([
  'Models/LoopNodeModel'
], function(LoopNodeModel){

  var LoopNodeCollection = Backbone.Collection.extend({
    model: LoopNodeModel,

      defaults: {
      context: null,
      bufferLoader: null,
      tempo: 120,
      tempoAdjustment: 0,
      recorder: null,
      // loopNodes: [],  //soundData
      animationTimer: null
    },

    initialize: function() {
      this.on('remove', this.reassignPorts, this);
      this.on('record', this.disableRecord, this);

      // this.populateLoopNodes();
      // this.on("hello", function(){
      //   console.log("Listened to Hello")      
      // })

    },

    // events:{
    //   "hello": function(){
    //   }
    // },

    // setCueAnimation: function(){

    //   d3.timer(function(){
    //     var loopNodes = this.collection;
    //     var audioCtxTime = this.context.currentTime;
    //     var bar = calcBar(this.bpm);
    //     var speed = calcSpeed(bar);
    //     var tempoAdjustment = this.tempoAdjustment;

    //     // do this for each loopnode
    //     loopNodes.each(function(loopNode) {
    //       var delta = audioCtxTime;
    //       var svg = loopNode.d3Obj.svg;
    //       var multiplier = loopNode.multiplier;

    //       svg.selectAll(".cue").attr("transform", function(d) {
    //         // amount to rotate from original (xPos:0, yPos:1) position
    //         var rotateDeg = (delta * speed - tempoAdjustment) / multiplier;

    //         // animation at 90, 180, 270, and 360 degree

    //         if(rotateDeg % 90 < 20 || rotateDeg % 90 > 80){
    //           svg.selectAll(".cue").attr("class", "cue darkplanet");
    //         } else{
    //           svg.selectAll(".cue").attr("class", "cue");
    //         }
    //         return "rotate(" + rotateDeg  +")";
    //       });

    //     });
    //   }.bind(this));
    // },

    updateAnimationPosition: function(tempo, tempoAdjustment, currentTime){
      // Each(updates position)
      var bar = calcBar(tempo);
      var angularSpeed = calcSpeed(bar);

      // do this for each loopnode
      this.each(function(loopNode){
        var delta = currentTime;
        var svg = loopNode.get('d3Obj').svg;
        var multiplier = loopNode.multiplier;

        svg.selectAll(".cue").attr("transform", function(d) {
          // amount to rotate from original (xPos:0, yPos:1) position
          var rotateDeg = (delta * angularSpeed - tempoAdjustment) / multiplier;
          debugger;
          // animation at 90, 180, 270, and 360 degree

          if(rotateDeg % 90 < 20 || rotateDeg % 90 > 80){
            svg.selectAll(".cue").attr("class", "cue darkplanet");
          } else{
            svg.selectAll(".cue").attr("class", "cue");
          }
          return "rotate(" + rotateDeg  +")";
        });
      });
    },

    giveUrls: function() {
      return this.map(function(loopNode) {
        return loopNode.get('url');
      });
    },
    rerender: function() {
      this.trigger('rerender', this);
    },
    // Assigns placeholder for where the track should be placed on the screen.
    reassignPorts: function(){
      this.models.forEach(function(loopNode, i) {
        loopNode.set('port', i + 1);
      });
    },
    nextPort: function() {
      return this.models.length + 1;
    },
    addNewLoopNode: function(multiplier){
      if (this.models.length <= 8) {
        multiplier = multiplier || 2;
        var port = this.nextPort();
        var newLoopNode = new LoopNodeModel({multiplier: multiplier, port: port});
        this.add(newLoopNode);
      }

      if (this.models.length === 9) {
        $('.addNewLoop').children().remove();
      }
    },
    disableRecord: function() {
      this.models.forEach(function(loopNode, i) {
        loopNode.disableRecord();
      });
    },
    enableRecord: function() {
      this.models.forEach(function(loopNode, i) {
        loopNode.enableRecord();
      });
    }


  });

  return LoopNodeCollection; 

});