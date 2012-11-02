define([
  "jquery",
//  "http://api.reportgrid.com/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
  "http://localhost/rg/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
],

function($) {
  return function(ctx) {
    function init(el) {
      var info,
          timer,
          $chart = $('<div style="margin: 0 auto"></div>').appendTo(el);
//      $(el).css({ width : "600px", height : "400px" });

      function execute(newinfo) { //{ type : current.type, dimensions : current.dimensions, datasource : datasources[path] }
        info = newinfo;
        render();
      }

      function render() {
        clearInterval(timer);
        timer = setTimeout(reducedRender, 100);
      }

      function reducedRender() {
        if(!info) return;
        ReportGrid.chart($chart.get(0),  {
            axes    : info.axes,
            load    : info.loader,
            options : info.options
          },
          info.type
        );
      }

      function change_width(v) {
        $chart.css("width", v+"px");
        render();
      }

      function change_height(v) {
        $chart.css("height", v+"px");
        render();
      }

      function clear() {
        clearInterval(timer);
        if(ReportGrid.tooltip)
          ReportGrid.tooltip.hide();
        $chart.children("*").remove();
      }

      ctx.on("chart.render.execute", execute);
      ctx.on("chart.rgcss.loaded", render);
      ctx.on("chart.render.clear", clear);
      ctx.on("options.chart.width", change_width);
      ctx.on("options.chart.height", change_height);
    };

    ctx.on("view.editor.chart", init);
  };
});