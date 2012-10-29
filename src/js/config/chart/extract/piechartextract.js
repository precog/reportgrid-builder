define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options["piechart.labelradius"] && options["piechart.labelradius"] !== 0.45)
      o.labelradius = options["piechart.labelradius"];

    if("undefined" !== typeof options["piechart.outerradius"] && options["piechart.outerradius"] !== 0.9)
      o.outerradius = options["piechart.outerradius"];

    if("undefined" !== typeof options["piechart.innerradius"] && options["piechart.innerradius"] !== 0.3)
      o.innerradius = options["piechart.innerradius"];

    if("undefined" !== typeof options["piechart.tooltipradius"] && options["piechart.tooltipradius"] !== 0.5)
      o.tooltipradius = options["piechart.tooltipradius"];

    if("undefined" !== typeof options["piechart.overradius"] && options["piechart.overradius"] !== 0.95)
      o.overradius = options["piechart.overradius"];

    if("undefined" !== typeof options["piechart.dontfliplabel"] && !options["piechart.dontfliplabel"])
      o.dontfliplabel = options["piechart.dontfliplabel"];
    
    if("undefined" !== typeof options["piechart.effect"] && options["piechart.effect"] !== "gradient")
      o.effect = options["piechart.effect"];

    if("undefined" !== typeof options["piechart.labelorientation"] && options["piechart.labelorientation"] !== "aligned")
      o.labelorientation = options["piechart.labelorientation"];

    if("undefined" !== typeof options["piechart.sort"] && options["piechart.sort"])
      o.sort = options["piechart.sort"];
  }
});