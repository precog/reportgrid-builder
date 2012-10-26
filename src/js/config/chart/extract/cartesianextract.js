define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options["cartesian.displayrules"] && options["cartesian.displayrules"]) {
      o.displayrules = options["cartesian.displayrules"];
    }

    if("alternating" !== options["cartesian.yscaleposition"]) {
      o.yscaleposition = options["cartesian.yscaleposition"];
    }

    if("undefined" !== typeof options["labelhorizontal"] && !options["labelhorizontal"])
      o.labelhorizontal = options["labelhorizontal"];
  };
});