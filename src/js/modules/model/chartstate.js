define([

],

function() {

  return function(ctx) {
    var timer,
        state;

    function reset() {
      state = {
        chart : null,
        datasource : null,
        dimensions : {},
        options : {}
      };
    }
    reset();

    function delayedChange() {
      clearTimeout(timer);
      timer = setTimeout(change, 200);
    }

    function change() {
      ctx.trigger("chart.state.change", state);
    }

    // intercept chart type
    ctx.on("chart.type.change", function(chart) {
      state.chart = chart;
      delayedChange();
    });

    // intercept datasource
    ctx.on("chart.datasource.change", function(datasource) {
      state.datasource = datasource;
      delayedChange();
    });

    // interecept dimensions
    ctx.on("chart.axis.change", function(variable, axis) {
      state.dimensions[axis.name] = variable;
      delayedChange();
    });

    // intercept options
    ctx.on("chart.option.set", function(name, value) {
      state.options[name] = value;
      delayedChange();
    });

    ctx.on("chart.state.reset", function() {
      reset();
    });

    // listen to request.save
      // trigger save state

    // trigger save ready
    // trigger save not ready
  };
});