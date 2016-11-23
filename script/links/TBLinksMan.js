

var TBr= [1/1.5,0,1/1.5];

var TBd= [1,0,0];






function getTBObjList(node) {
    var result = [];
    if (node.parents.length === 0) {
        return result;
    }


    var parentsCombinations = getStatesCom(node);
    var probs = Array();

    //deep copy
    var clone = $.extend(true, [], node.fixp);

    for (var i = 0; i < node.fixp.length; i++) {

        probs = probs.concat(node.fixp[i]);
    }
    probs.sort();
    probs.reverse();
    probs = probs.splice(0,3);
    console.log(probs);
    console.log(node);
    var links = Array();

    for (var j = 0; j < node.states.length; j++) {

        for (var i = 0; i < clone.length; i++) {
            for(var k = 0; k < probs.length; k++){
                if(probs[k] == clone[i][j]){
                    clone[i][j] = null;
                    probs.splice(k,k+1);
                    links.push({state: j, nr:i});
                }
            }
        }

    }
    console.log(links.length);

    for(var j = 0; j < links.length; j++) {
        for (var i = 0; i < node.parents.length; i++) {
            var nr = links[j].nr;
            var state = links[j].state;
            var parent = getNodeById(node.parents[i]);
            var parentStateInd = parentsCombinations[nr][i];
            result.push({
                source: parent, target: node, stateSource: state, stateTarget: parentStateInd,
                r:TBr[j], d:TBd[j]
            })
        }
    }

    return result;

}


function getTBList() {
    var nodes = d3.selectAll(".node")[0];
    var result = [];
    for (var i = 0; i < nodes.length; i++) {
        var objRes = getTBObjList(nodes[i].__data__);
        result = result.concat(objRes);
    }
    console.log(result);
    return result;
}

function TBLinksMan() {
    LinksManeger.call(this);

    this.addLinks = function (json) {
        this.json = json;
        var list = getTBList();

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