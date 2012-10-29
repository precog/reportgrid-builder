define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
//    if("undefined" !== typeof options["barchart.stacked"])
//      o.stacked = options["barchart.stacked"];
    if(options["linechart.symbol"]) {
      var expr = options["linechart.symbol"];
      if(((/^[a-z]+:=/i).test(expr))) {
        var parts = expr.split(":=");
        o.symbol = "=symbol('"+parts[0]+"',"+parts[1]+")";
      } else if(expr != '[no symbol]') {
        o.symbol = expr;
      }
    }

    if(options["linechart.symbolstyle"]) {
      o.symbolstyle = options["linechart.symbolstyle"];
    }
  }
});