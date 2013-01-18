define([
  "lib/util/pardot_track"
],

function(pardot) {
  var states = {
    IDLE : 0,
    IMPORTING : 1
  };
  return function(ctx) {
    var import_status = states.IDLE;
    ctx.on("reports.report.import", function() {
      import_status = states.IMPORTING;
    });

    ctx.on("reports.report.add", function() {
      if(import_status === states.IMPORTING) {
        pardot.track_page("")
      }

      import_status = states.IDLE;
    });
  };
});