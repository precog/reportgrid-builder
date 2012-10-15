define([
  "jquery",
  "config/charts",
//  "http://api.reportgrid.com/js/reportgrid-charts.js"
  "http://localhost/rg/js/reportgrid-charts.js"
],

function($, charts) {
  return function(ctx) {
    function init(el) {
      $(el).css({ width : "600px", height : "400px", backgroundColor : "#f0f0f0" });

      function execute(info) { //{ type : current.type, dimensions : current.dimensions, datasource : datasources[path] }
console.log("EXECUTE CHART", info);
        ReportGrid.chart(el.get(0),  {
            axes  : ["country", "count"],
            load  : function(handler) {
console.log(info.data.datasource);
              info.data.datasource.on("success", function(data) {
console.log("DATA LOADED", data);
                handler(data);
              });
              info.data.datasource.load();
            }
          },
          info.type
        );
      }

      function clear() {
console.log("CHART CLEAR");
        el.children("*").remove();
      }

      ctx.on("chart.render.execute", execute);
      ctx.on("chart.render.clear", clear);
    };

    ctx.on("view.editor.chart", init);
  };
});