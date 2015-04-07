var trackOld;
var data = [
{url: "audio/click.mp3", speed:2, port:0, recordedAtBpm: 120}, 
{url: "audio/metronome2.mp3", speed:2, port:1, recordedAtBpm: 120}
];


$(function() {
  trackOld = {
    initialize: function(audioContext, bpm){

        var contextClass = (window.AudioContext || 
          window.webkitAudioContext || 
          window.mozAudioContext || 
          window.oAudioContext || 
          window.msAudioContext);

        if (contextClass) {
          this.context = audioContext || new contextClass();
          console.log('context created: ', this.context);

          // Initialize a new instance of the BufferLoader class,
          // passing in our context and data object. BufferLoader
          // will buffer all of the recordings and hold onto
          // references for the buffers.
          this.bufferLoader = new BufferLoader(
            this.context,
            data
            );

          // Invoking bufferLoader's .load method does the actual
          // buffering and loading of the recordings, and stores
          // the buffers on the bufferloader instance.
          this.bufferLoader.load();

        } else {
          // Web Audio API is not available. Ask the user to use a supported browser.
          alert('Web Audio API is not available');
        }

      this.tempoAdjustment = 0; //adjustment parameter when user changes tempo. initially set at 0.
      this.bpm  = bpm || 120;

      // storage array for all the containing loop node
      this.loopNodes = [];

      this.populateLoopNodes();
      this.setCueAnimation();
      this.addListeners();

    },
    populateLoopNodes: function(){
      // initialize loopnodes
      var startAngle = 0; //starting angle should be 0
      var radius = 150;

      var loopnode1 = createLoopNode('.loopnode1', xPos(startAngle , radius), yPos(startAngle , radius));
      var loopnode1Obj = {d3Obj: loopnode1, class: '.loopnode1', multiplier: 1};
      var loopnode2 = createLoopNode('.loopnode2', xPos(startAngle , radius), yPos(startAngle , radius));
      var loopnode2Obj = {d3Obj: loopnode2, class: '.loopnode2', multiplier: 2};
      var loopnode3 = createLoopNode('.loopnode3', xPos(startAngle , radius), yPos(startAngle , radius));
      var loopnode3Obj = {d3Obj: loopnode3, class: '.loopnode3', multiplier: 4};
      var loopnode4 = createLoopNode('.loopnode4', xPos(startAngle , radius), yPos(startAngle , radius));
      var loopnode4Obj = {d3Obj: loopnode4, class: '.loopnode4', multiplier: 8};
      var loopnode5 = createLoopNode('.loopnode5', xPos(startAngle , radius), yPos(startAngle , radius));
      var loopnode5Obj = {d3Obj: loopnode5, class: '.loopnode5', multiplier: 16};
      var loopnode6 = createLoopNode('.loopnode6', xPos(startAngle , radius), yPos(startAngle , radius));
      var loopnode6Obj = {d3Obj: loopnode6, class: '.loopnode6', multiplier: 32};
      this.loopNodes.push(loopnode1Obj);
      this.loopNodes.push(loopnode2Obj);
      this.loopNodes.push(loopnode3Obj);
      this.loopNodes.push(loopnode4Obj);
      this.loopNodes.push(loopnode5Obj);
      this.loopNodes.push(loopnode6Obj);


    },
    pauseLoopNodeAnimation: function(loopNode, t){
      // t : the audioCtx time when mute event got triggered
      t = t || this.context.currentTime;
      
      var disc = loopNode.d3Obj.container.select("circle.disc");
      disc.attr("class", "disc mute");

    },
    playLoopNodeAnimation: function(loopNode, t){
      // t : the audioCtx time when mute event got triggered
      t = t || this.context.currentTime;
      
      var disc = loopNode.d3Obj.container.select("circle.disc");
      disc.attr("class", "disc unmute");
    },
    recordLoopNodeAnimation: function(loopNode, t){
      // this needs to get cleaned up

      // t : the audioCtx time when record event got triggered
      t = t || this.context.currentTime;

      var disc = loopNode.d3Obj.container.select("circle.disc");
      // put loopnode in wait mode
      disc.attr("class", "disc wait");

      var bar = calcBar(this.bpm);
      var speed = calcSpeed(bar);
      var tempoAdjustment = this.tempoAdjustment;
      var multiplier = loopNode.multiplier;

      var startWaitDeg = (t * speed - tempoAdjustment) / multiplier;
      var startRecordDeg = startWaitDeg + 360 - (startWaitDeg % 360);
      var startPlayDeg = startRecordDeg + 360;

      d3.timer(function(){
        var currentTime = this.context.currentTime;        
        var currentDeg = (currentTime * speed - tempoAdjustment) / multiplier;
        console.log(currentDeg);
        if(currentDeg >= startRecordDeg){
          disc.attr("class", "disc record");
          startPlayTimer.call(this);

          return true;
        }
      }.bind(this));


      var startPlayTimer = function(callback){
        d3.timer(function(){
          var currentTime = this.context.currentTime;        
          var currentDeg = (currentTime * speed - tempoAdjustment) / multiplier;
          console.log(currentDeg);
          if(currentDeg >= startPlayDeg){
            disc.attr("class", "disc unmute");
            if(callback){
              callback();
            }
            return true;
          }
        }.bind(this));
      };
      
    },

    changeTempo: function(bpm, t){
      // bpm : the new tempo
      // t : the audioCtx time when tempo changed
      t = t || this.context.currentTime;

      this.tempoAdjustment = this.tempoAdjustment + t * (3/2) * (bpm - this.bpm);
      this.bpm = bpm;



    },
    setCueAnimation: function(){
      d3.timer(function(){
        var loopNodes = this.loopNodes;
        var audioCtxTime = this.context.currentTime;
        var bar = calcBar(this.bpm);
        var speed = calcSpeed(bar);
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


    play: function(button) {
      // Grab the value associated with the button,
      // will be used to identify the sound associated with the button.
      var soundIndex = button.value;

      // Grab the data object associated with the button.
      var soundData = data[soundIndex];

      console.log('playing a sound: ', soundData);

      // Grab the amount of time a bar takes to complete.
      var barTime = soundData.speed;

      var currentTime = this.context.currentTime;

      // The remainder tells us how much of the bartime we have 
      // completed thus far.
      var remainder = currentTime % barTime;
      console.log('currentTime:', currentTime);

      // The delay calculates how much we'll have to delay
      // the playing of the sound so that we can perfectly
      // match the time of the next beat.
      var delay = barTime - remainder;
      console.log('delay: ', delay);

      console.log('expected time of play: ', delay + currentTime);

      // Reassign the source associated with the soundData object
      // to a new buffer source. This way, we can reference the same
      // source to stop playing the loop. However, once stopped,
      // the source is basically discarded and you must create
      // a new one. One play per source.
      var source = soundData.source = this.context.createBufferSource();
      console.log('source', source);

      // Associate the new source instance with the loaded buffer.
      soundData.source.buffer = this.bufferLoader.bufferList[soundIndex];
      soundData.source.loop = true;
      // source.playbackRate.value = playbackControl.value;

      // Create a gainNode, through which we will pass the soundData.
      var gainNode = soundData.gainNode = this.context.createGain();
      // Connect the source to the gainNode.
      soundData.source.connect(gainNode);

      //Connect the gainNode to the destination.
      soundData.gainNode.connect(this.context.destination);

      // Play the sound, delaying the sound by the delay necessary
      // to make the sound play at the start of a new measure.
      soundData.source.start(currentTime + delay);

      // Define what parts of the soundfile will be played.
      // In this case, second 0 to second barTime will be played.
      soundData.source.loopStart = 0;
      soundData.source.loopEnd = barTime;

      source.onended = function() {
        console.log('Your audio has finished playing');
      };

      console.log('source', source);
    },

    pause: function(button) {
      var soundIndex = button.value;
      var soundData = data[soundIndex];

      // Instead of creating a new bufferSource as per usual,
      // we retrieve the source that we have stored on our 
      // data objects.
      var source = soundData.source;
      source.buffer = this.bufferLoader.bufferList[soundIndex];
      console.log('About to pause, logging source: ', source);
      source.stop();
    },

    toggle: function(button) {
      console.log('button: ', button);
      // var data = button.split(" ")
      // console.log('data: ', data);
      console.log(button.value);
      if (button.innerHTML == "Play") {
        button.innerHTML = "Pause";
        this.play(button);
      } else {
        button.innerHTML = "Play";
        this.pause(button);
      }
    },

    changeVolume: function(slider, t){
      var volume, soundIndex, soundData, gainNode;

      volume = slider.value;
      console.log('volume: ', volume);
      soundIndex = $(slider).attr('soundIndex');
      console.log('soundIndex: ', soundIndex);
      soundData = data[soundIndex];
      gainNode = soundData.gainNode;

      gainNode.gain.value = volume / 100;
      // slider : the new Volume
      // t : the audioCtx time when Volume changed
      // t = t || this.context.currentTime;

      // this.volumeAdjustment = this.volumeAdjustment + t * (3/2) * (bpm - this.Params.bpm);
      // this.Params.bpm = bpm;
    },



    addListeners: function(){
      // Events
      this.loopNodes.forEach(function(loopNodeObj){
        $(loopNodeObj.class).on('click', function(){
          this.recordLoopNodeAnimation(loopNodeObj);
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

      $('#tempo').on('input', function(e){
        console.log(e.target.value);
        this.changeTempo(e.target.value);
      }.bind(this));

      $('.muteLoop1').on('click', function(){
        this.pauseLoopNodeAnimation(this.loopNodes[0]);
      }.bind(this));
      $('.unmuteLoop1').on('click', function(){
        this.playLoopNodeAnimation(this.loopNodes[0]);
      }.bind(this));
      $('.recordLoop1').on('click', function(){
        this.recordLoopNodeAnimation(this.loopNodes[0]);
      }.bind(this));

      //audio 

      $('#volume0').on('input', function(e){
        console.log(e.target.value);
        this.changeVolume(e.target);
      }.bind(this));

      $('#volume1').on('input', function(e){
        console.log(e.target.value);
        this.changeVolume(e.target);
      }.bind(this));

      $('#sound1').on('click', function(e) {
        this.toggle(e.target);
      }.bind(this));

      $('#sound2').on('click', function(e) {
        this.toggle(e.target);
      }.bind(this));

    }
  };
});

var TrackModel = Backbone.Model.extend({
  initialize: function(){

  },
  setAudioContext: function(){ 
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    this.context = audioContext || audioCtx;
  }

});