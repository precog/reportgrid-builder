define([],

function() {

  function ensureLabel(o) {
    return o.label || (o.label = {});
  }

  return function(o, dimensions, options) {
console.log("OPTIONS", options);
    if("undefined" !== typeof options["cartesian.displayrules"] && options["cartesian.displayrules"]) {
      o.displayrules = options["cartesian.displayrules"];
    }
  };
});