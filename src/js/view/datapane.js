define([
    "jquery"
  , "util/widget/treepane"
],

function($, createTree) {

  return function(ctx) {
    var container, datasources;

    function init() {
      console.log("init", container, datasources);
      var tree = createTree(container, datasources);
//      $(el).html("Hello THERE");
    }

    function handleView(e, el) {
console.log("handleView", el);
      container = el;
      if(datasources) init();
    }

    function handleDataSources(e, ds) {
console.log("handleDataSources", ds);
      datasources = ds;
      if(container) init();
    }

    ctx.on("view.data.pane", handleView);
    ctx.on("data.system.ready", handleDataSources);

    $.when(ctx.on("view.data.pane"), ctx.on("data.system.ready")).then(function(a, b, c, d, e, f, g, h) {
      console.log("combined", a, b, c, d, e, f, g, h);
    });
  };
});