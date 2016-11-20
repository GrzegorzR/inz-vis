





function LayoutManeger () {
	this.force = d3.layout.force()
    			.gravity(0.05)
    			.distance(100)
    			.charge(-1000)
    			.size([width, height]);
	this.links = null;
	this.nodes = null;
	this.updater = null;

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

	this.setUpdater = function(updater){
		this.updater = updater;
	};

	this.prepereTickBehaviour = function(links, nodes){
		this.links = links;
		this.nodes = nodes;
		var updater = this.updater;
		this.force.on("tick", function() {
			updater.update(links, nodes);
		});
	}



}