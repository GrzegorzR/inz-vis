

var BFSr= [[0],[0],[1/1.5,1/1.5],[1/1.5,0,1/1.5],[1/2,1/1.5,1/1.5,1/2],[1/2,1/1.5,0,1/1.5,1/2]];

var BFSd= [[0],[0],[1,0],[1,0,0],[1,1,0,0],[1,1,0,0,0]];


function getBFSObjList(node){
    var result = [];
    if(node.parents.length === 0){
        return result;
    }


    var parentsCombinations = getStatesCom(node);

    for(var j =0; j < node.states.length; j++) {
        var biggestVal = 0;
        var biggestIndex = 0;
        for (var i = 0; i < node.fixp.length; i++) {
            if (node.fixp[i][j] > biggestVal) {
                biggestVal = node.fixp[i][j];
                biggestIndex = i;
            }
        }
        for(var i =0; i < node.parents.length; i++) {
            var parent = getNodeById(node.parents[i]);
            var parentStateInd = parentsCombinations[biggestIndex][i];
            result.push({source:parent, target: node, stateSource: j, stateTarget: parentStateInd,
                        r:BFSr[node.states.length][j], d:BFSd[node.states.length][j] })
        }
    }
    return result;

}

function getBFSList(){
    var nodes = d3.selectAll(".node")[0];
    var result = [];
    for (var i =0; i < nodes.length; i++){
        var objRes = getBFSObjList(nodes[i].__data__);
        result = result.concat(objRes);
    }
    console.log(result);
    return result;
}

function BFSLinksMan() {
    LinksManeger.call(this);

    this.addLinks = function(json){
        this.json = json;
        var list = getBFSList();
        console.log(json.links);
        this.links = svg.selectAll(".link")
            .data(list)
            .enter().append("path")
            .attr("class", "lin")
            .attr("color1", function (d) {
                return getChartColors(d.target)[d.stateSource];
            })
            .attr("color2", function (d) {
                console.log((d.target),d.stateTarget,getChartColors(d.source));
                return getChartColors(d.source)[d.stateTarget];
            })

            .style("fill", function () {
                return "none"
            })
            .style("stroke-width", function (d) {
                return 5;
            });

    }
}