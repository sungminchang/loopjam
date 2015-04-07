(function() {


/////////// Initialize AudioContext, Bufferloader, Recordings /////////
////////////////////////////////////////////////////

var context; 
var bufferLoader;

var data = [
{url: "click.mp3", speed:2, port:0, recordedAtBpm: 120}, 
{url: "metronome2.mp3", speed:2, port:1, recordedAtBpm: 120}
];

var init = function() {

  // Check for variations of prefixed versions of the Web Audio API
  var contextClass = (window.AudioContext || 
    window.webkitAudioContext || 
    window.mozAudioContext || 
    window.oAudioContext || 
    window.msAudioContext);

  if (contextClass) {
    // alert("it works")
    context = new contextClass();
    console.log('context created: ', context);

    // Initialize a new instance of the BufferLoader class,
    // passing in our context and data object. BufferLoader
    // will buffer all of the recordings and hold onto
    // references for the buffers.
    bufferLoader = new BufferLoader(
      context,
      data
      );

    // Invoking bufferLoader's .load method does the actual
    // buffering and loading of the recordings, and stores
    // the buffers on the bufferloader instance.
    bufferLoader.load();

  } else {
    // Web Audio API is not available. Ask the user to use a supported browser.
    alert('Web Audio API is not available');
  }

  // Not sure what these lines of codes do, commented them out
  // for now.
  // setInterval = (function(){
  // source.loopEnd -= 0.1
  // }, 20)

  // source.loopStart;
  // source.loopEnd;
};

// Register 'init' as the function to execute once
// the window emits its 'load' event.
window.onload = init;

///////// Create Instance of AudioContext ///////////
/////////////////////////////////////////////////////

var play = function(button) {
  // Grab the value associated with the button,
  // will be used to identify the sound associated with the button.
  var soundIndex = button.value;

  // Grab the data object associated with the button.
  var soundData = data[soundIndex];

  console.log('playing a sound: ', soundData);

  // Grab the amount of time a bar takes to complete.
  var barTime = soundData.speed;

  var currentTime = context.currentTime;

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
  var source = soundData.source = context.createBufferSource();

  // Associate the new source instance with the loaded buffer.
  soundData.source.buffer = bufferLoader.bufferList[soundIndex];
  soundData.source.loop = true;
  // source.playbackRate.value = playbackControl.value;

  // Create a gainNode, through which we will pass the soundData.
  var gainNode = soundData.gainNode = context.createGain();
  // Connect the source to the gainNode.
  soundData.source.connect(gainNode);

  //Connect the gainNode to the destination.
  soundData.gainNode.connect(context.destination);

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
};

var pause = function(button) {
  var soundIndex = button.value;
  var soundData = data[soundIndex];

  // Instead of creating a new bufferSource as per usual,
  // we retrieve the source that we have stored on our 
  // data objects.
  var source = soundData.source;
  source.buffer = bufferLoader.bufferList[soundIndex];
  console.log('About to pause, logging source: ', source);
  source.stop();
};

var toggle = function(button) {
  console.log('button: ', button);
  // var data = button.split(" ")
  // console.log('data: ', data);
  console.log(button.value)
  if (button.innerHTML == "Play") {
    button.innerHTML = "Pause";
    play(button);
  } else {
    button.innerHTML = "Play";
    pause(button);
  }
};

var changeVolume = function(slider, t){
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
  // t = t || context.currentTime;

  // this.volumeAdjustment = this.volumeAdjustment + t * (3/2) * (bpm - this.Params.bpm);
  // this.Params.bpm = bpm;
};


// playbackControl.oninput = function() {
//   sound.playbackRate.value = playbackControl.value;
//   playbackValue.innerHTML = playbackControl.value;
// }


///////////// Register Event Listeners ///////////////
//////////////////////////////////////////////////////

$(document).ready(function(){

  // $('#slider').slider();

  $('#volume0').on('input', function(e){
    console.log(e.target.value);
    changeVolume(e.target);
  });

  $('#volume1').on('input', function(e){
    console.log(e.target.value);
    changeVolume(e.target);
  });

  $('#sound1').on('click', function(e) {
    toggle(e.target);
  });

  $('#sound2').on('click', function(e) {
    toggle(e.target);
  });
  
});


})();