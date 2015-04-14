require.config({
  baseUrl: './src', 
  paths: {
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
    templates: '../templates'
  }
});

define([
  'text',
  'Models/TrackModel',
<<<<<<< HEAD
  'Views/TrackView',
  'Views/LoopNodesView',
  'Views/TrackInfoView'
], function(text, TrackModel, TrackView, LoopNodesView, TrackInfoView){
=======
  'Views/LoopNodesView',
  'Views/TrackInfoView'
], function(text, TrackModel, LoopNodesView, TrackInfoView){
>>>>>>> 1f9fb581b97fe95d1e92bbd29fba8597c289d286
  $(function(){

    // trackOld.initialize();
    $('.selectpicker').selectpicker();

    
    var audioData = [{url: "/audio/click.mp3", speed:2, port: 1, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 2, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 3, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 4, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 5, recordedAtBpm: 120},
    {url: "/audio/metronome2.mp3", speed:2, port: 6, recordedAtBpm: 120}]

    var track = new TrackModel({audioData: audioData});
    var trackView = new TrackView({model: track});

    $('body').append(trackView.render().el);
    var loopNodesView = new LoopNodesView({collection: track.get('loopNodes')});
    var trackInfoView = new TrackInfoView({model: track});

<<<<<<< HEAD
=======
    $('body').append(trackInfoView.render().el);
    $('body').append(loopNodesView.render().el);
>>>>>>> 1f9fb581b97fe95d1e92bbd29fba8597c289d286
    track.setCueAnimation();

    $(function() {
        $(".dial").knob({
        });
    });


  });
});


