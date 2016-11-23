function MainClass(nodesManeger, linksManeger, layoutManeger, menuMeneger) {
    this.nodesManeger = nodesManeger;
    this.linksManeger = linksManeger;
    this.layoutManeger = layoutManeger;
    this.menuMeneger = menuMeneger;
    this.json = null;

    this.createVisualisation = function (jsonLocation) {
        d3.json(jsonLocation, function (error, json) {
            main.json = json;
            console.log(this);
            if (error) throw error;

            this.layoutManeger.setUpdater(new UpdaterStandard());
            this.layoutManeger.addForceLayout(json);
            var force = layoutManeger.getForce();




            this.nodesManeger.addNodes(json, force);
            var nodes = nodesManeger.getNodes();
            resolveWithoutEvidences(nodes);
            this.nodesManeger.addPieChartsToNodes();
            this.nodesManeger.addTextToNodes();


            this.linksManeger.addLinks(json);
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
    };

    this.changeLinksToBFS = function(){
        this.changeLinksMan(new BFSLinksMan());
        this.prepareLayout(new UpdaterBFS());
    };
    this.changeLinksToStandard = function () {
        this.changeLinksMan(new StandardLinksMan());
        this.prepareLayout(new UpdaterStandard());
    };

    this.changeLinksToTB = function () {
        this.changeLinksMan(new TBLinksMan());
        this.prepareLayout(new UpdaterBFS());
    };

    this.changeLinksMan = function(newLinkMan){
        clearDefs();
        this.linksManeger.removeLinks();
        this.linksManeger = newLinkMan;
        this.linksManeger.addLinks(this.json);
    };

    this.prepareLayout = function(updater){
        var nodes = this.nodesManeger.getNodes();
        var links = this.linksManeger.getLinks();
        this.layoutManeger.setUpdater(updater);
        this.layoutManeger.prepereTickBehaviour(links, nodes);
        updater.update(links, nodes);
        d3.selectAll(".node").moveToFront();
    };


};

var updaterStandard = new UpdaterStandard();
var nodesManeger = new NodesManeger();
var linksManeger = new StandardLinksMan();
var layoutManeger = new LayoutManeger();
layoutManeger.setUpdater(updaterStandard);
var menuManeger = new MenuManeger();

var main = new MainClass(nodesManeger, linksManeger,
    layoutManeger, menuManeger);


main.createVisualisation("data/credit.json");