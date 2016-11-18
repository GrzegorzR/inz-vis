



function createArrowImage (nodeRadius) {
    svg.append("svg:defs").selectAll("link")
    .data(["end" + nodeRadius.toString()])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 0)
    .attr("refY",0)
    .attr("markerWidth", 4)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");
}

function getArrow(link){
  if(link.target.id === "CreditWorthiness")
    return "url(#end"+ bigNodeR.toString() +")";
  else
    return "url(#end"+ smallNodeR.toString() +")";
}


function LinksManeger (){
    this.links = null;
    this.json = null;

    this.addLinks = function  (json) {
        this.json = json;
        console.log(json);
        this.links = svg.selectAll(".link")
        .data(json.links)
        .enter().append("path")
        .attr("class", "lin")
            .attr("color1", function (d) {
                 return getChartColors(d.source)[0]
            })
            .attr("color2", function (d) {
                return getChartColors(d.target)[0]
            })

            .style("fill" , function(){return "none"})
            .style("stroke-width", function(d) { console.log(d);return 5; })
        console.log(this.links)
    };


    this.getLinks = function() {
        return this.links;
    };

    this.addArrowsToLinks = function() {
        createArrowImage(bigNodeR);
        createArrowImage(smallNodeR);
        this.links.attr("marker-end",function(d){return getArrow(d)});
    };

    this.removeLinks = function () {
        console.log(d3.selectAll(".lin"));
        d3.selectAll(".lin").remove();
        this.addLinks(this.json);
        return this.links;
    }


} 