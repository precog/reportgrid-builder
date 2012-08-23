define([
  "jquery"
],

function($) {
  return function(ctx) {
    ctx.on("view.main.toolbar-main", function(e, el) {
      $(el).append("MM");
    });
    ctx.on("view.main.toolbar-context", function(e, el) {
      $(el).append("MC");
    });

    ctx.on("view.data.toolbar-description", function(e, el) {
      $(el).append("DD");
    });
    ctx.on("view.data.toolbar-main", function(e, el) {
      $(el).append("DM");
    });
    ctx.on("view.data.toolbar-context", function(e, el) {
      $(el).append("DC");
    });

    ctx.on("view.reports.toolbar-description", function(e, el) {
      $(el).append("RD");
    });
    ctx.on("view.reports.toolbar-main", function(e, el) {
      $(el).append("RM");
    });
    ctx.on("view.reports.toolbar-context", function(e, el) {
      $(el).append("RC");
    });
  }
});