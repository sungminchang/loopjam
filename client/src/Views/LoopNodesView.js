var LoopNodesView = Backbone.View.extend({

  initialize: function() {

  },

  initialRender: function() {
    var that = this;
    // this.$el.children().detach();
    this.collection.each(function(loopNode) {
      that.$el.append(new LoopNodeEntryView({model: loopNode}).render());
    });

    return this.$el.html();
  }

});