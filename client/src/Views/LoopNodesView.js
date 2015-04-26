define([
  'text!templates/LoopNodesViewTemplate.html',
  'Views/LoopNodeEntryView'
], function(template, LoopNodeEntryView){
  var LoopNodesView = Backbone.View.extend({

    initialize: function() {
      this.collection.on('add', this.renderNewLoopNode, this);
      this.collection.on('removeLoopNode', this.removeLoopNode, this);
      this.collection.on('rerender', this.render, this);
      
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
      this.$el.children().remove();
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


      return this;
    },

    removeLoopNode: function(currentLoop){
      var $addButton = this.$el.find('.addNewLoop');
      $addButton.detach();
      var loopNodeDivs = this.$el.find('.col-md-4.col-sm-6');
      var port = currentLoop.get('port');
      var loopNodeDiv = loopNodeDivs[port - 1];
      $(loopNodeDiv).parent().fadeOut(300);
      this.$el.append($addButton);

      setTimeout(function() {
        $(loopNodeDiv).parent().remove();
        // this.collection.trigger('removeLoopNode', currentLoop);

        debugger;
        var newSelectedNode = this.collection.models[port - 1];
        newSelectedNode.trigger('selected', newSelectedNode);
        
        this.collection.remove(currentLoop);
        this.render();
        this.collection.each(function(loopNode){loopNode.set('rerender', !loopNode.get('rerender'))})

          
      }.bind(this), 300);


      // this.delegateEvents(this.events);
    }


  });

  return LoopNodesView;
});