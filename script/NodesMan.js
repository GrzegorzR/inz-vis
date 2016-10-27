


function preparePieData (node,i){
                                  //console.log(d)
      return pie([{"group": 1, "value": getRandomInt(1,4)},
                  {"group": 2, "value": getRandomInt(1,4)},
                  {"group": 3, "value": getRandomInt(1,4)}]); 
}

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}

function reloadChart (id){
    var nodes1 =  d3.selectAll(".node").filter(function(d) { return d.id === id; });
    var path = nodes1.selectAll("path");
    path.data(preparePieData(1,1));
    path.transition().duration(200).attrTween("d", arcTween);
};

function NodesManeger () {
    this.nodes = null;


    this.getNodes = function(){
    	return this.nodes;
    }

    this.getNodeById = function(nodeId){
      var result = this.nodes.filter(function(d, i) { return d.id === nodeId; });
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
          .attr("class", "piechart" )
        .attr("fill", function(d, i) { console.log(i); return getRandomColor(); })
        .attr("radius", function(d, i) { return 15;})
        .attr("d", arc)
        .attr("r", 15)
        .each(function(d) { this._current = d; });


      nodes2.selectAll("path")
        .data(function(d, i) {return preparePieData(d,i)})
        .enter()
        .append("svg:path")
        
        .attr("fill", function(d, i) { return getRandomColor(); })
        .attr("radius", function(d, i) { return 25;})
        .attr("d", arc2)
        .attr("r", 25)
          .each(function(d) { this._current = d; });
  }
  this.deleteChart = function (id){

      var nodes1 =  d3.selectAll(".node").filter(function(d) { return d.id === id; });
      var path = nodes1.selectAll("path");
      path.data(preparePieData(1,1));
      path.transition().duration(15000).attrTween("d", arcTween);


  };
  this.updateValues = function () {
      var nodes1 =  this.nodes.filter(function(d) { return d.id === "Age"; });
      console.log(nodes1);
    this.nodes.each(function (d) {
       // var selection = d3.select(this);

        var nodeName = this.textContent;
        if(nodeName != "CreditWorthiness") {
            reloadChart(nodeName);
        }
    })
  }


}

