define([
 'Collections/LoopNodeCollection',
 'Models/LoopNodeModel'
], 
function(LoopNodeCollection, LoopNodeModel){ 
  var TrackModel = Backbone.Model.extend({
      defaults: {
      context: null,
      bufferLoader: null,
      tempo: 120,
      port: 0,
      tempoAdjustment: 0,
      recorder: null,
      loopNodes: null,  //soundData
      selectedLoopNode: null,
      animationTimer: null,
      analyser: null,
      visualFreqData: null,
      metronomeNode: null,
      metronomeBuffer: null,
      metronomePlaying: false
    },

    initialize: function(params) {

      var metronome = new LoopNodeModel(params.audioData.slice(0,1));
      this.set('metronomeNode', metronome);

      var loopNodesForTrack = new LoopNodeCollection(params.audioData);
      this.set('loopNodes', loopNodesForTrack)

      // By default, select the first loopnode.
      this.set('selectedLoopNode', this.get('loopNodes').models[0]);      
      // event listener for loopNode selection
      this.get('loopNodes').on('selected', function(selectedLoopNode){
        this.set('selectedLoopNode', selectedLoopNode);
      }, this);

      this.setAudioContext();
      this.setAnalyser();
      this.freqAnimationUpdate();


      this.get('loopNodes').on("record", function(currentLoop){
        this.recorderDelay(currentLoop);     
      }.bind(this))

      this.get('loopNodes').on("queue", function(currentLoop){
        this.queue(currentLoop);     
      }.bind(this))

      this.get('loopNodes').on("pause", function(currentLoop){
        this.pause(currentLoop);     
      }.bind(this))

      // this.on("change:tempo", function(currentLoop){
      //   console.log('changing the tempo');
      //   this.changeTempo(this.get('tempo'));
      // }.bind(this))


      // this.set('animationTimer', d3.timer(params.loopNodes.updateAnimationPosition(this.get('tempo'), this.get('tempoAdjustment'), this.get('context').currentTime)));
    },

    setAudioContext: function() { 
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
        this.set('bufferLoader', new BufferLoader(
          this.get('context'),
          this.get('loopNodes').giveUrls() // DEVELOP THIS METHOD OUTDEVELOP THIS METHOD OUTDEVELOP THIS METHOD OUT
          )
        );
        
        // Invoking bufferLoader's .load method does the actual
        // buffering and loading of the recordings, and stores
        // the buffers on the bufferloader instance.
        this.get('bufferLoader').load(this);
        // this.set('metronomeBuffer', this.get('bufferLoader').bufferList.splice(0,1));

      } else {
        // Web Audio API is not available. Ask the user to use a supported browser.
        alert('Web Audio API is not available');
      }
    },

      startUserMedia: function(stream) {
        console.log("Inside StartUserMedia")
        console.log(this.get('context'))
        var input = this.get('context').createMediaStreamSource(stream);
        console.log('Media stream created.' );
        console.log("input sample rate " +input.context.sampleRate);
        
        // input.connect(context.destination);
        console.log('Input connected to audio context destination.');
        
        this.set('recorder', new Recorder(input));
        console.log('Recorder initialised.');
      },

      setAnalyser: function(){
        // Set the analyser
        var context = this.get('context');
        var analyser = context.createAnalyser();
        console.log('Analyser set up for Audio context', analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 64;
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);

        this.set('analyser', analyser);
        this.set('visualFreqData', frequencyData);

      },

      freqAnimationUpdate: function(){
        requestAnimationFrame(function(){
          this.freqAnimationUpdate();
        }.bind(this));

        var analyser = this.get('analyser');
        var frequencyData = this.get('visualFreqData');

        analyser.getByteFrequencyData(frequencyData)
      },


      recorderDelay: function(currentLoop) {

        console.log('Starting Record:');
        // Grab the amount of time a bar takes to complete.
        var tempo = this.get('tempo');
        var multiplier = currentLoop.get('multiplier');
        var barTime = multiplier * calcBar(tempo);
        var currentTime = this.get('context').currentTime;
        var tempoAdjustment = this.get('tempoAdjustment');
        
        currentLoop.set('speed', barTime);
        currentLoop.set('recordedAtBpm', tempo);

        var barTimePlayed = (currentTime - tempoAdjustment / 360 * calcBar(tempo))  % barTime;

        var delay = barTime - barTimePlayed;

        console.log('tempoAdjustment', tempoAdjustment, 'barTimePlayed', barTimePlayed, 'delay', delay);

        console.log('Will delay by ', delay, 'seconds');
        var delayInMilliseconds = parseInt(delay.toString().replace(/\./g,'').slice(0,4))  // FUNCTION TO CHANGE!!!

        console.log("Context Current-time", this.get('context').currentTime)
        console.log("Record will start in:", delayInMilliseconds, "ms")
        console.log("Expected time of recording:", currentTime*1000 + delayInMilliseconds, "ms")
        console.log("Record will stop in:", delayInMilliseconds + barTime * 1000, "ms")
        
        var barTimeInMS = barTime * 1000;

        setTimeout(this.startRecording.bind(this, currentLoop), delayInMilliseconds - 100)
        setTimeout(this.stopRecording.bind(this, currentLoop), delayInMilliseconds + barTimeInMS + 50)
        setTimeout(this.preBuffer.bind(this), delayInMilliseconds + barTimeInMS + 500)
      },
      
      startRecording: function(currentLoop) {
        console.log("time started recording:", this.get('context').currentTime)
        
        var rerenderRecording = function(){
          currentLoop.set('queue', !currentLoop.get('queue'));
          currentLoop.set('recording', !currentLoop.get('recording'));
          currentLoop.set('rerender', !currentLoop.get('rerender'))
        }

        setTimeout(rerenderRecording,100)

        this.get('recorder') && this.get('recorder').record();
        // button.disabled = true;
        // button.nextElementSibling.disabled = false;
        console.log('Recording...');
        console.time("recording1")
      

      },

      stopRecording: function(currentLoop) {
            
        console.log("time stopped recording:", this.get('context').currentTime)
        this.get('recorder') && this.get('recorder').stop();
        console.timeEnd("recording1")
        // button.disabled = true;
        // button.previousElementSibling.disabled = false;
        console.log('Stopped recording.');
        // create WAV download link using audio data blob
        this.createDownloadLink(currentLoop);

        currentLoop.set('recording', !currentLoop.get('recording'));
        currentLoop.set('recorded', !currentLoop.get('recorded'));
        currentLoop.set('rerender', !currentLoop.get('rerender'));

        this.get('recorder').clear();
      },

      createDownloadLink: function(currentLoop) {
        this.get('recorder') && this.get('recorder').exportWAV(function(blob) {


          var url = URL.createObjectURL(blob);
          var li = document.createElement('li');
          var au = document.createElement('audio');
          var hf = document.createElement('a');
          
          currentLoop.set('url', url);
          console.log("where is URL",currentLoop.get('url'))
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
            this.get('context'),
            this.get('loopNodes').giveUrls() // NEED TO DEVELOP THIS OUT NEED TO DEVELOP THIS OUT
            )
          );

          // Invoking bufferLoader's .load method does the actual
          // buffering and loading of the recordings, and stores
          // the buffers on the bufferloader instance.
          this.get('bufferLoader').load();
      },

    setCueAnimation: function(){
      d3.timer(function(){
        var loopNodes = this.get('loopNodes');
        var audioCtxTime = this.get('context').currentTime;
        var bar = calcBar(this.get('tempo'));
        var angularSpeed = calcSpeed(bar);
        var tempoAdjustment = this.get('tempoAdjustment');
        loopNodes.each(function(loopNode) {

          var delta = audioCtxTime;
          var svg = loopNode.get('d3Obj').svg;
          var loopNodeClass = '.loopNode' + loopNode.get('port');
          var multiplier = loopNode.get('multiplier');
          var rotateDeg = (delta * angularSpeed - tempoAdjustment) / multiplier;
          var degree = (rotateDeg % 360)


          
            // Recording && play flags for cursor
            if((!loopNode.get('queue') && loopNode.get('recording') && !loopNode.get('playing') && !loopNode.get('recorded')) 
              || (!loopNode.get('queue') && !loopNode.get('recording') && loopNode.get('playing') && loopNode.get('recorded'))){
              $(loopNodeClass).trigger('configure', {cursor: false});
            } else {
              $(loopNodeClass).trigger('configure', {cursor: true});
            }

          // console.log(degree)        
              $(loopNodeClass).val(degree).trigger('change');
            
          });
        }.bind(this));
      },

      changeTempo: function(bpm, t){
        // bpm : the new tempo
        // t : the audioCtx time when tempo changed
        t = t || this.get('context').currentTime;
        this.set('tempoAdjustment', this.get('tempoAdjustment') + t * (3/2) * (bpm - this.get('tempo')));
        this.set('tempo', bpm);

        var loopNodes = this.get('loopNodes');
        var metronomeNode = this.get('metronomeNode');
        metronomeNode.get('source').playbackRate.value = parseInt(bpm) / 120;

        loopNodes.each(function(loopNode, i){
          // if (i === 0) { return true;}
          var currentSource = loopNode.get('source');
          if(currentSource){
            currentSource.playbackRate.value = parseInt(bpm) / loopNode.get('recordedAtBpm');
          }    
        });
      },

      queue: function(currentLoop, buffer) {
        // Grab the value associated with the button,
        // will be used to identify the sound associated with the button.
        var soundIndex = currentLoop.get('port') - 2;
        console.log('soundIndex from play: ', soundIndex);

        var context = this.get('context');

        // Grab the data object associated with the button.

        // console.log('playing a sound: ', soundData);
        // Grab the amount of time a bar takes to complete.
        // var multiplier = currentLoop.get('multiplier');
        var currentTime = context.currentTime;
        var tempo = this.get('tempo');

        // The remainder tells us how much of the bartime we have 
        // completed thus far.

        var recordedAtBpm = currentLoop.get('recordedAtBpm') || 120;
        var multiplier = currentLoop.get('multiplier');
        var barTime = currentLoop.get('speed');
        var tempoAdjustment = this.get('tempoAdjustment');

        var remainder = (currentTime - tempoAdjustment / 360 * calcBar(tempo))  % (multiplier * calcBar(tempo));
        console.log('currentTime:', currentTime);

        // The delay calculates how much we'll have to delay
        // the playing of the sound so that we can perfectly
        // match the time of the next beat.
        var delay = multiplier * calcBar(tempo) - remainder;
        console.log('delay: ', delay);

        console.log('expected time of play: ', delay + currentTime);

        // Reassign the source associated with the soundData object
        // to a new buffer source. This way, we can reference the same
        // source to stop playing the loop. However, once stopped,
        // the source is basically discarded and you must create
        // a new one. One play per source.
        currentLoop.set('source',context.createBufferSource());
        var source = currentLoop.get('source');
        console.log('source', source);

        // Associate the new source instance with the loaded buffer.
        source.buffer = buffer || this.get('bufferLoader').bufferList[soundIndex];
        source.loop = true;
        // source.playbackRate.value = playbackControl.value;

        // Create a gainNode, through which we will pass the soundData.
        currentLoop.set('gainNode', context.createGain());
        var gainNode = currentLoop.get('gainNode');
        // Connect the source to the gainNode.
        source.connect(gainNode);

        // Connect the gainNode to the destination.
        gainNode.connect(context.destination);

        // Connect the source to the analyser, and then the analyser to the context destination
        var analyser = this.get('analyser');
        source.connect(analyser);
      

        // Sets the playback rate to the value of bpm / rate of the bpm being recorded
        source.playbackRate.value = parseInt(tempo) / recordedAtBpm;

        // Play the sound, delaying the sound by the delay necessary
        // to make the sound play at the start of a new measure.
        source.loopStart = source.buffer.duration - barTime;
        source.loopEnd = source.buffer.duration;
        var delayInMilliseconds = barTime * 1000 - parseInt(delay.toString().replace(/\./g,'').slice(0,4)) 
        var delayToChangeViews = parseInt(delay.toString().replace(/\./g,'').slice(0,4)) 

        var letViewsKnowQueueIsComplete = function(){
          currentLoop.set('playing', !currentLoop.get('playing'))
          currentLoop.set('queue', !currentLoop.get('queue'));
          currentLoop.set('rerender', !currentLoop.get('rerender'))
        }

        console.log("activated: ", delayInMilliseconds)
        setTimeout(letViewsKnowQueueIsComplete, delayToChangeViews)
        source.start(currentTime + delay, source.loopStart, source.buffer.duration);
            

        source.onended = function() {
          console.log('Your audio has finished playing');
        };

        console.log('source', source);
      },


      pause: function(currentLoop, buffer) {
        var soundIndex = currentLoop.get('port') - 2;
        var source = currentLoop.get('source');

        // Instead of creating a new bufferSource as per usual,
        // we retrieve the source that we have stored on our 
        // data objects.
        source.buffer = buffer || this.get('bufferLoader').bufferList[soundIndex];
        console.log('About to pause, logging source: ', source);
        source.stop();
      }

    // this.tempoAdjustment = 0; //adjustment parameter when user changes tempo. initially set at 0.
    // this.bpm  = bpm || 120;


    // storage array for all the containing loop node
    // this.loopNodes = [];

    // this.populateLoopNodes();
    // this.setCueAnimation();
    // this.addListeners();
    // },
  })
  return TrackModel;
});
