define([
  'text!templates/NavViewTemplate.html'
], function(template){
  var NavView = Backbone.View.extend({
    initialize: function(){
    },

    events:{
    },

    template: Handlebars.compile(template),

    render: function() {
      // Load Template
      this.$el.html(this.template());
      return this;
    }
  });

  return NavView;
});
