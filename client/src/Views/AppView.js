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


      var signup = this.$el.find('#signup');

      signup.on('click', function() {
        var d = JSON.stringify({
            username:'Harry',
            password: 'Fireboltasdfasdf',
            email:'123@123.com'
          });

        $.ajax({
          type: 'POST',
          accept: 'application/json',
          url: 'auth/signup',
          data: d,
          contentType:"application/json; charset=utf-8"
        }).done(function(data) { console.log('got a reply from server, logging out the data', data);
          });
      });

      var login = this.$el.find('#login');

      login.on('click', function() {
        var d = JSON.stringify({
            username:'Harry',
            password: 'Fireboltasdfasdf',
            email:'123@123.com'
          });

        $.ajax({
          type: 'POST',
          accept: 'application/json',
          url: 'auth/login',
          data: d,
          contentType:"application/json; charset=utf-8"
        }).done(function(data) { console.log('got a reply from server, logging out the data', data);
          });
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
