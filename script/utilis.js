
$(document).ready(function(){


   
 
});

var main = null;

function click() {
  var selection = d3.select(this);
  var nodeName = this.textContent;
  main.selectNode(nodeName);
  /*
  document.getElementById('sliders').innerHTML = "";
  getNodeById("aa");


  document.getElementById("node_name").innerHTML = nodeName;


  $(".node_info").show();

  addSlider("1");
  addSlider("2");
  addSlider("3");

  console.log(this.textContent);*/
} 

var bigNodeR = 25;
var smallNodeR = 20;

var width = 900,
    height = 600;


var svg = d3.select(".visual").append("svg")
    .style("width", width)
    .attr("height", height);

  var arc = d3.svg.arc()
        .outerRadius(smallNodeR)
        .innerRadius(0);
 var arc2 = d3.svg.arc()
        .outerRadius(bigNodeR)
        .innerRadius(0);



var force = d3.layout.force()
    .gravity(0.05)
    .distance(100)
    .charge(-1000)
    .size([width, height]);

var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });


function addForceLayout (json) {
	   force
      .nodes(json.nodes)
      .links(json.links)
      .start();
}



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}