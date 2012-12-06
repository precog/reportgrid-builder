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

    function delayedChange() {
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
          ctx.trigger("chart.option.set", name, state.options[name]);
        }

        wire();
        change();
      }, 0);
    }

    function change() {
      ctx.trigger("chart.state.change", state);
    }

    function typeChange(chart) {
      state.chart = chart;
      delayedChange();
    }

    function datasourceChange(datasource) {
      state.datasource = datasource;
      delayedChange();
    }

    function axisChange(variable, axis) {
      state.dimensions[axis.name] = { variable : variable, axis : axis };
      delayedChange();
    }

    function optionSet(name, value) {
      state.options[name] = value;
      delayedChange();
    }

    function wire() {
      ctx.on("chart.type.change", typeChange);
      ctx.on("chart.datasource.change", datasourceChange);
      ctx.on("chart.axis.change", axisChange);
      ctx.on("chart.option.set", optionSet);
    }
    wire();

    function unwire() {
      ctx.off("chart.type.change", typeChange);
      ctx.off("chart.datasource.change", datasourceChange);
      ctx.off("chart.axis.change", axisChange);
      ctx.off("chart.option.set", optionSet);
    }

    ctx.on("chart.state.reset", function() {
      reset();
    });

    ctx.on("chart.state.update", update);
  };
});