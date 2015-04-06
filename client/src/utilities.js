var TrackParams = function(_t, _bpm){
  // INPUT:
    // _t = global time (in sec)
    // _bpm = global tempo (in beats per min)
  
  this.t = _t || 0; //Note: I'm assuming this to be the timer time from audio.
  this.bpm = _bpm || 120;
};

TrackParams.prototype.bar = function(){
  // 1 bar = 4 beats / [bpm / 60 (sec/min)]
  //       = 240 / bpm
  return 240 / this.bpm;    
};
TrackParams.prototype.angPos_rad = function(multiplier){
  // angular position in radian, assuming 0 corresponds to top of circle
  return 2 * Math.PI * this.t / (multiplier * this.bar());
};
TrackParams.prototype.angPos = function(multiplier){
  // angular position in degree
  return this.angPos_rad(multiplier) * 360 / (2 * Math.PI);
};

TrackParams.prototype.xPos = function(multiplier){
  // x-position for given multiplier, assuming radius is 1
  return Math.cos((1 / 2 * Math.PI) + this.angPos_rad(multiplier));
};

TrackParams.prototype.yPos = function(multiplier){
  // y-position for given multiplier, assuming radius is 1
  return Math.sin((1 / 2 * Math.PI) + this.angPos_rad(multiplier));
};
TrackParams.prototype.speed = function(){
  // speed parameter for D3 rotation.
  return 360 / this.bar();    
};


var bar = function(bpm){
  // OUTPUT: seconds per 4 beats
  // INPUT: bpm
  // 1 bar = 4 beats / [bpm / 60 (sec/min)]
  //       = 240 / bpm
  return 240 / bpm;    
};

var angPos_rad = function(t, bar, tempoAdjustment, multiplier){
  // OUTPUT: angular position in radian, assuming 0 corresponds to top of circle
  // INPUT:
    // t: in seconds
    // bar: seconds for 1 bar
    // tempoAdjustment: degree adjustment taken account for prior tempo changes (in radian) (default: 0)
    // multipler: mutlplier (default: 1)

  tempoAdjustment = tempoAdjustment || 0;
  multiplier = multipler || 1;
  return 2 * Math.PI * t / (multiplier * bar) + tempoAdjustment;
};

var angPos = function(t, bar, tempoAdjustment, multiplier){
  // OUTPUT: angular position in radian, assuming 0 corresponds to top of circle
  // INPUT:
    // t: in seconds
    // bar: seconds for 1 bar
    // tempoAdjustment: degree adjustment taken account for prior tempo changes (in degree) (default: 0)
    // multipler: mutlplier (default: 1)

  return t / (multiplier * bar) * 360 + tempoAdjustment;
};

var xPos = function(angPos, r){
  // OUTPUT: x-position for given angle in degree, assuming radius is 1
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  return Math.cos((1 / 2 * Math.PI) + angPos * 2 * Math.PI / 360);
};

var xPos_rad = function(angPos_rad, r){
  // OUTPUT: x-position for given angle in degree, assuming radius is 1
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  return Math.cos((1 / 2 * Math.PI) + angPos);
};


var yPos = function(angPos, r){
  // OUTPUT: y-position for given angle in degree, assuming radius is 1
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  return Math.sin((1 / 2 * Math.PI) + angPos * 2 * Math.PI / 360);
};

var yPos_rad = function(angPos_rad, r){
  // OUTPUT: y-position for given angle in degree, assuming radius is 1
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  return Math.sin((1 / 2 * Math.PI) + angPos);
};

var speed = function(bar){
  // speed parameter for D3 rotation.
  return 360 / bar;    
};