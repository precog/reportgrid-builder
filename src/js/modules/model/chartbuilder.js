define([
    "config/charts"
],

function(charts) {
  return function(ctx) {
    var current = {
          type : null,
          dataPath : null,
          dimensions : {},
          options : {}
        },
        datasources = {};

    function extractAxes(type) {
      var axes = [],
          chartDimensions = charts.map[type].dimensions;
      for(var i = 0; i < chartDimensions.length; i++) {
        var dimension = chartDimensions[i],
            counter   = 0;
        if(!dimension.isaxis) continue;
        for(var j = 0; j < (dimension.max || current.dimensions[dimension.name].length); j++) {
          var o = current.dimensions[dimension.name][j];
          if(!o) break;
          var axis = {
                type : o.field.field || o.field.name
              };
          // TODO THIS SHOULD GO IN THE AXIS OPTIONS
          if(i > 0 && type === "linechart")
            axis.variable = "dependent";
          axes.push(axis);
          counter++;
        }
        if(counter < dimension.min)
          return null;
      }
      return axes;
    }

    function triggerChart() {
      try {
        var datasource = datasources[current.dataPath].datasource,
            options    = { },
            loader = function(handler) {
              datasource.on("success", handler);
              datasource.load();
            };
        var axes = extractAxes(current.type);
        if(axes === null)
          throw "not enough axes to feed the chart";
        charts.map[current.type].extractOptions(options, current.dimensions, current.options);

//        if(ctx.debug)
          console.info("CHART OPTIONS", JSON.stringify(options));

        ctx.trigger("chart.render.execute", { type : current.type, loader : loader, axes : axes, options : options });
      } catch(e) {
        ctx.trigger("chart.render.clear");
      }
    }

    function fieldAdd(data, info) {
      if(!current.dataPath) {
        current.dataPath = data.path.split("/").slice(0, -1).join("/");
      }
      var name = data.path.split("/").pop();
      (current.dimensions[info.name] || (current.dimensions[info.name] = [])).push({
        name     : name,
        category : data.type,
        field    : datasources[current.dataPath].fields.map[name]
      });
      triggerChart();
    }

    function fieldRemove(data, info) {
      var arr = current.dimensions[info.name];
      if(arr) {
        arr.splice(arr.indexOf(data), 1);
      }
      triggerChart();
    }

    function chartType(type) {
      current.type = type;
      current.dataPath = null;
      current.dimensions = {};
      current.options = {};
      triggerChart();
    }

    function chartOptionSet(key, value) {
      current.options[key] = value;
      triggerChart();
    }

    ctx.on("chart.type.change", chartType);
    ctx.on("chart.field.add", fieldAdd);
    ctx.on("chart.field.remove", fieldRemove);
    ctx.on("data.source.add", function(item) {
      datasources[item.name] = item;
    });
    ctx.on("chart.option.set", chartOptionSet);

    ctx.on("data.source.remove", function(item) {
      delete datasources[item.name];
    });
  };
});