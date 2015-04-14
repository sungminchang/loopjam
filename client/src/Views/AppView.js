define([
  'text!templates/AppViewTemplate.html',
], function(template){
  var AppView = Backbone.View.extend({

    initialize: function(){
    },

    events:{
    },

    template: Handlebars.compile(template),

    render: function() {
      // Load Template
      this.$el.html(this.template());

      return this;
    },
    
  });

  return AppView;
});
