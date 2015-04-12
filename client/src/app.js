// var trackOld;
// var data = [
// {url: "audio/click.mp3", speed:2, port:0, recordedAtBpm: 120} 
// ];

// counter = 1;


// $(function() {
//   trackOld = {
//     initialize: function(audioContext, bpm){

//         var contextClass = (window.AudioContext || 
//           window.webkitAudioContext || 
//           window.mozAudioContext || 
//           window.oAudioContext || 
//           window.msAudioContext);

//         if (contextClass) {
//           debugger;
//           this.context = audioContext || new contextClass();
//           console.log('context created: ', this.context);

//           //Gets microphone input from user
//           navigator.getUserMedia = ( navigator.getUserMedia ||
//                            navigator.webkitGetUserMedia ||
//                            navigator.mozGetUserMedia ||
//                            navigator.msGetUserMedia);
          

//           navigator.getUserMedia({audio: true}, this.startUserMedia.bind(this), function(e) {
//             console.log('No live audio input: ' + e);
//           });

//           console.log('Audio context set up.');
//           console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

//           window.URL = window.URL || window.webkitURL

//           // Initialize a new instance of the BufferLoader class,
//           // passing in our context and data object. BufferLoader
//           // will buffer all of the recordings and hold onto
//           // references for the buffers.
//           this.bufferLoader = new BufferLoader(
//             this.context,
//             data
//             );;

//           // Invoking bufferLoader's .load method does the actual
//           // buffering and loading of the recordings, and stores
//           // the buffers on the bufferloader instance.
//           this.bufferLoader.load();

//         } else {
//           // Web Audio API is not available. Ask the user to use a supported browser.
//           alert('Web Audio API is not available');
//         }

//       this.tempoAdjustment = 0; //adjustment parameter when user changes tempo. initially set at 0.
//       this.bpm  = bpm || 120;


//       // storage array for all the containing loop node
//       this.loopNodes = [];

//       this.populateLoopNodes();
//       this.setCueAnimation();
//       this.addListeners();

//     },
//     startUserMedia: function(stream) {
//       console.log(this.context)
//       var input = this.context.createMediaStreamSource(stream);
//       console.log('Media stream created.' );
//       console.log("input sample rate " +input.context.sampleRate);
      
//       // input.connect(context.destination);
//       console.log('Input connected to audio context destination.');
      
//       this.recorder = new Recorder(input);
//       console.log('Recorder initialised.');
//     },
    // recorderDelay: function() {

    //   console.log('Starting Record:');

    //   // Grab the amount of time a bar takes to complete.
    //   var barTime = parseInt($('.multiplier').val());
    //   var currentTime = this.context.currentTime;
      
    //   console.log("barTime", barTime)

    //   //Set up blank object for loop node      
    //   if(!data[counter]) data[counter] = {};

    //   // Sets up variables for loop node
    //   data[counter].speed = barTime
    //   data[counter].port = 0;
    //   data[counter].recordedAtBpm = this.bpm;

    //   // The remainder tells us how much of the bartime we have 
    //   // completed thus far.
    //   var remainder = currentTime % barTime;

    //   var delay = barTime - remainder;
      
    //   var delayInMilliseconds = parseInt(delay.toString().replace(/\./g,'').slice(0,4)) 
      
    //   console.log("Context Current-time", this.context.currentTime)
    //   console.log("Record will start in:", delayInMilliseconds, "ms")
    //   console.log("Record will stop in:", delayInMilliseconds + barTime * 1000, "ms")
      
    //   var barTimeInMS = barTime * 1000

    //   setTimeout(this.startRecording.bind(this), delayInMilliseconds - 100)
    //   setTimeout(this.stopRecording.bind(this), delayInMilliseconds + barTimeInMS + 50)
    //   setTimeout(this.preBuffer.bind(this), delayInMilliseconds + barTimeInMS + 500)
    // },
    // startRecording: function() {
    //   console.log("time started recording:", this.context.currentTime)

    //   this.recorder && this.recorder.record();
    //   // button.disabled = true;
    //   // button.nextElementSibling.disabled = false;
    //   console.log('Recording...');
    //   console.time("recording1")
    // },

    // stopRecording: function() {
          
    //   console.log("time stopped recording:", this.context.currentTime)
    //   this.recorder && this.recorder.stop();
    //   console.timeEnd("recording1")
    //   // button.disabled = true;
    //   // button.previousElementSibling.disabled = false;
    //   console.log('Stopped recording.');
    //   // create WAV download link using audio data blob
    //   this.createDownloadLink();
    //   this.recorder.clear();
    // },
    // createDownloadLink: function() {
    //   this.recorder && this.recorder.exportWAV(function(blob) {
    //     var url = URL.createObjectURL(blob);
    //     var li = document.createElement('li');
    //     var au = document.createElement('audio');
    //     var hf = document.createElement('a');
        
    //     data[counter].url = url;
    //     counter++;


    //     au.controls = true;
    //     au.src = url;
    //     hf.href = url;
    //     hf.download = new Date().toISOString() + '.wav';
    //     hf.innerHTML = hf.download;
    //     li.appendChild(au);
    //     li.appendChild(hf);
    //     recordingslist.appendChild(li);
    //   });
    // },
//     preBuffer: function(){
//           // Initialize a new instance of the BufferLoader class,
//         // passing in our context and data object. BufferLoader
//         // will buffer all of the recordings and hold onto
//         // references for the buffers.
//         this.bufferLoader = new BufferLoader(
//           this.context,
//           data
//           );

//         // Invoking bufferLoader's .load method does the actual
//         // buffering and loading of the recordings, and stores
//         // the buffers on the bufferloader instance.
//         this.bufferLoader.load();
//     },
//     populateLoopNodes: function(){
//       // initialize loopnodes
//       var startAngle = 0; //starting angle should be 0
//       var radius = 150;

//       var loopnode1 = createLoopNode('.loopnode1', xPos(startAngle , radius), yPos(startAngle , radius));
//       var loopnode1Obj = {d3Obj: loopnode1, class: '.loopnode1', multiplier: 1};
//       var loopnode2 = createLoopNode('.loopnode2', xPos(startAngle , radius), yPos(startAngle , radius));
//       var loopnode2Obj = {d3Obj: loopnode2, class: '.loopnode2', multiplier: 1};
//       var loopnode3 = createLoopNode('.loopnode3', xPos(startAngle , radius), yPos(startAngle , radius));
//       var loopnode3Obj = {d3Obj: loopnode3, class: '.loopnode3', multiplier: 1};
//       var loopnode4 = createLoopNode('.loopnode4', xPos(startAngle , radius), yPos(startAngle , radius));
//       var loopnode4Obj = {d3Obj: loopnode4, class: '.loopnode4', multiplier: 1};
//       var loopnode5 = createLoopNode('.loopnode5', xPos(startAngle , radius), yPos(startAngle , radius));
//       var loopnode5Obj = {d3Obj: loopnode5, class: '.loopnode5', multiplier: 1};
//       var loopnode6 = createLoopNode('.loopnode6', xPos(startAngle , radius), yPos(startAngle , radius));
//       var loopnode6Obj = {d3Obj: loopnode6, class: '.loopnode6', multiplier: 1};
//       this.loopNodes.push(loopnode1Obj);
//       this.loopNodes.push(loopnode2Obj);
//       this.loopNodes.push(loopnode3Obj);
//       this.loopNodes.push(loopnode4Obj);
//       this.loopNodes.push(loopnode5Obj);
//       this.loopNodes.push(loopnode6Obj);


//     },
//     pauseLoopNodeAnimation: function(loopNode, t){
//       // t : the audioCtx time when mute event got triggered
//       t = t || this.context.currentTime;
      
//       var disc = loopNode.d3Obj.container.select("circle.disc");
//       disc.attr("class", "disc mute");

//     },
//     playLoopNodeAnimation: function(loopNode, t){
//       // t : the audioCtx time when mute event got triggered
//       t = t || this.context.currentTime;
      
//       var disc = loopNode.d3Obj.container.select("circle.disc");
//       disc.attr("class", "disc unmute");
//     },
//     recordLoopNodeAnimation: function(loopNode, t){
//       // this needs to get cleaned up

//       // t : the audioCtx time when record event got triggered
//       t = t || this.context.currentTime;

//       var disc = loopNode.d3Obj.container.select("circle.disc");
//       // put loopnode in wait mode
//       disc.attr("class", "disc wait");

//       var bar = calcBar(this.bpm);
//       var speed = calcSpeed(bar);
//       var tempoAdjustment = this.tempoAdjustment;
//       var multiplier = loopNode.multiplier;

//       var startWaitDeg = (t * speed - tempoAdjustment) / multiplier;
//       var startRecordDeg = startWaitDeg + 360 - (startWaitDeg % 360);
//       var startPlayDeg = startRecordDeg + 360;

//       d3.timer(function(){
//         var currentTime = this.context.currentTime;        
//         var currentDeg = (currentTime * speed - tempoAdjustment) / multiplier;
//         console.log(currentDeg);
//         if(currentDeg >= startRecordDeg){
//           disc.attr("class", "disc record");
//           startPlayTimer.call(this);

//           return true;
//         }
//       }.bind(this));


//       var startPlayTimer = function(callback){
//         d3.timer(function(){
//           var currentTime = this.context.currentTime;        
//           var currentDeg = (currentTime * speed - tempoAdjustment) / multiplier;
//           console.log(currentDeg);
//           if(currentDeg >= startPlayDeg){
//             disc.attr("class", "disc unmute");
//             if(callback){
//               callback();
//             }
//             return true;
//           }
//         }.bind(this));
//       };
      
//     },

//     changeTempo: function(bpm, t){
//       // bpm : the new tempo
//       // t : the audioCtx time when tempo changed
//       t = t || this.context.currentTime;

//       this.tempoAdjustment = this.tempoAdjustment + t * (3/2) * (bpm - this.bpm);
//       this.bpm = bpm;
//       data.forEach(function(value){
//         if(value.source){
//           value.source.playbackRate.value = parseInt(bpm) / value.recordedAtBpm
//         }    
//       })
 



//     },
//     setCueAnimation: function(){
//       d3.timer(function(){
      //   var loopNodes = this.loopNodes;
      //   var audioCtxTime = this.context.currentTime;
      //   var bar = calcBar(this.bpm);
      //   var speed = calcSpeed(bar);
      //   var tempoAdjustment = this.tempoAdjustment;

      //   // do this for each loopnode
      //   for(var i = 0; i < loopNodes.length; i++){
      //     var delta = audioCtxTime;
      //     var svg = loopNodes[i].d3Obj.svg;
      //     var multiplier = loopNodes[i].multiplier;

      //     svg.selectAll(".cue").attr("transform", function(d) {
      //       // amount to rotate from original (xPos:0, yPos:1) position
      //       var rotateDeg = (delta * speed - tempoAdjustment) / multiplier;

      //       // animation at 90, 180, 270, and 360 degree

      //       if(rotateDeg % 90 < 20 || rotateDeg % 90 > 80){
      //         svg.selectAll(".cue").attr("class", "cue darkplanet");
      //       } else{
      //         svg.selectAll(".cue").attr("class", "cue");
      //       }
      //       return "rotate(" + rotateDeg  +")";
      //     });
      //   }
      // }.bind(this));
//     },


    // play: function(button) {
    //   // Grab the value associated with the button,
    //   // will be used to identify the sound associated with the button.
    //   var soundIndex = button.value;
    //   console.log('soundIndex from play: ', soundIndex);

    //   // Grab the data object associated with the button.
    //   var soundData = data[soundIndex];

    //   console.log('playing a sound: ', soundData);
    //   // Grab the amount of time a bar takes to complete.
    //   var barTime = soundData.speed;
    //   var currentTime = this.context.currentTime;

    //   // The remainder tells us how much of the bartime we have 
    //   // completed thus far.
    //   var remainder = currentTime % barTime;
    //   console.log('currentTime:', currentTime);

    //   // The delay calculates how much we'll have to delay
    //   // the playing of the sound so that we can perfectly
    //   // match the time of the next beat.
    //   var delay = barTime - remainder;
    //   console.log('delay: ', delay);

    //   console.log('expected time of play: ', delay + currentTime);

    //   // Reassign the source associated with the soundData object
    //   // to a new buffer source. This way, we can reference the same
    //   // source to stop playing the loop. However, once stopped,
    //   // the source is basically discarded and you must create
    //   // a new one. One play per source.
    //   var source = soundData.source = this.context.createBufferSource();
    //   console.log('source', source);

    //   // Associate the new source instance with the loaded buffer.
    //   soundData.source.buffer = this.bufferLoader.bufferList[soundIndex];
    //   soundData.source.loop = true;
    //   // source.playbackRate.value = playbackControl.value;

    //   // Create a gainNode, through which we will pass the soundData.
    //   var gainNode = soundData.gainNode = this.context.createGain();
    //   // Connect the source to the gainNode.
    //   soundData.source.connect(gainNode);

    //   // Connect the gainNode to the destination.
    //   soundData.gainNode.connect(this.context.destination);

    //   // Sets the playback rate to the value of bpm / rate of the bpm being recorded
    //   soundData.source.playbackRate.value = parseInt(this.bpm) / soundData.recordedAtBpm

    //   // Play the sound, delaying the sound by the delay necessary
    //   // to make the sound play at the start of a new measure.
    //   soundData.source.loopStart = soundData.source.buffer.duration - barTime;
    //   soundData.source.loopEnd = soundData.source.buffer.duration;
    //   var delayInMilliseconds = barTime * 1000 - parseInt(delay.toString().replace(/\./g,'').slice(0,4)) 
    //   soundData.source.start(currentTime + delay, soundData.source.buffer.duration - barTime, soundData.source.buffer.duration);
          

    //   source.onended = function() {
    //     console.log('Your audio has finished playing');
    //   };

    //   console.log('source', source);
    // },

    // pause: function(button) {
    //   var soundIndex = button.value;
    //   var soundData = data[soundIndex];

    //   // Instead of creating a new bufferSource as per usual,
    //   // we retrieve the source that we have stored on our 
    //   // data objects.
    //   var source = soundData.source;
    //   source.buffer = this.bufferLoader.bufferList[soundIndex];
    //   console.log('About to pause, logging source: ', source);
    //   source.stop();
    // },

//     toggle: function(button) {
//       console.log('button: ', button);
//       // var data = button.split(" ")
//       // console.log('data: ', data);
//       console.log(button.value);
//       if (button.innerHTML == "Play") {
//         button.innerHTML = "Pause";
//         this.play(button);
//       } else {
//         button.innerHTML = "Play";
//         this.pause(button);
//       }
//     },

//     changeVolume: function(slider, t){
//       var volume, soundIndex, soundData, gainNode;

//       volume = slider.value;
//       console.log('volume: ', volume);
//       soundIndex = $(slider).attr('soundIndex');
//       console.log('soundIndex: ', soundIndex);
//       console.log('data: ', data);

//       soundData = data[soundIndex];
//       gainNode = soundData.gainNode;

//       gainNode.gain.value = volume / 100;
//       // slider : the new Volume
//       // t : the audioCtx time when Volume changed
//       // t = t || this.context.currentTime;

//       // this.volumeAdjustment = this.volumeAdjustment + t * (3/2) * (bpm - this.Params.bpm);
//       // this.Params.bpm = bpm;
//     },



//     addListeners: function(){
//       // Events
//       $('.record-new').on("click", function(e){
//         counter = parseInt(e.target.value);
//         this.loopNodes[counter - 1].multiplier = parseInt($('.multiplier').val() / 2)
//         this.recordLoopNodeAnimation(this.loopNodes[counter - 1]);
//         this.recorderDelay.call(this);
//       }.bind(this));

//       $("#sound0").on("click", function(e) {
//         console.log('button clicked');
//         this.toggle(e.target);
//       }.bind(this));
//       $("#sound1").on("click", function(e) {
//         console.log('button clicked');
//         this.toggle(e.target);
//       }.bind(this));
//       $("#sound2").on("click", function(e) {
//         this.toggle(e.target);
//       }.bind(this));
//       $("#sound3").on("click", function(e) {
//         this.toggle(e.target);
//       }.bind(this));
//       $("#sound4").on("click", function(e) {
//         this.toggle(e.target);
//       }.bind(this));
//       $("#sound5").on("click", function(e) {
//         this.toggle(e.target);
//       }.bind(this));
//       $("#sound6").on("click", function(e) {
//         this.toggle(e.target);
//       }.bind(this));

//       // this.loopNodes.forEach(function(loopNodeObj){
//       //   $(loopNodeObj.class).on('click', function(){
//       //     this.recordLoopNodeAnimation(loopNodeObj);
//       //   }.bind(this));
//       // }.bind(this));

//       $('#tempo').on('input', function(e){
//         console.log(e.target.value);
//         this.changeTempo(e.target.value);
//       }.bind(this));

//       $('.muteLoop1').on('click', function(){
//         this.pauseLoopNodeAnimation(this.loopNodes[0]);
//       }.bind(this));
//       $('.unmuteLoop1').on('click', function(){
//         this.playLoopNodeAnimation(this.loopNodes[0]);
//       }.bind(this));
//       $('.recordLoop1').on('click', function(){
//         this.recordLoopNodeAnimation(this.loopNodes[0]);
//       }.bind(this));

//       //audio 

//       $('#volume1').on('input', function(e){
//         console.log(e.target.value);
//         this.changeVolume(e.target);
//       }.bind(this));

//       $('#volume2').on('input', function(e){
//         console.log(e.target.value);
//         this.changeVolume(e.target);
//       }.bind(this));

//       $('#volume3').on('input', function(e){
//         console.log(e.target.value);
//         this.changeVolume(e.target);
//       }.bind(this));

//       $('#volume4').on('input', function(e){
//         console.log(e.target.value);
//         this.changeVolume(e.target);
//       }.bind(this));

//       $('#volume5').on('input', function(e){
//         console.log(e.target.value);
//         this.changeVolume(e.target);
//       }.bind(this));

//       $('#volume6').on('input', function(e){
//         console.log(e.target.value);
//         this.changeVolume(e.target);
//       }.bind(this));

//     }
//   };
// });


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

var LoopNodeModel = Backbone.Model.extend({
  defaults: {
    url: '',
    //refactor speed to barTime
    speed: 2,
    multiplier: 1,
    source: null,
    gainNode: null,
    recordedAtBpm: null,
    // port: loopNodeForTrack.nextPort(),
    startPlayingTime: null,
    endPlayingTime: null,
    d3Obj: null
  },

});

var LoopNodeEntryView = Backbone.View.extend({

  template: _.template('<div class="loopNode<%= port %>"></div>'),

  createLoopNode: function(loopNodeClass, xPos, yPos){
    var d3Container = {};
    var w = 400, h = 400;
    
    var planets = [
      { R: 150, r: 10}
    ];
    var svg = d3.select(this.el).insert("svg")
      .attr("width", w).attr("height", h);
      // append sun
    svg.append("circle").attr("r", 20).attr("cx", w/2)
      .attr("cy", h/2).attr("class", "sun");

    var container = svg.append("g")
      .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

    container.selectAll("g").data(planets).enter().append("g")
      .each(function(d, i) {
        d3.select(this).append("circle").attr("class", "disc")
          .attr("r", d.R);
        d3.select(this).append("circle").attr("r", d.r).attr("cx",xPos)
          .attr("cy", -yPos).attr("class", loopNodeClass + "cue" );
      });

    d3Container.svg = svg;
    d3Container.container = container;

    return d3Container;
  }, 

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    var loopNodeClass = 'loopNode' + this.model.get('port');
    var startAngle = 0; //starting angle should be 0
    var radius = 150;
    var x = xPos(startAngle, radius);
    var y = yPos(startAngle, radius);
    var d3obj = this.createLoopNode(loopNodeClass, x, y)
    this.model.set('d3Obj',d3obj);

    return this.$el.html();
  }
  
});

var LoopNodesView = Backbone.View.extend({

  initialize: function() {

  },

  initialRender: function() {
    var that = this;
    // this.$el.children().detach();
    this.collection.each(function(loopNode) {
      that.$el.append(new LoopNodeEntryView({model: loopNode}).render());
    });

    return this.$el.html();
  }

});

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


//Get data from server...
// Asyncronous callback most likely.

// var loopNode1 = new LoopNodeModel({url: "../client/audio/click.mp3", speed:2, port: 1, recordedAtBpm: 120});
// var loopNode2 = new LoopNodeModel({url: "../client/audio/metronome2.mp3", multiplier:2, port: 2, recordedAtBpm: 120});
// var loopNode3 = new LoopNodeModel({url: "../client/audio/metronome2.mp3", speed:2, port: 3, recordedAtBpm: 120});
// var loopNode4 = new LoopNodeModel({url: "../client/audio/metronome2.mp3", speed:2, port: 4, recordedAtBpm: 120});
// var loopNode5 = new LoopNodeModel({url: "../client/audio/metronome2.mp3", speed:2, port: 5, recordedAtBpm: 120});
// var loopNode6 = new LoopNodeModel({url: "../client/audio/metronome2.mp3", speed:2, port: 6, recordedAtBpm: 120});
// var loopNodesForTrack = new LoopNodeCollection( [loopNode1,
//                                                 loopNode2,
//                                                 loopNode3,
//                                                 loopNode4,
//                                                 loopNode5,
//                                                 loopNode6]);
// // loopNodesForTrack.populateLoopNodes();
// // loopNodesForTrack.set('d3timer', d3timer(this shit we want to run))
// var track = new TrackModel({loopNodes: loopNodesForTrack});

// var loopNodesView = new LoopNodesView({collection: loopNodesForTrack});

// $('body').append(loopNodesView.initialRender());
// track.setCueAnimation();

//   var recorder;
//   var counter = 1;


// playbackControl.oninput = function() {
//    playbackValue.innerHTML = playbackControl.value;
// }
