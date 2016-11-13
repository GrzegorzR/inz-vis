


// Biggest for state
//sprawdzanie ktora kombinacja stanow rodzicow
//daje najwieksze prawdopodobienstwo kazdego ze stanow
//wybranego wezla. Strzalki grandientowe.


function printBFS(node){
    if(node.parents.length === 0){
        return ;
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
        console.log(node.states[j]);
        for(var i =0; i < node.parents.length; i++) {
            var parent = getNodeById(node.parents[i]);
            var parentStateInd = parentsCombinations[biggestIndex][i];
            var string = parent.id+ " " + parent.states[parentStateInd];
            console.log(string);
        }
    }

}