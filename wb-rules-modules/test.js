var DashboardModule = require("./dashboard");
var WidgetsModule = require("./widgets");

var dashboard = new DashboardModule.Dashboard("Main", "dashboard_1");
// var dashboards = new DashboardModule.Dashboards(dashboard);

// var widget1 = new WidgetsModule.Widget("First_Widget", "widget_1");
// var widget2 = new WidgetsModule.Widget("Second_Widget", "widget_2");
// dashboards.addDashboard(dashboard);
// dashboard.addWidget(dashboards, widget1);
// dashboard.addWidget(dashboards, widget2);
// dashboards.createDashboards();
var widgets = dashboard.getWidgets(widgets);
console.log(widgets);