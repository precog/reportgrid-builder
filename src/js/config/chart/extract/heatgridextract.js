define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
//    if("undefined" !== typeof options["barchart.stacked"])
//      o.stacked = options["barchart.stacked"];
    if("css:1" !== options["heatgrid.color"])
      o.color = options["heatgrid.color"];
  };
});