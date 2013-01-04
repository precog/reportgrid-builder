define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
//    if("undefined" !== typeof options["barchart.stacked"])
//      o.stacked = options["barchart.stacked"];
    if(options["scattergraph.symbol"]) {
      var expr = options["scattergraph.symbol"];
      if(((/^[a-z]+:=/i).test(expr))) {
        var parts = expr.split(":=");
        o.symbol = "=symbol('"+parts[0]+"',"+parts[1]+")";
      } else {
        o.symbol = expr;
      }
    }

    if(options["scattergraph.symbolstyle"]) {
      o.symbolstyle = options["scattergraph.symbolstyle"];
    }
  };
});