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

    function reduceAxis(axis) {
      for(var key in axis) {
        if(!axis.hasOwnProperty(key) || key === "type") continue;
        return axis;
      }
      return axis.type;
    }

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
          axes.push(reduceAxis(axis));
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
        ctx.log("CHART OPTIONS", JSON.stringify(options));
        ctx.trigger("chart.render.execute", { type : current.type, loader : loader, datasource : current.datasource, axes : axes, options : options, customcss : current.options["css.palette.set"] });
      } catch(e) {
        ctx.trigger("chart.render.clear");
      }
    }

    var timer;
    function delayedTriggerChart() {
      clearTimeout(timer);
      timer = setTimeout(triggerChart, 200);
    }

    function changeDataSource(ds) {
      current.datasource = ds;
      current.fieldsmap = {};
      if(ds) {
        for(var i = 0; i < ds.fields.length; i++) {
          current.fieldsmap[ds.fields[i].field] = ds.fields[i];
        }
      }
      delayedTriggerChart();
    }

    function setAxis(types, info) {
      current.dimensions[info.name] = types.map(function(type) {
        return {
          name     : type.field,
          category : type.type,
          field    : current.fieldsmap[type.field]
        }
      });
      delayedTriggerChart();
    }

    function chartType(type) {
      current.type = type;
      current.dimensions = {};
      current.options = {};
      delayedTriggerChart();
    }

    function chartOptionSet(key, value) {
      current.options[key] = value;
      delayedTriggerChart();
    }

    ctx.on("chart.datasource.change", changeDataSource);
    ctx.on("chart.type.change", chartType);
    ctx.on("chart.axis.change", setAxis);
    ctx.on("chart.option.set", chartOptionSet);
  };
});