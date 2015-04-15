define([
  'text!templates/LoopNodesViewTemplate.html',
  'Views/LoopNodeEntryView'
], function(template, LoopNodeEntryView){
  var LoopNodesView = Backbone.View.extend({

    initialize: function() {
      this.collection.on('add', this.renderNewLoopNode, this);
      
    },

    events:{
      'click .addNewButton': function(ev) {
        var mult = $(ev.currentTarget).data('multiplier');
        this.collection.addNewLoopNode(mult);
        this.$el.find('.menu-open-button').click()
      }      
    },


    template: Handlebars.compile(template),

    render: function() {
      this.$el.html(this.template());

      var $addButton = this.$el.find('.addNewLoop');
      $addButton.detach();


      var that = this;
      // this.$el.children().detach();
      this.collection.each(function(loopNode) {
        that.$el.append(new LoopNodeEntryView({model: loopNode}).render().el);
      });

      this.$el.append($addButton);
      return this;
    },

    renderNewLoopNode: function(newLoopNode){
      var $addButton = this.$el.find('.addNewLoop');
      $addButton.detach();
      this.$el.append(new LoopNodeEntryView({model: newLoopNode}).render().el);
      this.$el.append($addButton);

      $(".dial").knob({});

      return this;
    }


  });

  return LoopNodesView;
});