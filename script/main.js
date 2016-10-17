






d3.json("miserables.json", function(error, json) {
  if (error) throw error;

    addForceLayout(json);


    var links = addLinks(json);
    addArrowsToLinks(links);

    var nodes = addNodes(json);
    addPieChartsToNodes(nodes);
    addTextToNodes(nodes);


    







  



  force.on("tick", function() {
    links.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });

});