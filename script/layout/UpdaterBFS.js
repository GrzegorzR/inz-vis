


function UpdaterBFS() {

    this.update = function (links, nodes) {
        this.updateLinks(links);
        this.updateNodes(nodes);
    };
    this.updateLinks = function (links) {
        clearDefs();
        links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
            .attr("d", function(d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    drx = d.r*(Math.sqrt(dx * dx + dy * dy));
                dry = d.r*(Math.sqrt(dx * dx + dy * dy)) //+ getRandomInt(-50,50);
                //	drx =70;
                //	dry =100;
                var diffX = d.target.x - d.source.x;
                var diffY = d.target.y - d.source.y;

                // Length of path from center of source node to center of target node
                var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
                // x and y distances from center to outside edge of target node
                var offsetX = (diffX * 26) / pathLength;
                var offsetY = (diffY * 26)/ pathLength;

                var endx = d.target.x -offsetX;
                var endy = d.target.y -offsetY;
                var startx= d.source.x// - 20;
                var starty = d.source.y//- 20;

                    return "M" +
                        startx + "," +
                        starty + "A" +
                        drx + "," + dry + " 0 0,"+ d.d +" "+endx + "," +
                        endy;


            })
            .style("stroke",function(d){

                var radius = 20;

                var linkVector = new Vector2(d.target.x-d.source.x,d.target.y-d.source.y).getUnitVector();

                var perpVector = linkVector.perpendicularClockwise().scale(radius);
                var gradientVector = linkVector.scale(0.5);
                var color2 = d3.select(this).attr("color1");
                var color1 = d3.select(this).attr("color2");
                var id = "S"+color1+"T" + color2;
                var gradient1 = defs.append("linearGradient").attr("id",  id)
                    .attr("class", "gradient")
                    .attr("x1", 0.5-gradientVector.X)
                    .attr("y1", 0.5-gradientVector.Y)
                    .attr("x2", 0.5+gradientVector.X)
                    .attr("y2", 0.5+gradientVector.Y);
                gradient1.append("stop").attr("offset", "0%").attr("stop-color", color1 );
                gradient1.append("stop").attr("offset", "100%").attr("stop-color",color2);
                return "url(#" + id + ")";
            });
    };

    this.updateNodes = function (nodes) {
        nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    };

}