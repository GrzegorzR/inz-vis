

function BFSLinksMan() {
    LinksManeger.call(this);


    this.addLinks = function(json){
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

            .style("fill", function () {
                return "none"
            })
            .style("stroke-width", function (d) {
                console.log(d);
                return 5;
            })
    }
}