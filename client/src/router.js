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

    var audioData = null
      
      if(id === "new"){
        // https://loopjammin.blob.core.windows.net/loopnodes/853ce6188630fcc47df53b664df.mp3Base64 -- mp3Multipler: 2
        audioData =  [ {url: "audio/tambourines2.mp3", speed:2, port: 1, recordedAtBpm: 120, recorded: true}];
        var track = new TrackModel({audioData: audioData});
        var trackView = new TrackView({model: track});

        $(".main").html(trackView.render().el);
        track.setCueAnimation();

        track.get('loopNodes').each(function(loopNode){loopNode.set('rerender', !loopNode.get('rerender'))})
      $(".main").html(trackView.render().el);
      track.setd3timer();


        $(".dial").knob();
      } else {
        // Fetch
      }

      
    },
    default: function(badUrl){
      // Route all bad url's to here.
      $(".main").html("404: the page doesn't exist. You tried to access: " + badUrl);
    }


  });

  return AppRouter;
});