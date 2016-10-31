
$(document).ready(function(){


   
 
});

var main = null;

var c10 = d3.scale.category10();


function click() {
  var selection = d3.select(this);

  var nodeName = this.textContent;
  main.selectNode(nodeName);
   // main.deleteChart(nodeName);
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

function updateValues(time) {
    main.updateValues(time);
}

var bigNodeR = 25;
var smallNodeR = 25;

var width = document.getElementById("vis-div").offsetWidth -30,
    height = 600;

console.log(width);
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

var colorCount =0;
function getColor(){
    var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    colorCount++;
    return colores_g[colorCount % colores_g.length];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

