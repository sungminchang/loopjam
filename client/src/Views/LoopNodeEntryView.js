define([
  'text!templates/LoopNodesEntryViewTemplate.html', 
  'Views/LoopNodeEntryPlayPauseView'
], function(template, LoopNodeEntryPlayPauseView){
  

  var LoopNodeEntryView = Backbone.View.extend({

    events:{
      'click': function(){
        this.model.trigger('selected', this.model);
      }
    },

    template: Handlebars.compile(template),

  createLoopNode: function(loopNodeClass){
    var d3Container = {};

    var width = 200,
    height = 200,
    tau = 2 * Math.PI

    var arc = d3.svg.arc().innerRadius(60).outerRadius(100).startAngle(0);

   var x = $(this.el).find('.' + loopNodeClass)[0]
    
    var svg = d3.select(x).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    var foreground = svg.append("path")
        .datum({endAngle: .0 * tau})
        .style("fill", "orange")
        .attr("d", arc);
      
      d3Container.svg = svg;

      return d3Container;
    },     

    render: function() {
    
      this.$el.html(this.template(this.model.attributes));
      this.$el.find('#recplaypause').append(new LoopNodeEntryPlayPauseView({model: this.model}).render().el)
      var port = this.model.get('port')
      var loopNodeClass = 'loopNode' + port;
      var d3obj = this.createLoopNode(loopNodeClass)
      this.model.set('d3Obj',d3obj);

      // var x = this.model.get('port')

      return this;

    }


  });

  return LoopNodeEntryView;

});