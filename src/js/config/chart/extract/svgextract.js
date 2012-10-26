define([],

function() {

  function ensureLabel(o) {
    return o.label || (o.label = {});
  }

  return function(o, dimensions, options) {

console.log(JSON.stringify(options));

    if("undefined" !== typeof options["label.title"] && options["label.title"]) {
      ensureLabel(o).title = options["label.title"];
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

    if("undefined" !== typeof options["label.datapoint"]) {
      if(false === options["label.datapoint"]) {
        ensureLabel(o).datapoint = false;
      } else if("string" === typeof options["label.datapoint"]) {
        ensureLabel(o).datapoint = options["label.datapoint"];
      }
    }
  };
});