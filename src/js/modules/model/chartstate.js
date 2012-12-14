define([

],

function() {

  return function(ctx) {
    var timer,
        state;

    function reset() {
      state = {
        chart : "barchart",
        datasource : null,
        dimensions : {},
        options : {}
      };
    }
    reset();

    function delayed_change() {
      clearTimeout(timer);
      timer = setTimeout(change, 200);
    }

    function update(newstate) {
      unwire();
      state = newstate;

      ctx.trigger("chart.type.change", state.chart);
      ctx.trigger("chart.datasource.change", state.datasource);


      for(var name in state.dimensions) {
        if(!state.dimensions.hasOwnProperty(name)) continue;
        var dim = state.dimensions[name];
        ctx.trigger("chart.axis.change", dim.variable, dim.axis);
      }

      setTimeout(function() {
        for(var name in state.options) {
          if(!state.options.hasOwnProperty(name)) continue;
          ctx.trigger("chart.option.set", name, state.options[name].value, state.options[name].type);
        }

        wire();
        change();
      }, 0);
    }

    function change() {
      ctx.trigger("chart.state.change", state);
    }

    function type_change(chart) {
      state.chart = chart;
      delayed_change();
    }

    function datasource_change(datasource) {
      state.datasource = datasource;
      delayed_change();
    }

    function axis_change(variable, axis) {
      state.dimensions[axis.name] = { variable : variable, axis : axis };
      delayed_change();
    }

    function option_set(name, value, type) {
      state.options[name] = { value : value, type : type };
//      state.options = JSON.parse(JSON.stringify(state.options));
      delayed_change();
    }

    function wire() {
      ctx.on("chart.type.change", type_change);
      ctx.on("chart.datasource.change", datasource_change);
      ctx.on("chart.axis.change", axis_change);
      ctx.on("chart.option.set", option_set);
    }
    wire();

    function unwire() {
      ctx.off("chart.type.change", type_change);
      ctx.off("chart.datasource.change", datasource_change);
      ctx.off("chart.axis.change", axis_change);
      ctx.off("chart.option.set", option_set);
    }

    ctx.on("chart.state.reset", function() {
      reset();
      ctx.trigger("chart.type.change", state.chart);
    });

    ctx.on("chart.state.update", update);
  };
});