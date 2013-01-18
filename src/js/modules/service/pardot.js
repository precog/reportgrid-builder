define([
  "lib/util/pardot_track"
],

function(pardot) {
  var import_done = function import_done() {
    pardot.track_page("upload_chart");
  };

  return function(ctx) {
    // FILE UPLOAD / IMPORT
    ctx.on("reports.report.import", function() {
      ctx.off("reports.report.add", import_done); // remove in case it has been invalidated by a previous validation
      ctx.one("reports.report.add", import_done);
    });

    // FILE DOWNLOAD
    ctx.on("reports.report.export", function() {
      pardot.track_page("download_chart");
    });

    // OPEN REPORT
    ctx.on("reports.report.openpath", function(path) {
      pardot.track_page("load_report_"+((/^\/examples\//).test(path)?"default":"custom"));
    });

    // DOWNLOAD HTML
    ctx.on("chart.export.html", function() {
      pardot.track_page("export_html");
    });

    // CHANGE CHART TYPE
    ctx.on("user.chart.type", function() {
      pardot.track_page("choose_chart_type");
    });

    // CHOOSE CHART DATASOURCE
    ctx.on("user.chart.datasource", function() {
      pardot.track_page("choose_datasource");
    });

    // CHOOSE CHART DIMENSION
    ctx.on("user.chart.dimension", function() {
      pardot.track_page("choose_dimension");
    });

    // CHANGE CHART OPTION
    ctx.on("user.chart.option", function() {
      pardot.track_page("change_option");
    });


    // ADD DATASOURCE
    ctx.on("user.datasource.add", function() {
      pardot.track_page("add_datasource");
    });

    // FORM HANDLERS
    ctx.on("application.error", function(e) {
      alert("application.error");
      console.log(e);
    })
  };
});