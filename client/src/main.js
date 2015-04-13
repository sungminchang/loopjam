require.config({
  baseUrl: './src', 
  paths: {
  }
});

define([
  'Models/TrackModel',
  'Views/LoopNodesView'
], function(TrackModel, LoopNodesView){
  $(function(){

    // trackOld.initialize();
    $('.selectpicker').selectpicker();

    
    var audioData = [{url: "/audio/click.mp3", speed:2, port: 1, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 2, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 3, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 4, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 5, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 6, recordedAtBpm: 120}]
    // loopNodesForTrack.populateLoopNodes();
    // loopNodesForTrack.set('d3timer', d3timer(this shit we want to run))
    var track = new TrackModel({audioData: audioData});

    var loopNodesView = new LoopNodesView({collection: track.get('loopNodes')});

    $('body').append(loopNodesView.render().el);
    track.setCueAnimation();
  });
});


