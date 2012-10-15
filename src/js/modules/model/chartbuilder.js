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

    function validate() {
      var path = getDataSourceName();
      return !!path;
    }

    function getDataSourceName() {
      for(var dimension in current.dimensions) {
        if(current.dimensions.hasOwnProperty(dimension)) {
console.log(dimension, current.dimensions);
          return current.dimensions[dimension][0].path.split("/").slice(0, -1).join("/");
        }
      }
      return null;
    }

    function triggerChart() {
      if(validate()) {
        var path = getDataSourceName();
console.log(path, datasources);
        ctx.trigger("chart.render.execute", { type : current.type, dimensions : current.dimensions, data : datasources[path] });
      } else {
        ctx.trigger("chart.render.clear");
      }
    }

    function fieldAdd(data, info) {
      (current.dimensions[info.name] || (current.dimensions[info.name] = [])).push(data);
      console.log("!!! fieldAdd", data, info);
      triggerChart();
    }

    function fieldRemove(data, info) {
      var arr = current.dimensions[info.name];
      if(arr) {
        arr.splice(arr.indexof(data), 1);
      }
      console.log("!!! fieldRemove", data, info);
      triggerChart();
    }

    function chartType(type) {
      if(current.type === type) return
      current.type = type;
      console.log("!!! chartType", type);
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