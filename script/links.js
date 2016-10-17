

function addLinks (json) {
     var link = svg.selectAll(".link")
      .data(json.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 3; })

    return link;

}

function createArrowImage (nodeRadius) {
    svg.append("svg:defs").selectAll("link")
    .data(["end" + nodeRadius.toString()])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", nodeRadius +5)
    .attr("refY", 0)
    .attr("markerWidth", 4)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");
}

function getArrow(link){
  console.log(link.target);
  if(link.target.id === "CreditWorthiness")
    return "url(#end35)";
  else
    return "url(#end25)";
}


function addArrowsToLinks (links) {
  createArrowImage(25);
  createArrowImage(35);

  links.attr("marker-end",function(d){return getArrow(d)});
}