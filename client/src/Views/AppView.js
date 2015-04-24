define([
  'text!templates/AppViewTemplate.html',
  'text!templates/RecentTracksViewTemplate.html',
], function(template, recentTracksTemplate){
  var AppView = Backbone.View.extend({

    template: Handlebars.compile(template),

    initialize: function(){

      },

    events:{
    },

    render: function() {
      // Load Template
      this.$el.html(this.template());
      this.renderRecentTracks();


      $.ajax({
        type: "POST",
        url: "/tracks/:id",
        data: {trackID: id},
        success: function(data){
          audioData =  JSON.parse(data.audioData);
          for(var i = 0; i < audioData.length; i++){
            audioData[i].port = i + 1;
          }
          var track = new TrackModel({audioData: audioData});
          var trackView = new TrackView({model: track});

        $this.mainView.renderTrackView(trackView);
        track.setd3timer();
        track.get


      var signup = this.$el.find('#signup');
      signup.on('click', function() {
        $.ajax({
          type: 'POST',
          url: '/signup'
        })
      });
      return this;
    },

    renderRecentTracks: function() {
      this.$el.find('.recentTracks').children().detach();
      var recentsTemplate = Handlebars.compile(recentTracksTemplate)
      this.$el.find('.recentTracks').html(recentsTemplate());
      var $this = this;
    
      $this.$el.find('#table').bootstrapTable({
        url: '/tracks',
        responseHandler: function(d) {
          for (var i = 0; i < d.length; i++) {
            var trackname = d[i]['trackname'].toString();
            var trackID = d[i]['trackID'].toString();
            d[i]['trackname'] = '<a href="/#/tracks/' + trackID + '">' + trackname + ' </a> ';
          }
          return d;
        }
      });
      }
    
  });

  return AppView;
});
