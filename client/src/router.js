define([
  'Models/AppModel',
  'Views/AppView',
  'Models/TrackModel',
  'Views/TrackView',
], function(AppModel, AppView, TrackModel, TrackView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Routes
      '': 'showAppView',
      'tracks': 'showTracks',
      'tracks/:id': 'showTrackView',
      // bad url's
      '*badUrl': 'default'
    },

    showAppView: function(){
      // Landing Page
      var appModel = new AppModel();
      var appView = new AppView({model: appModel});
      $(document.body).append(appView.render().el);
    },
    showTracks: function(){
      // Show All Tracks page
    },
    showTrackView: function(id){
      // Track View page

      var audioData = [{url: "/audio/click.mp3", speed:2, port: 1, recordedAtBpm: 120},
      {url: "/audio/metronome2.mp3", speed:2, port: 2, recordedAtBpm: 120},
      {url: "/audio/metronome2.mp3", speed:2, port: 3, recordedAtBpm: 120},
      {url: "/audio/metronome2.mp3", speed:2, port: 4, recordedAtBpm: 120},
      {url: "/audio/metronome2.mp3", speed:2, port: 5, recordedAtBpm: 120},
      {url: "/audio/metronome2.mp3", speed:2, port: 6, recordedAtBpm: 120}]

      var track = new TrackModel({audioData: audioData});
      var trackView = new TrackView({model: track});

      $(document.body).append(trackView.render().el);
      track.setCueAnimation();

      $(function() {
          $(".dial").knob({
          });
      });

    },
    default: function(badUrl){
      // Route all bad url's to here.
      $(document.body).append("404: the page doesn't exist. You tried to access: " + badUrl);
    }


  });

  return AppRouter;
});