define([
  "jquery"
  , "lib/util/widget/treepane"
  , "ext/jquery-ui/jquery.ui"
],

function($, createTree) {
  return function(ctx) {
    function init(container, datasources) {
      var tree = createTree(container, datasources, {
        icons : {
            datasource : "images/datasource.png"
          , continuous : "images/continuous.png"
          , time       : "images/time.png"
          , discrete   : "images/discrete.png"
          , ordinal    : "images/ordinal.png"
          , category   : "images/category.png"
        }
      });
      $(tree).on("node.created", function(e, el, node) {
        var a = $(el).find("a").first()
              .attr("data-node", JSON.stringify(node));
      });
    }

    $.when(ctx.on("view.data.tree"), ctx.on("data.system.ready")).then(function(viewargs, systemargs) {
      init(viewargs[0], systemargs[0]);
    });
  };
});