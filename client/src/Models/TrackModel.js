var TrackModel = Backbone.Model.extend({
    defaults: {
    context: null,
    bufferLoader: null,
    tempo: 120,
    tempoAdjustment: 0,
    recorder: null,
    loopNodes: null,  //soundData
    animationTimer: null
  },

  initialize: function(params){
    this.setAudioContext(params);
    // this.set('animationTimer', d3.timer(params.loopNodes.updateAnimationPosition(this.get('tempo'), this.get('tempoAdjustment'), this.get('context').currentTime)));
  },

  setAudioContext: function(params) { 
    var contextClass = (window.AudioContext || 
    window.webkitAudioContext || 
    window.mozAudioContext || 
    window.oAudioContext || 
    window.msAudioContext);

    if (contextClass) {
      this.set('context', new contextClass());
      console.log('context created: ', this.get('context'));

      //Gets microphone input from user
      navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
      

      navigator.getUserMedia({audio: true}, this.startUserMedia.bind(this), function(e) {
        console.log('No live audio input: ' + e);
      });

      console.log('Audio context set up.');
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

      window.URL = window.URL || window.webkitURL

      // Initialize a new instance of the BufferLoader class,
      // passing in our context and data object. BufferLoader
      // will buffer all of the recordings and hold onto
      // references for the buffers.
      
      
      this.set('loopNodes', params.loopNodes);
      
      this.set('bufferLoader', new BufferLoader(
        this.get('context'),
        this.get('loopNodes').giveUrls() // DEVELOP THIS METHOD OUTDEVELOP THIS METHOD OUTDEVELOP THIS METHOD OUT
        )
      );
      
      // Invoking bufferLoader's .load method does the actual
      // buffering and loading of the recordings, and stores
      // the buffers on the bufferloader instance.
      this.get('bufferLoader').load();

      
      

    } else {
      // Web Audio API is not available. Ask the user to use a supported browser.
      alert('Web Audio API is not available');
    }
  },

    startUserMedia: function(stream) {
      console.log(this.get('context'))
      var input = this.get('context').createMediaStreamSource(stream);
      console.log('Media stream created.' );
      console.log("input sample rate " +input.context.sampleRate);
      
      // input.connect(context.destination);
      console.log('Input connected to audio context destination.');
      
      this.set('recorder', new Recorder(input));
      console.log('Recorder initialised.');
    },


    recorderDelay: function(currentLoop) {

      console.log('Starting Record:');
      // Grab the amount of time a bar takes to complete.
      var barTime = currentLoop.get('speed');
      var tempo = this.get('tempo');
      var currentTime = this.get('context').currentTime;
      currentLoop.set('recordedAtBpm', this.get('tempo'));


      console.log("barTime", barTime)

      //Set up blank object for loop node      
  
      // var currentLoop = new LoopNodeModel({speed: barTime, reco})

      // Sets up variables for loop node
      
      // The remainder tells us how much of the bartime we have 
      // completed thus far.
      var remainder = currentTime % barTime;

      var delay = barTime - remainder;
      
      var delayInMilliseconds = parseInt(delay.toString().replace(/\./g,'').slice(0,4))  // FUNCTION TO CHANGE!!!
      
      console.log("Context Current-time", this.get('context').currentTime)
      console.log("Record will start in:", delayInMilliseconds, "ms")
      console.log("Record will stop in:", delayInMilliseconds + barTime * 1000, "ms")
      
      var barTimeInMS = barTime * 1000

      setTimeout(this.startRecording.bind(this), delayInMilliseconds - 100)
      setTimeout(this.stopRecording.bind(this, currentLoop), delayInMilliseconds + barTimeInMS + 50)
      setTimeout(this.preBuffer.bind(this), delayInMilliseconds + barTimeInMS + 500)
    },
    
    startRecording: function() {
      console.log("time started recording:", this.get('context').currentTime)

      this.get('recorder') && this.get('recorder').record();
      // button.disabled = true;
      // button.nextElementSibling.disabled = false;
      console.log('Recording...');
      console.time("recording1")
    },

    stopRecording: function(currentLoop) {
          
      console.log("time stopped recording:", this.context.currentTime)
      this.get('recorder') && this.get('recorder').stop();
      console.timeEnd("recording1")
      // button.disabled = true;
      // button.previousElementSibling.disabled = false;
      console.log('Stopped recording.');
      // create WAV download link using audio data blob
      this.createDownloadLink(currentLoop);
      this.get('recorder').clear();
    },

    createDownloadLink: function(currentLoop) {
      this.recorder && this.recorder.exportWAV(function(blob) {
        var url = URL.createObjectURL(blob);
        
        var li = document.createElement('li');
        var au = document.createElement('audio');
        var hf = document.createElement('a');
        
        currentLoop.set('url', url);
        // counter++;


        // au.controls = true;
        // au.src = url;
        // hf.href = url;
        // hf.download = new Date().toISOString() + '.wav';
        // hf.innerHTML = hf.download;
        // li.appendChild(au);
        // li.appendChild(hf);
        // recordingslist.appendChild(li);
      });
    },

    preBuffer: function(){
          // Initialize a new instance of the BufferLoader class,
        // passing in our context and data object. BufferLoader
        // will buffer all of the recordings and hold onto
        // references for the buffers.
        this.set('bufferLoader', new BufferLoader(
          this.context,
          this.get('loopNodes').giveUrls() // NEED TO DEVELOP THIS OUT NEED TO DEVELOP THIS OUT
          )
        );

        // Invoking bufferLoader's .load method does the actual
        // buffering and loading of the recordings, and stores
        // the buffers on the bufferloader instance.
        this.bufferLoader.load();
    },

    setCueAnimation: function(){
      d3.timer(function(){
        var loopNodes = this.get('loopNodes');
        var audioCtxTime = this.get('context').currentTime;
        var bar = calcBar(this.get('tempo'));
        var angularSpeed = calcSpeed(bar);
        var tempoAdjustment = this.get('tempoAdjustment');
        // do this for each loopnode
        loopNodes.each(function(loopNode) {
          var delta = audioCtxTime;
          var svg = loopNode.get('d3Obj').svg;
          var loopNodeClass = '.loopNode' + loopNode.get('port');
          var multiplier = loopNode.get('multiplier');
          var rotateDeg = (delta * angularSpeed - tempoAdjustment) / multiplier;

          d3.selectAll(loopNodeClass + "cue").attr("transform", function(d) {
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
      }.bind(this));
    },

    // populateLoopNodes: function(){
    //   // initialize loopnodes
    //   var startAngle = 0; //starting angle should be 0
    //   var radius = 150;

    //   var loopnode1 = createLoopNode('.loopnode1', xPos(startAngle , radius), yPos(startAngle , radius));
    //   var loopnode1Obj = {d3Obj: loopnode1, class: '.loopnode1', multiplier: 1};
    //   var loopnode2 = createLoopNode('.loopnode2', xPos(startAngle , radius), yPos(startAngle , radius));
    //   var loopnode2Obj = {d3Obj: loopnode2, class: '.loopnode2', multiplier: 1};
    //   var loopnode3 = createLoopNode('.loopnode3', xPos(startAngle , radius), yPos(startAngle , radius));
    //   var loopnode3Obj = {d3Obj: loopnode3, class: '.loopnode3', multiplier: 1};
    //   var loopnode4 = createLoopNode('.loopnode4', xPos(startAngle , radius), yPos(startAngle , radius));
    //   var loopnode4Obj = {d3Obj: loopnode4, class: '.loopnode4', multiplier: 1};
    //   var loopnode5 = createLoopNode('.loopnode5', xPos(startAngle , radius), yPos(startAngle , radius));
    //   var loopnode5Obj = {d3Obj: loopnode5, class: '.loopnode5', multiplier: 1};
    //   var loopnode6 = createLoopNode('.loopnode6', xPos(startAngle , radius), yPos(startAngle , radius));
    //   var loopnode6Obj = {d3Obj: loopnode6, class: '.loopnode6', multiplier: 1};
    //   this.loopNodes.push(loopnode1Obj);
    //   this.loopNodes.push(loopnode2Obj);
    //   this.loopNodes.push(loopnode3Obj);
    //   this.loopNodes.push(loopnode4Obj);
    //   this.loopNodes.push(loopnode5Obj);
    //   this.loopNodes.push(loopnode6Obj);


    // },

    changeTempo: function(bpm, t){
          // bpm : the new tempo
          // t : the audioCtx time when tempo changed
          t = t || this.get('context').currentTime;

          this.set('tempoAdjustment', this.get('tempoAdjustment') + t * (3/2) * (bpm - this.get('bpm')));
          this.set('bpm', bpm);

          var loopNodes = this.get('loopNodes');

          loopNodes.each(function(loopNode){
            var currentSource = loopNode.get('source');
            if(currentSource){
              currentSource.playbackRate.value = parseInt(bpm) / loopNode.get('recordedAtBpm');
            }    
          });
    },

  // this.tempoAdjustment = 0; //adjustment parameter when user changes tempo. initially set at 0.
  // this.bpm  = bpm || 120;


  // storage array for all the containing loop node
  // this.loopNodes = [];

  // this.populateLoopNodes();
  // this.setCueAnimation();
  // this.addListeners();
  // },
});
