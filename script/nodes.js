
function addNodes (json) {
    var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("g")
      .attr("class", "node")
      //to dodać poznie
      .on("click", click)
      .call(force.drag);
      

      return node;
}



function getArc(node){
  if (node.id === "CreditWorthiness")
    radius = 30;
  else
    radius = 25
  var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(1);
  return arc;
}
function preparePieData (d,i){
                                  console.log(d)
                            
                                  return pie([{"group": 1, "value": getRandomInt(1,4)},
                                     {"group": 2, "value": getRandomInt(1,4)},
                                     {"group": 3, "value": getRandomInt(1,4)}]); }

function addPieChartsToNodes(nodes){

      //TODO better solution
      nodes1 =   nodes.filter(function(d) { return d.id != "CreditWorthiness"; });
      nodes2 =  nodes.filter(function(d) { return d.id === "CreditWorthiness"; });
      nodes1.selectAll("path")
        .data(function(d, i) {return preparePieData(d,i)})
        .enter()
        .append("svg:path")
        
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


function addTextToNodes (nodes) {
    nodes.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.id });
}



function click() {
  var selection = d3.select(this);
  var nodeName = this.textContent;
    document.getElementById('sliders').innerHTML = "";



  document.getElementById("node_name").innerHTML = nodeName;


  $(".node_info").show();

  addSlider("1");
  addSlider("2");

  console.log(this.textContent);
}

function addSlider(id){
  var iDiv = document.createElement('slider' + id);
  var sliderName = 'slider' + id;
  iDiv.id = sliderName;
  iDiv.class = sliderName;

  
  document.getElementById("node_info").appendChild(iDiv);
      document.getElementById('slider' + id).innerHTML = "Asdasd";


var slider = d3.select(".sliders").append("p").append("input")
  .datum({})
  .attr("type", "range");
  $('<p>'+sliderName+'</p>').appendTo('#sliders');
  //.on("input", slided);


}