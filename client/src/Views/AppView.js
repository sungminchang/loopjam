define([
  'text!templates/AppViewTemplate.html',
  'text!templates/MiniTrackInfoTemplate.html',
], function(template, miniTrackInfo){
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

      return this;
    },

    renderRecentTracks: function() {
      this.$el.find('.recentTracks').children().detach();
      var miniTemplate = Handlebars.compile(miniTrackInfo)
      var that = this;
    
      $.ajax({
        type: 'GET',
        url: '/tracks',
        success: function(d) {
          for (var i = 0; i < d.length; i++) {
            var trackInfo = {};
            var dateCreated = new Date(d[0].createdAt).toString().split(' ');
            trackInfo.dateCreated = dateCreated[1] + "/" + dateCreated[2] + "/" + dateCreated[3]
            trackInfo.trackname = d[i]['trackname'].toString();
            trackInfo.trackID = d[i]['trackID'].toString();
            trackInfo.numberofloops = JSON.parse(d[0].audioData).length
            that.$el.find('.recentTracks').append(miniTemplate(trackInfo));
          }
          return d;
        }
      });
      }
    
  });

  return AppView;
});
