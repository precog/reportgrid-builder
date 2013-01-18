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
      setTimeout(function() {

        console.log(path)

      },1500);
    });
  };
});