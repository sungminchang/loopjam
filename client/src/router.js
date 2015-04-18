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
      $(".main").html(appView.render().el);
    },
    showTracks: function(){
      // Show All Tracks page
    },
    showTrackView: function(id){
      // Track View page
      // Note: we need to set up ids.

      var audioData = [ {url: "", speed:2, port: 1, recordedAtBpm: 120}
      ];
      var track = new TrackModel({audioData: audioData});
      var trackView = new TrackView({model: track});

      $(".main").html(trackView.render().el);
      track.setCueAnimation();

      $(function() {
          $(".dial").knob({
          });
      });

    },
    default: function(badUrl){
      // Route all bad url's to here.
      $(".main").html("404: the page doesn't exist. You tried to access: " + badUrl);
    }


  });

  return AppRouter;
});