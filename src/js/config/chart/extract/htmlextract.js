define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options['label.datapointover']) {
      if(false === options['label.datapointover']) {
        ensure('label',o).datapointover = function() {return null;};
      } else if("string" === typeof options['label.datapointover']) {
        ensure('label',o).datapointover = options['label.datapointover'];
      }
    }

    if("undefined" !== typeof options["label.datapoint"]) {
      if("string" === typeof options["label.datapoint"] && options["label.datapoint"]) {
        ensure('label',o).datapoint = options["label.datapoint"];
      }
    }
  };
});