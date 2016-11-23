



function addLiveUpdateCheckbox() {
    var checkbox =
        d3.select(".net-menu")
            .append("p")
            .text("\n Live update: ")
            .append("input")
            .attr("type", "checkbox")
            .attr("id", "livecheck");
};

function addSolveNetworkButton() {
    var button =
        d3.select(".net-menu")
            .append("p")
            .text("    ")
            .append("input")
            .attr("type", "submit")
            .attr("id", "resolvebutton")
            .attr("value", "Solve network")
            .attr("onclick", "updateValues(1000)");
};

function addBFSLinksButton(){
    var button =
        d3.select(".net-menu")
            .append("p")
            .text("    ")
            .append("input")
            .attr("type", "submit")
            .attr("id", "resolvebutton")
            .attr("value", "Biggest for state links")
            .attr("onclick", "main.changeLinksToBFS()");
}

function addStandardLinksButton(){
    var button =
        d3.select(".net-menu")
            .append("p")
            .text("    ")
            .append("input")
            .attr("type", "submit")
            .attr("id", "resolvebutton")
            .attr("value", "Standard links")
            .attr("onclick", "main.changeLinksToStandard()");
};



function addThreeBiggestButton() {
    var button =
        d3.select(".net-menu")
            .append("p")
            .text("    ")
            .append("input")
            .attr("type", "submit")
            .attr("id", "resolvebutton")
            .attr("value", "Three biggest probabilities for node")
            .attr("onclick", "main.changeLinksToTB()");
}