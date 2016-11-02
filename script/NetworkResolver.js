function printChildren(nodes, links) {
    console.log(nodes);
    console.log(links);
    nodes.forEach(function (d) {
        console.log(d.children);
    })
}
function calculateNodeProbabilities(node) {

    var parents = node.parents;
    var states = node.states;
    var conProb = node.fixp;
    var parentsStates = [];
    var probabilities = [];
    for (var i = 0; i < states.length; i++) {
        probabilities.push(0);
    }


    //all parents nodes need to be resolved
    for (var i = 0; i < parents.length; i++) {
        var parentNode = getNodeById(parents[i]);
        if (parentNode.resolved != true) {
            calculateNodeProbabilities(parentNode);
        }
    }

    for (var i = 0; i < parents.length; i++) {
        var parentState = [];
        parent = getNodeById(parents[i]);
        for (var j = 0; j < parent.states.length; j++) {
            parentState.push(j);
        }
        parentsStates.push(parentState);
    }
  //  console.log(node.id, parentsStates);

    var statesCom = [""];

    for (var i = 0; i < parentsStates.length; i++) {
        var newStatesCom = [];
        for (var j = 0; j < parentsStates[i].length; j++) {

            for (var k = 0; k < statesCom.length; k++) {
                // console.log(statesCom[k] +parentsStates[i][j].toString());
                newStatesCom.push(statesCom[k] + parentsStates[i][j].toString())
            }
        }
        statesCom = newStatesCom;
    }
    statesCom.sort();


    for (var i = 0; i < conProb.length; i++) {
        var p = 1;
        for (var j = 0; j < parents.length; j++) {
            var parentObj = getNodeById(parents[j]);
           // console.log(parentObj.id, parentObj.probabilities[statesCom[i][j]], parentObj.probabilities);
            p *= parentObj.probabilities[statesCom[i][j]];
        }
        for (var s = 0; s < states.length; s++) {
           // console.log(node.id, conProb[i][s] * p);
            probabilities[s] += conProb[i][s] * p;
        }
    }

    node.probabilities = probabilities;
    node.resolved = true;
}

function createStatesArray() {

}


function markNodesAsUnresolved() {
    d3.selectAll('.node')
        .each(function (d, i) {
            if (d.parents.length != 0) {
                d.resolved = false;
            }
            else {
                d.resolved = true;
            }
        });

}
function calculateNetworkProb(nodes) {
    d3.selectAll('.node')
        .each(function (d, i) {
            if (d.resolved === false) {
                calculateNodeProbabilities(d);
            }
        });

}

function resolveWithoutEvidences(nodes) {
    markNodesAsUnresolved();
    calculateNetworkProb();
   // console.log(nodes);
}