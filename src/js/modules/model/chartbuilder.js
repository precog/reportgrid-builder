define([
    "config/charts"
  , "lib/model/dataloader"
],

function(charts, createLoader) {
  return function(ctx) {
    var current = {
          type : null,
          datasource : null,
          fieldsmap : {},
          dimensions : {},
          options : {}
        }
      ;

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
                type : o.field.field
              };
          // TODO THIS SHOULD GO IN THE AXIS OPTIONS
          if(i > 0 && ["linechart", "barchart"].indexOf(type) >= 0)
            axis.variable = "dependent";
//          else
//            axis.variable = "independent";
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
        var dataloader = createLoader(current.datasource),
            options    = { },
            loader = function(handler) {
              dataloader.on("success", handler);
              dataloader.load();
            };
        var axes = extractAxes(current.type);
        if(axes === null)
          throw "not enough axes to feed the chart";
        charts.map[current.type].extractOptions(options, current.dimensions, current.options);
        if(ctx.debug)
          console.info("CHART OPTIONS", JSON.stringify(options));
        ctx.trigger("chart.render.execute", { type : current.type, loader : loader, axes : axes, options : options });
      } catch(e) {
        ctx.trigger("chart.render.clear");
      }
    }

    function changeDataSource(ds) {
      current.datasource = ds;
      current.fieldsmap = {};
      for(var i = 0; i < ds.fields.length; i++) {
        current.fieldsmap[ds.fields[i].field] = ds.fields[i];
      }

      triggerChart();
    }

    function setAxis(types, info) {
      current.dimensions[info.name] = types.map(function(type) {
        return {
          name     : type.field,
          category : type.type,
          field    : current.fieldsmap[type.field]
        }
      });
      triggerChart();
    }

    function chartType(type) {
      current.type = type;
      current.dimensions = {};
      current.options = {};
      triggerChart();
    }

    function chartOptionSet(key, value) {
      current.options[key] = value;
      triggerChart();
    }

    ctx.on("chart.datasource.change", changeDataSource);
    ctx.on("chart.type.change", chartType);
    ctx.on("chart.axis.change", setAxis);
    ctx.on("chart.option.set", chartOptionSet);
  };
});