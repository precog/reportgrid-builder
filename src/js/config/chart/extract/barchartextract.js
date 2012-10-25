define([],

function() {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options["barchart.stacked"])
      o.stacked = options["barchart.stacked"];
    if("undefined" !== typeof options["barchart.horizontal"])
      o.horizontal = options["barchart.horizontal"];

    if("undefined" !== typeof options["barchart.effect"] && options["barchart.effect"] !== "gradient")
      o.effect = options["barchart.effect"];
  }
});