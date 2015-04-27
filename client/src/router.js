define([
  'Models/AppModel',
  'Views/AppView',
  'Models/TrackModel',
  'Views/TrackView',
  'Views/MainView',
  'text!templates/BrowserAlertViewTemplate.html'
], function(AppModel, AppView, TrackModel, TrackView, MainView, BrowserAlertTemplate){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Routes
      '': 'loadMainView',
      'tracks': 'showTracks',
      'tracks/:id': 'showTrackView',
      // bad url's
      '*badUrl': 'default'
    },

    execute: function(callback, args) {
      var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
      var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
      var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
          // At least Safari 3+: "[object HTMLElementConstructor]"
      var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
      var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
      if (!isChrome) {
        this.loadBrowserAlertView();
      } else {
        if (args) {
          callback.apply(null, args);
        } else {
          callback();
        }
      }
    },

    browserAlertTemplate: Handlebars.compile(BrowserAlertTemplate),

    loadBrowserAlertView: function() {
      var BrowserAlertTemplate = this.browserAlertTemplate;
      $('body').html(BrowserAlertTemplate());
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
