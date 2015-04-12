var LoopNodesView = Marionette.CollectionView.extend({

  initialize: function() {

  },

  render: function() {
    var that = this;
    // this.$el.children().detach();
    this.collection.each(function(loopNode) {
      that.$el.append(new LoopNodeEntryView({model: loopNode}).render());
    });

    return this.$el.html();
  }

});

