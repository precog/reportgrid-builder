define([
    "config/charts"
],

function(charts) {
  return function(ctx) {
    var current = {
          type : null,
          dimensions : {}
        },
        datasources = {};

    function getDataSourceName() {
      for(var dimension in current.dimensions) {
        if(current.dimensions.hasOwnProperty(dimension)) {
          return current.dimensions[dimension][0].path.split("/").slice(0, -1).join("/");
        }
      }
      return null;
    }

    function extractAxes(type) {
      var axes = [],
          chartDimensions = charts.map[type].dimensions;
      for(var i = 0; i < chartDimensions.length; i++) {
        var dimension = chartDimensions[i];
        for(var j = 0; j < (dimension.max || current.dimensions[dimension.name].length); j++) {
          var o = current.dimensions[dimension.name][j];
          if(!o) break;
          var field = datasources[getDataSourceName()].fields.map[o.path.split("/").pop()];
          axes.push({
            type : field.field || field.name //o.path.split("/").pop()
          });
        }
        /*
        for(var j = dimension.min; j < dimension.max; j++) {
          if(current.dimensions[dimension][j]) {
            axes.push({
              type : current.dimensions[dimension][j]
            });
          }
        }
        */
      }
      return axes;
    }

    function triggerChart() {
      try {
        var path = getDataSourceName(),
            datasource = datasources[path].datasource;
        var loader = function(handler) {
          datasource.on("success", handler);
          datasource.load();
        };
        var axes = extractAxes(current.type);
        if(charts.map[current.type].requiredAxes > axes.length)
          throw "not enough axes to feed the chart";
        ctx.trigger("chart.render.execute", { type : current.type, loader : loader, axes : axes });
      } catch(e) {
        ctx.trigger("chart.render.clear");
      }
    }

    function fieldAdd(data, info) {
      (current.dimensions[info.name] || (current.dimensions[info.name] = [])).push(data);
      triggerChart();
    }

    function fieldRemove(data, info) {
      var arr = current.dimensions[info.name];
console.log("BEFORE", arr);
      if(arr) {
        arr.splice(arr.indexOf(data), 1);
console.log("AFTER", arr);
      }
      triggerChart();
    }

    function chartType(type) {
      current.type = type;
      current.dimensions = {};
      triggerChart();
    }

    ctx.on("chart.type.change", chartType);
    ctx.on("chart.field.add", fieldAdd);
    ctx.on("chart.field.remove", fieldRemove);
    ctx.on("data.source.add", function(item) {
      datasources[item.name] = item;
    });

    ctx.on("data.source.remove", function(item) {
      delete datasources[item.name];
    });
  };
});