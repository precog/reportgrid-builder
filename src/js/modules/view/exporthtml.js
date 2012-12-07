define([
    "jquery"
  , "lib/util/ui"
  , "lib/util/view/widgets/dialogexport"
  , "lib/model/exports/chart2html"
],

function($, ui, openExportDialog, chart2html) {
  return function(ctx) {
    var current_chart;
    function init(el) {
      $export = ui.button(el, {
        icon : "ui-icon-arrowthickstop-1-s",
        description : "export chart",
        enabled : false,
        handler : function() {
          openExportDialog("Export Chart", [{
            name : "HTML",
            token : "html",
            options : {},
            handler : chart2html
          }], current_chart);
        }
      });

      function renderable(chart) {
        current_chart = chart;
        $export.button("enable");
      }

      function unrenderable() {
        $export.button("disable");
      }

      ctx.on("chart.render.execute", renderable);
      ctx.on("chart.render.clear", unrenderable);
    };

    ctx.on("view.editor.toolbar-context", init);
  };
});