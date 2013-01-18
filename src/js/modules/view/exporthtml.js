define([
    "jquery"
  , "lib/util/ui"
  , "lib/util/view/widgets/dialog_export"
  , "lib/model/exports/chart2html"
],

function($, ui, openExportDialog, chart2html) {
  return function(ctx) {
    var current_chart,
        current_name = "index.html";
    function init(el) {
      $export = ui.button(el, {
        icon : "ui-icon-arrowthickstop-1-s",
        description : "export chart",
        enabled : false,
        handler : function() {
          openExportDialog("Export Chart", [{
            name : "HTML",
            token : "html",
            options : {
              filename : current_name
            },
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

      function name_set(name) {
        current_name = (name || "index") + ".html";
      }

      ctx.on("chart.render.execute", renderable);
      ctx.on("chart.render.clear", unrenderable);
      ctx.on("chart.name.set", name_set);
    };

    ctx.one("view.editor.toolbar-context", init);
  };
});