function MainClass(nodesManeger, linksManeger, layoutManeger, menuMeneger) {
    this.nodesManeger = nodesManeger;
    this.linksManeger = linksManeger;
    this.layoutManeger = layoutManeger;
    this.menuMeneger = menuMeneger;

    this.createVisualisation = function (jsonLocation) {
        d3.json(jsonLocation, function (error, json) {
            if (error) throw error;


            this.layoutManeger.addForceLayout(json)
            var force = layoutManeger.getForce();




            this.nodesManeger.addNodes(json, force);
            var nodes = nodesManeger.getNodes();
            resolveWithoutEvidences(nodes);
            this.nodesManeger.addPieChartsToNodes();
            this.nodesManeger.addTextToNodes();


            this.linksManeger.addLinks(json);
            this.linksManeger.addArrowsToLinks();
            d3.selectAll(".node").moveToFront();

            var links = linksManeger.getLinks();


            this.layoutManeger.prepereTickBehaviour(links, nodes);
            this.menuManeger.prepareNetMenu();
        });

    };

    this.selectNode = function (nodeId) {

        var node = this.nodesManeger.getNodeById(nodeId);
        printBFS(node);
        this.menuMeneger.prepareBarChartMenu(node);
        selectedNode = node;

        //if node is leaf
        if(node.parents.length === 0) {
            this.menuMeneger.prepareSlidersMenu(node);
        }
        else{
            $("#sliders-panel").hide();
        }
    };
    this.mouseOn = function (nodeId) {
        var node = this.nodesManeger.getNodeById(nodeId);
        this.menuMeneger.prepareBarChartMenu(node);
        $("#sliders-panel").hide();

    };
    this.mouseLeave = function (nodeId) {
        if(selectedNode != null){
            this.selectNode(selectedNode.id);
        }
        else {
            $("#node-panel").hide();
        }

    };
    this.updateValues = function (time) {
        resolveWithoutEvidences(null);
        if(selectedNode != null) {
            this.menuMeneger.prepareBarChartMenu(selectedNode);
        }
        document.getElementById("net-info").innerHTML = "Network resolved";
        document.getElementById("net-panel").className = "panel panel-success";
        this.nodesManeger.updateValues(time);
    };
    this.updateOneNode = function (nodeId) {
        var node = getNodeById(nodeId);
        this.menuMeneger.prepareBarChartMenu(node);
        reloadChart(nodeId,0);
    }
    this.changeLinksToBFS = function(){
        var links = this.linksManeger.removeLinks();
        var nodes = this.nodesManeger.getNodes();

        this.layoutManeger.prepereTickBehaviour(links, nodes);
        this.layoutManeger.force.charge(1);
        d3.selectAll(".node").moveToFront();

    }
};


var nodesManeger = new NodesManeger();
var linksManeger = new LinksManeger();
var layoutManeger = new LayoutManeger();
var menuManeger = new MenuManeger();

var main = new MainClass(nodesManeger, linksManeger,
    layoutManeger, menuManeger);


main.createVisualisation("data/credit.json");