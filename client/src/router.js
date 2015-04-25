define([
  'Models/AppModel',
  'Views/AppView',
  'Models/TrackModel',
  'Views/TrackView',
  'Views/MainView'
], function(AppModel, AppView, TrackModel, TrackView, MainView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Routes
      '': 'loadMainView',
      'tracks': 'showTracks',
      'tracks/:id': 'showTrackView',
      // bad url's
      '*badUrl': 'default'
    },


    loadMainView: function(){
      // kill any running audiocontext
      if(this.track){
        this.track.get('context').close()
      }

      if(!this.mainView){
        this.mainView = new MainView();
        $('body').html(this.mainView.render().el);
      }
      this.mainView.renderAppView();
    },
    showTracks: function(){
      // Show All Tracks page
    },
    showTrackView: function(id){
      if(this.track){
        this.track.get('context').close()
      }
      
      if(!this.mainView){
        this.mainView = new MainView();
        $('body').html(this.mainView.render().el);
      }
      // Track View page
      // Note: we need to set up ids.

      var audioData = null
      
      if(id === "new"){
        // https://loopjammin.blob.core.windows.net/loopnodes/853ce6188630fcc47df53b664df.mp3Base64 -- mp3Multipler: 2
        audioData =  [ {url: "", speed:2, port: 1, recordedAtBpm: 120}]
        this.track = new TrackModel({audioData: audioData});
        var trackView = new TrackView({model: this.track});

        this.mainView.renderTrackView(trackView);
        this.track.setd3timer();
        this.track.get('loopNodes').each(function(loopNode){loopNode.set('rerender', !loopNode.get('rerender'))})

      } else {
        $this = this;
          $.ajax({
            type: "POST",
            url: "/tracks/:id",
            data: {trackID: id}
          }).done(function(data){
              audioData =  JSON.parse(data.audioData);
              for(var i = 0; i < audioData.length; i++){
                audioData[i].port = i + 1;
              }
              $this.track = new TrackModel({audioData: audioData});
              $this.track.set('tempo', data.tempo);
              var trackView = new TrackView({model: $this.track});

            $this.mainView.renderTrackView(trackView);
            $this.track.setd3timer();
            $this.track.get('loopNodes').each(function(loopNode){loopNode.set('rerender', !loopNode.get('rerender'))})

            });
      }

      
    },
    default: function(badUrl){
      // Route all bad url's to here.
      $(".main").html("404: the page doesn't exist. You tried to access: " + badUrl);
    }

  });

  return AppRouter;
});
