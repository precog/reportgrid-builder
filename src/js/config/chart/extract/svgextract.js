define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options["label.title"] && options["label.title"]) {
      ensure('label',o).title = options["label.title"];
      if("undefined" !== typeof options.titleontop && !options.titleontop)
        o.titleontop = options.titleontop
    }

    if("undefined" !== typeof options['label.datapointover']) {
      if(false === options['label.datapointover']) {
        ensure('label',o).datapointover = function() {return null;};
      } else if("string" === typeof options['label.datapointover']) {
        ensure('label',o).datapointover = options['label.datapointover'];
      }
    }

    if("undefined" !== typeof options["label.datapoint"]) {
      if(false === options["label.datapoint"]) {
        ensure('label',o).datapoint = function() {return null;};
      } else if("string" === typeof options["label.datapoint"] && options["label.datapoint"]) {
        ensure('label',o).datapoint = options["label.datapoint"];
      }
    }

    var paddings = ["left", "right", "top", "bottom"];
    paddings.forEach(function(key) {
      var name  = 'padding.'+ key,
          value = options[name];
      if(value !== "" && value !== null && !Math.isNaN(value)) {
        ensure('padding', o)[key] = value;
      }
    });

    if(options['width'] && options['width'] !== 500) {
      o.width = options['width'];
    }

    if(options['height'] && options['height'] !== 250) {
      o.height = options['height'];
    }
  };
});