define([
    "jquery"
  , "lib/util/ui"
  , "lib/util/view/widgets/dialogexport"
],

function($, ui, exportWindow) {
  return function(ctx) {
    function init(el) {
      $export = ui.button(el, {
        icon : "ui-icon-arrowthickstop-1-s",
        description : "export chart",
        enabled : false
      });

      function renderable() {
        console.log(arguments);
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