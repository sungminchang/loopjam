
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
    // this.populateLoopNodes();
  },

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
  // Assigns placeholder for where the track should be placed on the screen.
  nextPort: function(){
    if (!this.length) return 1;
    return this.last().get('order') + 1
  }
});