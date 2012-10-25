define([],

function() {

  function ensureLabel(o) {
    return o.label || (o.label = {});
  }

  return function(o, dimensions, options) {

console.log(JSON.stringify(options));

    if("undefined" !== typeof options["title"] && options["title"]) {
      ensureLabel(o).title = options["title"];
      if("undefined" !== typeof options.titleontop && !options.titleontop)
        o.titleontop = options.titleontop
    }

    if("undefined" !== typeof options.datapointover) {
      if(false === options.datapointover) {
        ensureLabel(o).datapointover = false;
      } else if("string" === typeof options.datapointover) {
        ensureLabel(o).datapointover = options.datapointover;
      }
    }

    if("undefined" !== typeof options.datapoint) {
      if(false === options.datapoint) {
        ensureLabel(o).datapoint = "";
      } else if("string" === typeof options.datapoint) {
        ensureLabel(o).datapoint = options.datapoint;
      }
    }
  };
});