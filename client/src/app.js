var track;
$(function() {
  track = {
    initialize: function(audioContext, bpm, startTimeStamp){
      // this is the audio context
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      var audioCtx = new AudioContext();
      this.audioCtx = audioContext || audioCtx;

      this.tempoAdjustment = 0; //adjustment parameter when user changes tempo. initially set at 0.
      this.Params = new TrackParams(0, bpm);
      // storage array for all the containing loop node
      this.loopNodes = [];

      this.populateLoopNodes();
      this.setD3Timer();
      this.addListeners();

    },
    populateLoopNodes: function(){
      var loopnode1 = createLoopNode('.loopnode1', this.Params.xPos(1) * 150, this.Params.yPos(1) * 150);
      var loopnode1Obj = {d3Obj: loopnode1, class: '.loopnode1', multiplier: 1};
      var loopnode2 = createLoopNode('.loopnode2', this.Params.xPos(2) * 150, this.Params.yPos(2) * 150);
      var loopnode2Obj = {d3Obj: loopnode2, class: '.loopnode2', multiplier: 2};
      var loopnode3 = createLoopNode('.loopnode3', this.Params.xPos(4) * 150, this.Params.yPos(4) * 150);
      var loopnode3Obj = {d3Obj: loopnode3, class: '.loopnode3', multiplier: 4};
      var loopnode4 = createLoopNode('.loopnode4', this.Params.xPos(8) * 150, this.Params.yPos(8) * 150);
      var loopnode4Obj = {d3Obj: loopnode4, class: '.loopnode4', multiplier: 8};
      var loopnode5 = createLoopNode('.loopnode5', this.Params.xPos(16) * 150, this.Params.yPos(16) * 150);
      var loopnode5Obj = {d3Obj: loopnode5, class: '.loopnode5', multiplier: 16};
      var loopnode6 = createLoopNode('.loopnode6', this.Params.xPos(32) * 150, this.Params.yPos(32) * 150);
      var loopnode6Obj = {d3Obj: loopnode6, class: '.loopnode6', multiplier: 32};
      this.loopNodes.push(loopnode1Obj);
      this.loopNodes.push(loopnode2Obj);
      this.loopNodes.push(loopnode3Obj);
      this.loopNodes.push(loopnode4Obj);
      this.loopNodes.push(loopnode5Obj);
      this.loopNodes.push(loopnode6Obj);


    },
    muteLoopNode: function(loopNode, t){
      // t : the audioCtx time when mute event got triggered
      t = t || this.audioCtx.currentTime;
      
      var disc = loopNode.d3Obj.container.select("circle.disc");
      disc.attr("class", "disc mute");

    },
    unmuteLoopNode: function(loopNode, t){
      // t : the audioCtx time when mute event got triggered
      t = t || this.audioCtx.currentTime;
      
      var disc = loopNode.d3Obj.container.select("circle.disc");
      disc.attr("class", "disc unmute");
    },
    recordLoopNode: function(loopNode, t){
      // t : the audioCtx time when record event got triggered
      t = t || this.audioCtx.currentTime;
      

      
    },

    changeTempo: function(bpm, t){
      // bpm : the new tempo
      // t : the audioCtx time when tempo changed
      t = t || this.audioCtx.currentTime;

      this.tempoAdjustment = this.tempoAdjustment + t * (3/2) * (bpm - this.Params.bpm);
      this.Params.bpm = bpm;



    },
    setD3Timer: function(){
      d3.timer(function() {
        var loopNodes = this.loopNodes;
        var audioCtxTime = this.audioCtx.currentTime;
        var speed = this.Params.speed();
        var tempoAdjustment = this.tempoAdjustment;

        // do this for each loopnode
        for(var i = 0; i < loopNodes.length; i++){
          var delta = audioCtxTime;
          var svg = loopNodes[i].d3Obj.svg;
          var multiplier = loopNodes[i].multiplier;

          svg.selectAll(".cue").attr("transform", function(d) {
            // amount to rotate from original (xPos:0, yPos:1) position
            var rotateDeg = (delta * speed - tempoAdjustment) / multiplier;

            // animation at 90, 180, 270, and 360 degree

            if(rotateDeg % 90 < 20 || rotateDeg % 90 > 80){
              svg.selectAll(".cue").attr("class", "cue darkplanet");
            } else{
              svg.selectAll(".cue").attr("class", "cue");
            }
            return "rotate(" + rotateDeg  +")";
          });
        }
      }.bind(this));
    },
    addListeners: function(){
      // Events
      this.loopNodes.forEach(function(loopNodeObj){
        $(loopNodeObj.class).on('click', function(){
          this.recordLoopNode(loopNodeObj);
        }.bind(this));
      }.bind(this));

      $('.tempoButton1').on('click', function(){
        this.changeTempo(60);
      }.bind(this));
      $('.tempoButton2').on('click', function(){
        this.changeTempo(120);
      }.bind(this));
      $('.tempoButton3').on('click', function(){
        this.changeTempo(240);
      }.bind(this));
      $('.tempoButton4').on('click', function(){
        this.changeTempo(480);
      }.bind(this));

      $('.muteLoop1').on('click', function(){
        this.muteLoopNode(this.loopNodes[0]);
      }.bind(this));
      $('.unmuteLoop1').on('click', function(){
        this.unmuteLoopNode(this.loopNodes[0]);
      }.bind(this));
      $('.recordLoop1').on('click', function(){
        this.recordLoopNode(this.loopNodes[0]);
      }.bind(this));

    }
  };
});
