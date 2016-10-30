



function LayoutManeger () {
	this.force = d3.layout.force()
    			.gravity(0.05)
    			.distance(100)
    			.charge(-1000)
    			.size([width, height]);

    this.getForce = function(){
    	return this.force;
    };

	this.addForceLayout = function(json){
	  this.force
      	  .nodes(json.nodes)
      	  .links(json.links)
      	  .start();
	};

	this.prepereTickBehaviour = function(links, nodes){
		this.force.on("tick", function() {

    		links.attr("x1", function(d) { return d.source.x; })
        		 .attr("y1", function(d) { return d.source.y; })
        	     .attr("x2", function(d) { return d.target.x; })
        	     .attr("y2", function(d) { return d.target.y; });

    		nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    	});
	}



}