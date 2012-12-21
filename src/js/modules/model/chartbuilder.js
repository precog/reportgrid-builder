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

    function extract_axes(type) {
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

    function trigger_chart() {
      try {
        var dataloader = createLoader(current.datasource),
            options    = { },
            loader = function(handler) {
              dataloader.on("success", handler);
              dataloader.load();
            };
        var axes = extract_axes(current.type);
        if(axes === null)
          throw "not enough axes to feed the chart";
        charts.map[current.type].extractOptions(options, current.dimensions, current.options);
        ctx.log("chart", "options", JSON.stringify(options));
        ctx.trigger("chart.render.execute", { type : current.type, loader : loader, datasource : current.datasource, axes : axes, options : options, customcss : current.options["css.palette.set"] });
      } catch(e) {
        ctx.trigger("chart.render.clear");
      }
    }

    var timer;
    function delayed_trigger_chart() {
      clearTimeout(timer);
      timer = setTimeout(trigger_chart, 200);
    }

    function change_data_source(ds) {
      current.datasource = ds;
      current.fieldsmap = {};
      if(ds) {
        for(var i = 0; i < ds.fields.length; i++) {
          current.fieldsmap[ds.fields[i].field] = ds.fields[i];
        }
      }
      delayed_trigger_chart();
    }

    function set_axis(types, info) {
      current.dimensions[info.name] = types.map(function(type) {
        return {
          name     : type.field,
          category : type.type,
          field    : current.fieldsmap[type.field]
        }
      });
      delayed_trigger_chart();
    }

    function chart_type(type) {
      current.type = type;
      current.dimensions = {};
      current.options = {};
      delayed_trigger_chart();
    }

    function chart_option_set(key, value) {
      current.options[key] = value;
      delayed_trigger_chart();
    }

    ctx.on("chart.datasource.change", change_data_source);
    ctx.on("chart.type.change", chart_type);
    ctx.on("chart.axis.change", set_axis);
    ctx.on("chart.option.set", chart_option_set);
  };
});