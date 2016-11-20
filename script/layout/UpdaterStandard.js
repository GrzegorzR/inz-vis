function UpdaterStandard() {

    this.update = function (links, nodes) {
        links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    };
}