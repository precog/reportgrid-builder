define([
    "jquery"
  , "config/charts"
],

function($, charts) {
  return function(ctx) {
    function type_change(type) {
      // TODO, this highlights a problem with event handling priority
      setTimeout(function() {
        $(charts.map[type].dimensions).each(function(i, info) {
          ctx.trigger("chart.dimension.add", info);
        });
        $(charts.map[type].options).each(function(i, info) {
          ctx.trigger("chart.option.add", info);
        });
      }, 0);
    }
    ctx.on("chart.type.change", type_change);
  };
});