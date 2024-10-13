var WidgetModule = (function() {
    var Widget = function (name, id) {
        this.cells = [];
        this.compact = false;
        this.description = "";
        this.id = id;
        this.name = name;
    };

    Widget.prototype.addCell = function (cell) {
        this.cells.push(cell);
    };

    Widget.prototype.removeCell = function (cell) {
        var index = this.cells.indexOf(cell.id);
        if (index > -1) {
            this.cells.splice(index, 1);
        } else {
            log("Widget {} does not exist", cell.id);
        }
    };


    return {
        Widget: Widget
    };
})();

exports.Widget = WidgetModule.Widget;