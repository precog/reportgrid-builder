define([
    "jquery"
  , "util/widget/treepane"
],

function($, createTree) {

  return function(ctx) {
    function init(container, datasources) {
      var tree = createTree(container, datasources);
    }

    $.when(ctx.on("view.data.pane"), ctx.on("data.system.ready")).then(function(viewargs, systemargs) {
      init(viewargs[0].find(".tree"), systemargs[0]);
    });
  };
});