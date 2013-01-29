define([
    "jquery"
  , "text!templates/layout.chart.html"
],

function($, tplChart) {
  return function(ctx) {
    function init(el) {
      var info,
          timer,
          $chart = $(tplChart).appendTo(el).find(".chart");

      function execute(newinfo) {
        info = newinfo;
        delayed_render();
      }

      function delayed_render() {
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

      function change_width(v) {
        delayed_render();
      }

      function change_height(v) {
        delayed_render();
      }

      var $loader = $('<div class="loader"><img src="images/loading.gif" alt="loading ..."></div>').appendTo(el).hide();

      function render_start() {
        $loader.show();
      }

      function render_end() {
        $loader.hide();
      }

      function clear() {
        clearInterval(timer);
        if(ReportGrid.tooltip)
          ReportGrid.tooltip.hide();
        $chart.children("*").remove();
        $loader.hide();
      }
      
      ctx.on("chart.render.execute", execute);
      ctx.on("chart.rgcss.loaded", delayed_render);
      ctx.on("chart.render.clear", clear);
      ctx.on("options.chart.width", change_width);
      ctx.on("options.chart.height", change_height);

      ctx.on("chart.render.start", render_start);
      ctx.on("chart.render.end", render_end);

      ctx.on("application.error", clear);
    };

    ctx.one("view.editor.chart", init);
  };
});