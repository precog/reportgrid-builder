define([
  "lib/util/pardot_track"
],

function(pardot) {
  var import_done = function import_done() {
    pardot.track_page("upload");
  };

  return function(ctx) {
    // FILE UPLOAD / IMPORT
    ctx.on("reports.report.import", function() {
      ctx.off("reports.report.add", import_done); // remove in case it has been invalidated by a previous validation
      ctx.one("reports.report.add", import_done);
    });

    // FILE DOWNLOAD
    ctx.on("reports.report.export", function() {
      pardot.track_page("download");
    });

    // OPEN REPORT
    ctx.on("reports.report.openpath", function(path) {
      pardot.track_page("load_report_"+((/^\/examples\//).test(path)?"default":"custom"));
    });

    // DOWNLOAD HTML
    ctx.on("chart.export.html", function() {
      pardot.track_page("export");
    });

    // CHANGE CHART TYPE
    ctx.on("user.chart.type", function() {
      pardot.track_page("chart_type");
    });

    // CHOOSE CHART DATASOURCE
    ctx.on("user.chart.datasource", function() {
      pardot.track_page("datasource");
    });

    // CHOOSE CHART DIMENSION
    ctx.on("user.chart.dimension", function() {
      pardot.track_page("dimensions");
    });

    // CHANGE CHART OPTION
    ctx.on("user.chart.option", function() {
      pardot.track_page("options");
    });


    // ADD DATASOURCE
    ctx.on("user.datasource.add", function() {
      pardot.track_page("add_data_source");
    });

    // FORM HANDLERS
    ctx.on("application.error", function(e) {
      pardot.track_error("generic_error", { error_message : JSON.stringify(e) }, "Uh oh, an error occurred in ReportGrid Builder. Can you please help our team by notifying us of your error? Please enter your email below.")
    });

    ctx.on("chart.error", function(e) {
      pardot.track_error("chart_error", { error_message : JSON.stringify(e) }, "Uh oh, an error occurred rendering your chart. Can you please help our team by notifying us of your error? Please enter your email below.")
    });
  };
});