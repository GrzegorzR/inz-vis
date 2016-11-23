
/*
require("SlidersMenu.js");
*/




function MenuManeger() {



    this.prepareBarChartMenu = function (node) {
        $("#node-panel").show();
        document.getElementById("node_name").innerHTML = node.id;
        document.getElementById('chart').innerHTML = "";
        var data = node.probabilities;
        addBarChart(node);
        /*
        d3.select(".chart")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "bar")
            .style("height", function(d) {
                var barHeight = d * 150;
                return barHeight + "px";})
            //.text(function(d) { return d; });*/


    };



    this.prepareSlidersMenu = function (node) {

        $("#sliders-panel").show();
        document.getElementById('sliders').innerHTML = "";


        for (i = 0; i < node.states.length; i++) {
            addSlider(node.id, node.states[i], i, node.probabilities[i]);
        }
    };

    this.prepareNetMenu = function(){
        addLiveUpdateCheckbox();
        addSolveNetworkButton();
        addStandardLinksButton();
        addBFSLinksButton();
        addLFSLinksButton();
        addThreeBiggestButton();
    };


}