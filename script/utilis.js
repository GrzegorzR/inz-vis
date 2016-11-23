


var chartWidth;
var chartHeight = 200;
var svg2;
var selectedNode = null;

$(document).ready(function(){


    $("#sliders-panel").hide();
    $("#node-panel").hide();

    chartWidth = document.getElementById("chart").offsetWidth;
    console.log(chartWidth)

});

var main = null;

var c10 = d3.scale.category10();



function click() {
  var nodeName = this.textContent;
  main.selectNode(nodeName);
}

function mouseEnter(){
    var nodeName = this.textContent;
    main.mouseOn(nodeName);
}

function mouseLeave(){
    var nodeName = this.textContent;
    main.mouseLeave(nodeName);
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

var defs = svg.append("defs");

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




var Vector2 = function(x,y) {
    this.magnitude = Math.sqrt(x*x+y*y);
    this.X = x;
    this.Y = y;
};

Vector2.prototype.perpendicularClockwise = function(){
    return new Vector2(-this.Y, this.X);
};

Vector2.prototype.perpendicularCounterClockwise = function(){
    return new Vector2(this.Y, -this.X);
};

Vector2.prototype.getUnitVector = function(){
    return new Vector2(this.X/this.magnitude, this.Y/this.magnitude);
};

Vector2.prototype.scale = function(ratio){
    return new Vector2(ratio*this.X, ratio*this.Y);
};


d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

function getChartColors(node){
    var colors = [];
    var nodeEl = d3.selectAll(".node").filter(function (d) {
        return d.id === node.id;
    });
    var path = nodeEl.selectAll("path");
    for(var i =0; i < node.states.length; i++){
        colors.push( d3.select(path[0][i]).attr("fill"));
    }
    return colors;
}

function clearDefs(){
    d3.selectAll(".arrow").remove();
    d3.selectAll(".gradient").remove();
}