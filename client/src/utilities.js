var TrackParams = function(_t, _bpm, _startTimeStamp){
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