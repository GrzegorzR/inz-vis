
$(document).ready(function(){
     $(".node_info").hide();

   
 
});


var width = 960,
    height = 800;


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var arc = d3.svg.arc()
        .outerRadius(25)
        .innerRadius(5);
 var arc2 = d3.svg.arc()
        .outerRadius(35)
        .innerRadius(5);



var force = d3.layout.force()
    .gravity(0.05)
    .distance(150)
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