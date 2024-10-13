var fs = require('fs');

var DashboardModule = (function() {

    /**
     * 
     * @param {Dashboard} defaultDashdoard 
     */
    var Dashboards = function (defaultDashdoard) {
        this.dashdoards = [];
        this.widgets = [];
        this.deaultDashboardId = defaultDashdoard.id;
    };
    
    /**
     * 
     * @param {Dashboard} dashboard 
     */
    Dashboards.prototype.addDashboard = function (dashboard) {
        this.dashdoards.push(dashboard);
        // dashboard.widgets.forEach(widget => {
        //     this.widgets.push(widget);
        // });
    };

    /**
     * 
     * @param {Dashboard} dashboard 
     */
    Dashboards.prototype.removeDashboard = function (dashboard) {
        var index = this.dashboards.indexOf(dashboard.id);
        if (index > -1) {
            this.dashboards.splice(index, 1);
        } else {
            log("Dashbaord {} does not exist", dashboard.id);
        }
    };
    
    Dashboards.prototype.createDashboards = function () {
        var jsonString = JSON.stringify(this, null, "\t");
        fs.writeFile('myjsonfile.conf', jsonString, 'utf8', callback);
    };

    function callback() {
        console.log("File saved");
    };

    /**
     * 
     * @param {string} name 
     * @param {string} id 
    */
   var Dashboard = function (name, id) {
       this.name = name;
       this.widgets = [];
       this.isSvg = false;
       this.id = id;
       
    };
    
    /**
     * @param {Dashboard} parent
     * @param {Widget} widget 
     */
    Dashboard.prototype.addWidget = function (parent, widget) {
        this.widgets.push(widget.id);
        parent.widgets.push(widget);
    };

    /**
     * 
     * @param {Widget} widget 
     */
    Dashboard.prototype.removeWidget = function (widget) {
        var index = this.widgets.indexOf(widget.id);
        if (index > -1) {
            this.widgets.splice(index, 1);
            // this.widget_ids.splice(index, 1);
        } else {
            log("Widget {} does not exist", widget.id);
        }
    };

        Dashboard.prototype.getWidgets = function (widgets) {
            var data = fs.readFileSync('./myjsonfile.conf', 'utf-8'); 
                // Display the file content
                return dashboard;
            // return dashboard.widgets;
        };

    return {
        Dashboards: Dashboards, Dashboard: Dashboard
    };
})();

exports.Dashboards = DashboardModule.Dashboards;
exports.Dashboard = DashboardModule.Dashboard;