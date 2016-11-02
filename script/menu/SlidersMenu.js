function updateSlider(nodeId, stateNum, val) {
    var nodeObj = getNodeById(nodeId);

    var slidersVals = [];
    var sum = 0;
    for (var i = 0; i < nodeObj.states.length; i++) {
        var value = Number(document.getElementById("slider" + i).value);
        sum += value;
        slidersVals.push(value);
    }
    if (sum === 0) {
        return;
    }
    for (var i = 0; i < nodeObj.states.length; i++) {
        var value = (((Math.round((slidersVals[i] / sum) * 1000)) / 10)).toString();
        var state = nodeObj.states[i];
        var text = "State " + state + " probability: " + value + " %";
        document.getElementById("s" + i).innerHTML = text;
        nodeObj.probabilities[i] = value / 100;
    }


    var checkbox = document.getElementById('livecheck');
    if(checkbox.checked){
        main.updateValues(0);
    }
    else {
        document.getElementById("net-info").innerHTML = "Network unresolved";
        document.getElementById("net-panel").className = "panel panel-danger";
        main.updateOneNode(nodeId);
    }
}

function addSlider(nodeId, stateName, stateNum, val) {

    var value = (((Math.round((val) * 1000)) / 10)).toString();
    var text = "State " + stateName + " probability: " + value + " %";
    $('<br><br><p id =s' + stateNum + '>' + text + '</p>').appendTo('#sliders');
    var iDiv = document.createElement('slider' + stateNum);
    var sliderName = 'slider' + sliderName;
    iDiv.id = sliderName;
    iDiv.class = sliderName;

    document.getElementById("node_info").appendChild(iDiv);

    var slider = d3.select(".sliders").append("p").append("input")
        .datum({})
        .attr("id", "slider" + stateNum)
        .attr("type", "range")
        .attr("min", 0)
        .attr("max", 100)
        .attr("value", val * 100)
        .attr("oninput", "updateSlider(\'" + nodeId + "\',\'" + stateNum + "\',this.value)");

    //.on("input", slided);
}