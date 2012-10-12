define([
    "jquery"
  , "config/charts"
],

function($, charts) {
  return function(ctx) {
    function init(_, a2) {
      var type = a2[0];
      signalDimensions(type);
      ctx.on("chart.type.change", signalDimensions);
    }

    function signalDimensions(type) {
      // TODO, this highlights a problem with event handling priority
      setTimeout(function() {
        console.log("GO SIGNAL MAN", type, charts);

        $(charts.map[type].dimensions).each(function(i, info) {
          ctx.trigger("chart.dimension.add", info);
        });
      }, 0);
    }

    ctx.when("app.ready", "chart.type.change").then(init);
  };
});