var LoopNodeEntryView = Backbone.View.extend({

  initialize: function(){
    
  },

  events:{
    'click .record-new': function() {
      this.model.record();
      // console.log("record")
    }
  },

  template: Handlebars.compile( $("#loopnode-template").html() ),

  createLoopNode: function(loopNodeClass, xPos, yPos){
    var d3Container = {};
    var w = 400, h = 400;
    
    var planets = [
      { R: 150, r: 10}
    ];
   var x = $(this.el).find('.' + loopNodeClass)[0]
    var svg = d3.select(x).insert("svg")
      .attr("width", w).attr("height", h);
      // append sun
    svg.append("circle").attr("r", 20).attr("cx", w/2)
      .attr("cy", h/2).attr("class", "sun");

    var container = svg.append("g")
      .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

    container.selectAll("g").data(planets).enter().append("g")
      .each(function(d, i) {
        d3.select(this).append("circle").attr("class", "disc")
          .attr("r", d.R);
        d3.select(this).append("circle").attr("r", d.r).attr("cx",xPos)
          .attr("cy", -yPos).attr("class", loopNodeClass + "cue" );
      });

    d3Container.svg = svg;
    d3Container.container = container;

    return d3Container;
  }, 

  

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    var loopNodeClass = 'loopNode' + this.model.get('port');
    var startAngle = 0; //starting angle should be 0
    var radius = 150;
    var x = xPos(startAngle, radius);
    var y = yPos(startAngle, radius);
    var d3obj = this.createLoopNode(loopNodeClass, x, y)
    this.model.set('d3Obj',d3obj);

    return this;
  }
  
});