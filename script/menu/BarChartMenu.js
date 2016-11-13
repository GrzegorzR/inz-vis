

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

function addLegend(node, colors) {
    var data =[];
    for (var i = 0; i < node.states.length; i++) {
        data.push({"state": node.states[i], "color": colors[i]});
    }

    document.getElementById('legend').innerHTML = "<br>";





    var aa =svg2.selectAll("bar")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        aa.append("rect")
        .attr("x", chartWidth -40)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) {return d.color;});


        aa.append("text")
            .attr("x", chartWidth- 50)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) {return d.state; });




    /*legend.append("text")
        .attr("x",   70)
        .attr("y", function(d,i){return 9*i;})
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { console.log(d);return d.state; });*/
}



function addBarChart(node) {

    var margin = {top: 20, right: 20, bottom: 20, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    chartWidth = document.getElementById("chart").offsetWidth -30;
    chartHeight = 200;


    svg2 = d3.select("#chart").append("svg")
        .attr("width", chartWidth + margin.left + margin.right)
        .attr("height", chartHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");





    var x = d3.scale.ordinal().rangeRoundBands([15, chartWidth*0.75], .05);

    var y = d3.scale.linear().range([chartHeight  , 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);


        var data = [];
        var colors = getChartColors(node);
            for (var i = 0; i < node.states.length; i++) {
                data.push({"date": node.states[i], "value": node.probabilities[i] *100, "color": colors[i]});
            }

        x.domain(data.map(function(d) { return d.date; }));
        y.domain([0, 100]);

        svg2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            //.attr("dx", "-.8em")
            .attr("dy", "2em")
            //.attr("transform", "rotate(-90)" );

        svg2.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 4)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Probability [%]");

       var a = svg2.selectAll("bar")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0,0)"; });
       a.append("rect")
            .style("fill",  function(d) { return d.color;})
            .attr("x", function(d) { return x(d.date); })
            .attr("width",  x.rangeBand())
            .attr("y", function(d) { return y(d.value) ; })
            .attr("height", function(d) { return chartHeight  - y(d.value); });
       a.append("text")
            .attr("x", function(d) { return x(d.date) + x.rangeBand()/2 +20; })
            .attr("y", function (d) {return y(d.value) -10})
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d){return Math.round(d.value) + " %";});


        addLegend(node, colors);
}


