var calcBar = function(bpm){
  // OUTPUT: seconds per 4 beats
  // INPUT: bpm
  // 1 bar = 4 beats / [bpm / 60 (sec/min)]
  //       = 240 / bpm
  return 240 / bpm;    
};

var calcSpeed = function(bar){
  // speed parameter for D3 rotation.
  // one bar should correspond to one full rotation;

  return 360 / bar;    
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
  // OUTPUT: x-position for given angle in degree
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  r = r || 1;
  return r * Math.cos((1 / 2 * Math.PI) + angPos * 2 * Math.PI / 360);
};

var xPos_rad = function(angPos_rad, r){
  // OUTPUT: x-position for given angle in degree
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  r = r || 1;
  return r * Math.cos((1 / 2 * Math.PI) + angPos);
};


var yPos = function(angPos, r){
  // OUTPUT: y-position for given angle in degree
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  r = r || 1;
  return r * Math.sin((1 / 2 * Math.PI) + angPos * 2 * Math.PI / 360);
};

var yPos_rad = function(angPos_rad, r){
  // OUTPUT: y-position for given angle in degree
  // INPUT: 
    // angPos: angular position in degree
    // r: radius (default: 1)
  r = r || 1;
  return r * Math.sin((1 / 2 * Math.PI) + angPos);
};

