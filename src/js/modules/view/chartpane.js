define([
    "jquery"
  , "text!templates/layout.chart.html"
  , "http://api.reportgrid.com/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
//  , "http://localhost/rg/js/reportgrid-charts.js?authCode=QWWwKQIBDTBblBgGtgUCgQjS4MM%2BR%2B2oSOfdekNAM2xxE0E98ZLtdwaVfrMjShf51Ou3NsUtkv9yvqWH0pbyH0IRc6kvJ7HDZCyA3ObMouvdcyNxmyDS%2FEUcjCIZqxkGrCLcj9w43gMjWBHndW1Pk9429QaRI4voWSvZQMd4boE%3D"
],

function($, tplChart) {
  return function(ctx) {
    function init(el) {
      var info,
          timer,
          $chart = $(tplChart).appendTo(el).find(".chart");
//      $(el).css({ width : "600px", height : "400px" });

      function execute(newinfo) {
        info = newinfo;
        delayedRender();
      }

      function delayedRender() {
        clearTimeout(timer);
        timer = setTimeout(render, 750);
      }

      function render() {
        if(!info) return;
        clear();
        var start;
        info.options.ready = function(){
          var end = +new Date();
          ctx.trigger("chart.render.end", { time : end - start, start : start, end : end });
        };
        ctx.trigger("chart.render.start", start = +new Date());
        ReportGrid.chart($chart.get(0),  {
            axes    : info.axes,
            load    : info.loader,
            options : info.options
          },
          info.type
        );
      }

      function changeWidth(v) {
//        $chart.css("width", v+"px");
        delayedRender();
      }

      function changeHeight(v) {
//        $chart.css("height", v+"px");
        delayedRender();
      }

      var $loader = $('<div class="loader"><img src="images/loading.gif" alt="loading ..."></div>').appendTo(el).hide();

      function renderStart() {
        $loader.show();
      }

      function renderEnd() {
        $loader.hide();
      }

      function clear() {
        clearInterval(timer);
        if(ReportGrid.tooltip)
          ReportGrid.tooltip.hide();
        $chart.children("*").remove();
      }
      
      ctx.on("chart.render.execute", execute);
      ctx.on("chart.rgcss.loaded", delayedRender);
      ctx.on("chart.render.clear", clear);
      ctx.on("options.chart.width", changeWidth);
      ctx.on("options.chart.height", changeHeight);

      ctx.on("chart.render.start", renderStart);
      ctx.on("chart.render.end", renderEnd);
    };

    ctx.on("view.editor.chart", init);
  };
});