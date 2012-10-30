define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {

    if("undefined" !== typeof options["streamgraph.effect"] && options["streamgraph.effect"] != "gradientv:0.75") {
      o.effect = options["streamgraph.effect"];
    }
    
    if("undefined" !== typeof options["streamgraph.lineinterpolation"] && options["streamgraph.lineinterpolation"] != "linear") {
      o.interpolation = options["streamgraph.lineinterpolation"];
    }
  }
});