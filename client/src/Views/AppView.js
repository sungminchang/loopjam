define([
  'text!templates/AppViewTemplate.html',
  'text!templates/RecentTracksViewTemplate.html',
], function(template, recentTracksTemplate){
  var AppView = Backbone.View.extend({

    template: Handlebars.compile(template),

    initialize: function(){
      // var $this = this;
      // // Maybe I should do this at a certain time
      // // Like when the other components have loaded
      // $.ajax({
      //   type: 'GET',
      //   // url of the upload directory
      //   url: '/tracks'
      // }).done(function(data) {
      //   console.log(data)
      //   $this.$el.find('#table').bootstrapTable({
      //     data: data,
      //     columns: [{
      //         field: 'trackname',
      //         title: 'Track Name'
      //       },
      //       { field: 'id',
      //         title: 'ID',
      //       },
      //       {
      //         field: 'createdAt',
      //         title: 'createdAt'
      //       }]
      //     });

      //   // this.renderRecentTracks(data);
      //   // log.innerHTML += "\n" + data;
      //   });




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
      var recentsTemplate = Handlebars.compile(recentTracksTemplate)
      this.$el.find('.recentTracks').html(recentsTemplate());
      var $this = this;
      $.ajax({
        type: 'GET',
        // url of the upload directory
        url: '/tracks'
      }).done(function(data) {
        var linkifyData = function(d) {
          for (var i = 0; i < d.length; i++) {
            var trackname = d[i]['trackname'].toString();
            var trackID = d[i]['trackID'].toString();
            d[i]['trackname'] = '<a href="/#/tracks/' + trackID + '">' + trackname + ' </a> ';
          }
          return d;
        };

        var d = linkifyData(data);
        $this.$el.find('#table').bootstrapTable({
          data: d,
          });
      });
    }

    
  });

  return AppView;
});
