


function createArrowImage(nodeRadius) {
    svg.append("svg:defs").selectAll("link")
        .data(["end" + nodeRadius.toString()])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("class", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", function (d) {
            return smallNodeR + 5;
        })
        .attr("refY", 0)
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M1,-6L11,1L1,6");
}

function getArrow(link) {
    if (link.target.id === "CreditWorthiness")
        return "url(#end" + bigNodeR.toString() + ")";
    else
        return "url(#end" + smallNodeR.toString() + ")";
}




function StandardLinksMan() {
    LinksManeger.call(this);


    this.addArrowsToLinks = function () {
        createArrowImage(bigNodeR);
        createArrowImage(smallNodeR);
        this.links.attr("marker-end", function (d) {
            return getArrow(d)
        });
    };

    this.addLinks = function(json){
        this.json = json;
        this.links = svg.selectAll(".link")
            .data(json.links)
            .enter().append("line")
            .attr("class", "lin")
            .style("stroke-width", function (d) {
                return 3;
            })
            .style("stroke", "#ccc")

        this.addArrowsToLinks();
    };


}