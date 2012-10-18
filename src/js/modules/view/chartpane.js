define([
  "jquery",
//  "http://api.reportgrid.com/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
  "http://localhost/rg/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
],

function($) {
  return function(ctx) {
    function init(el) {
      $(el).css({ width : "600px", height : "400px" });

      function execute(info) { //{ type : current.type, dimensions : current.dimensions, datasource : datasources[path] }
        ReportGrid.chart(el.get(0),  {
            axes    : info.axes,
            load    : info.loader,
            options : info.options
          },
          info.type
        );
      }

      function clear() {
        if(ReportGrid.tooltip)
          ReportGrid.tooltip.hide();
        el.children("*").remove();
      }

      ctx.on("chart.render.execute", execute);
      ctx.on("chart.render.clear", clear);
    };

    ctx.on("view.editor.chart", init);
  };
});