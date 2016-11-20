


function LinksManeger() {
    this.links = null;
    this.json = null;

    this.addLinks = function (json) {

    };

    this.getLinks = function () {
        return this.links;
    };

    this.removeLinks = function () {
        d3.selectAll(".lin").remove();
    }

} 