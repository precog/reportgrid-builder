define([
    "jquery"
  , "lib/util/ui"
],

function($, ui) {
  return function(ctx) {

    function init(bar) {
      ui.button(bar, {
        label : "hello there"
      });
//      $(tree).on("node.selected", function(_, data) { activateNode(data, "datasource", "folder"); });
//      $(tree).on("node.selected", function(_, data) { activateNode(data, "folder", null); });
    }

    ctx.on("view.data.toolbar-context", init);
  };
});