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

            this.linksManeger.addLinks(json);
            this.linksManeger.addArrowsToLinks();


            this.nodesManeger.addNodes(json, force);
            var nodes = nodesManeger.getNodes();
            resolveWithoutEvidences(nodes);
            this.nodesManeger.addPieChartsToNodes();
            this.nodesManeger.addTextToNodes();


            var links = linksManeger.getLinks();


            this.layoutManeger.prepereTickBehaviour(links, nodes);
        });

    }

    this.selectNode = function (nodeId) {

        var node = this.nodesManeger.getNodeById(nodeId);

        //reloadChart(nodeId);
        //this.nodesManeger.addPieChartsToNodes();
        var menuObj = this.menuMeneger.prepareNodeMenu(node);

        //subscribe sliders and buttons here

    }
    this.updateValues = function () {
        this.nodesManeger.updateValues();
    }

};


var nodesManeger = new NodesManeger();
var linksManeger = new LinksManeger();
var layoutManeger = new LayoutManeger();
var menuManeger = new MenuManeger();

var main = new MainClass(nodesManeger, linksManeger,
    layoutManeger, menuManeger);


main.createVisualisation("data.json");