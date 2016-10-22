


function preparePieData (node,i){
                                  //console.log(d)
      return pie([{"group": 1, "value": getRandomInt(1,4)},
                  {"group": 2, "value": getRandomInt(1,4)},
                  {"group": 3, "value": getRandomInt(1,4)}]); 
}



function NodesManeger () {
    this.nodes = null;


    this.getNodes = function(){
    	return this.nodes;
    }

    this.getNodeById = function(nodeId){
      console.log(this.nodes);
      var result = this.nodes.filter(function(d, i) { return d.id === nodeId; });
      console.log(result.data());
      return result.data()[0];
    }

    this.addNodes = function  (json, force) {
   		var node = svg.selectAll(".node")
      	.data(json.nodes)
      	.enter().append("g")
      	.attr("class", "node")
      	//to dodać poznie
      	.on("click", click)
      	.call(force.drag);
      	this.nodes = node;

	}



  this.addTextToNodes = function () {
    this.nodes.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.id });
  }

  this.addPieChartsToNodes = function (){

      //TODO better solution
      console.log("aa");
      nodes1 =  this.nodes.filter(function(d) { return d.id != "CreditWorthiness"; });
      nodes2 =  this.nodes.filter(function(d) { return d.id === "CreditWorthiness"; });
      nodes1.selectAll("path")
        .data(function(d, i) {return preparePieData(d,i)})
        .enter()
        .append("svg:path")
        .attr("class","piechart")
        .attr("fill", function(d, i) { return getRandomColor(); })
        .attr("radius", function(d, i) { return 15;})
        .attr("d", arc)
        .attr("r", 15);

      nodes2.selectAll("path")
        .data(function(d, i) {return preparePieData(d,i)})
        .enter()
        .append("svg:path")
        
        .attr("fill", function(d, i) { return getRandomColor(); })
        .attr("radius", function(d, i) { return 15;})
        .attr("d", arc2)
        .attr("r", 15);
  }
  this.deleteCharts = function (){
    d3.selectAll(".piechart").remove();
  }


}

