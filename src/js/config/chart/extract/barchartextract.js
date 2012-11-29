define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options["barchart.stacked"])
      o.stacked = options["barchart.stacked"];
    if("undefined" !== typeof options["barchart.horizontal"])
      o.horizontal = options["barchart.horizontal"];

    if("undefined" !== typeof options["barchart.effect"] && options["barchart.effect"] !== "gradient")
      o.effect = options["barchart.effect"];

    if("undefined" !== typeof options["barchart.barpadding"] && options["barchart.barpadding"] != 12)
      o.barpadding = options["barchart.barpadding"];

    if("undefined" !== typeof options["barchart.barpaddingaxis"] && options["barchart.barpaddingaxis"] != 4)
      o.barpaddingaxis = options["barchart.barpaddingaxis"];

    if("undefined" !== typeof options["barchart.barpaddingdatapoint"] && options["barchart.barpaddingdatapoint"] != 2)
      o.barpaddingdatapoint = options["barchart.barpaddingdatapoint"];

    if(options["barchart.startproperty"])
      o.startat = options["barchart.startproperty"];
  }
});