define([
  'Views/LoopNodeEntryView'
], function(LoopNodeEntryView){
  var LoopNodesView = Backbone.View.extend({

    initialize: function() {
      console.log("this.el",this.el);
      
      // debugger;
    },

    // events: {
    //   'click .record-new': function() {
    //     this.model.get('context')
    //     console.log("record")
    //   }
    // },

    render: function() {
      var that = this;
      // this.$el.children().detach();
      this.collection.each(function(loopNode) {
        that.$el.append(new LoopNodeEntryView({model: loopNode}).render().el);
      });
      console.log("LoopNodesView",this)

      return this;
    }

  });

  return LoopNodesView;
});