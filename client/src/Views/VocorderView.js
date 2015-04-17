define([
  'text!templates/VocorderTemplate.html'
  ], function(template) {
  var VocorderView = Backbone.View.extend({

    initialize: function(){
    },

    events:{
      // 'click canvas': 'updateVocorderInput',
      'mousemove canvas': 'updateVocorderInput'// function(event) {this.updateVocorderInput(event)}
    },

    template: Handlebars.compile(template),

    render: function() {
      // Load Template
      this.$el.html(this.template());
      var canvas = this.$el.find('canvas');
      var ctx = canvas[0].getContext('2d');
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(0,0,300,150);
      return this;
    },

    updateVocorderInput: function(event) {
      console.log('a.offsetX: ', event.offsetX);
      console.log('a.offsetY: ', event.offsetY);
      var x = event.offsetX;
      var y = event.offsetY;

      this.model.set('filter', [x, y]);
      // var x = a.offse

      // function getMousePos(canvas, evt) {
      //   var rect = canvas.getBoundingClientRect();
      //   return {
      //     x: evt.clientX - rect.left,
      //     y: evt.clientY - rect.top
      //   };
      // }
      // var canvas = document.getElementById('myCanvas');
      // var context = canvas.getContext('2d');
      // console.log('canvas is responding, logging model: ', this.model)
      // this.model.on("change:x change:y", this.updateLoopNodeInfoView, this);

    }
    
  });

  return VocorderView;
});