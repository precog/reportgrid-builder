define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
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

    if(options["linechart.displayarea"]) {
      o.displayarea = options["linechart.displayarea"];
    }

    if(options["linechart.y0property"]) {
      o.y0property = options["linechart.y0property"];
    }

    if("undefined" !== typeof options["linechart.sensibleradius"] && options["linechart.sensibleradius"] != 100) {
      o.sensibleradius = options["linechart.sensibleradius"];
    }

    if("undefined" !== typeof options["linechart.lineeffect"] && options["linechart.lineeffect"] != "gradient:-1.2,2") {
      o.effect = options["linechart.lineeffect"];
    }

    if("undefined" !== typeof options["linechart.lineinterpolation"] && options["linechart.lineinterpolation"] != "linear") {
      o.interpolation = options["linechart.lineinterpolation"];
    }

  };
});