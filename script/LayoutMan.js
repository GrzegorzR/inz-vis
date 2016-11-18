



function LayoutManeger () {
	this.force = d3.layout.force()
    			.gravity(0.05)
    			.distance(100)
    			.charge(-1000)
    			.size([width, height]);
	this.links = null;
	this.nodes = null;

    this.getForce = function(){
    	return this.force;
    };

	this.addForceLayout = function(json){
	  this.force
      	  .nodes(json.nodes)
      	  .links(json.links)
      	  .start();
		//this.force.links(json.links);
	};

	this.prepereTickBehaviour = function(links, nodes){
		this.links = links;
		this.nodes = nodes;
		this.force.on("tick", function() {

    		links.attr("x1", function(d) { return d.source.x; })
        		 .attr("y1", function(d) { return d.source.y; })
        	     .attr("x2", function(d) { return d.target.x; })
        	     .attr("y2", function(d) { return d.target.y; })
				.attr("d", function(d) {
					var dx = d.target.x - d.source.x,
					dy = d.target.y - d.source.y,
					drx =- Math.sqrt(dx * dx + dy * dy)/1.5// + getRandomInt(10,500);
					dry = Math.sqrt(dx * dx + dy * dy)/1.5// + getRandomInt(10,500);
					//	drx =70;
					//	dry =100;
					var diffX = d.target.x - d.source.x;
					var diffY = d.target.y - d.source.y;

					// Length of path from center of source node to center of target node
					var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));

					// x and y distances from center to outside edge of target node
					var offsetX = (diffX * 35) / pathLength;
					var offsetY = (diffY * 35) / pathLength;

					var endx = d.target.x //-offsetX;
					var endy = d.target.y //-offsetY;

					return "M" +
						d.source.x + "," +
						d.source.y + "A" +
						drx +  "," + dry + " 0 0,1 " +
						+ endx +"," +
						  endy;
				})
				.style("stroke",function(d){

					var radius = 20;

					var linkVector = new Vector2(d.target.x-d.source.x,d.target.y-d.source.y).getUnitVector();

					var perpVector = linkVector.perpendicularClockwise().scale(radius);
					var gradientVector = linkVector.scale(0.5);
					var color1 = d3.select(this).attr("color1");
					var color2 = d3.select(this).attr("color2");

					var id = "S"+d.source.index +"T" + d.target.index;
					var gradient1 = defs.append("linearGradient").attr("id",  id)
						.attr("x1", 0.5-gradientVector.X)
						.attr("y1", 0.5-gradientVector.Y)
						.attr("x2", 0.5+gradientVector.X)
						.attr("y2", 0.5+gradientVector.Y);
					gradient1.append("stop").attr("offset", "0%").attr("stop-color", color1 );
					gradient1.append("stop").attr("offset", "100%").attr("stop-color",color2);
					return "url(#" + id + ")";
				});

			nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		});
		//this.tick();
	}



}