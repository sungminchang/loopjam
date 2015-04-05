var createLoopNode = function(loopClass, xPos, yPos){
  var d3Container = {};
  var w = 400, h = 400;
  
  var planets = [
    { R: 150, r: 10}
  ];


  var svg = d3.select(loopClass).insert("svg")
    .attr("width", w).attr("height", h);
    // append sun
  svg.append("circle").attr("r", 20).attr("cx", w/2)
    .attr("cy", h/2).attr("class", "sun");

  var container = svg.append("g")
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

  container.selectAll("g.planet").data(planets).enter().append("g")
    .each(function(d, i) {
      d3.select(this).append("circle").attr("class", "orbit")
        .attr("r", d.R);
      d3.select(this).append("circle").attr("r", d.r).attr("cx",xPos)
        .attr("cy", -yPos).attr("class", "planet");
    });

  d3Container.svg = svg;
  d3Container.container = container;

  return d3Container;

};