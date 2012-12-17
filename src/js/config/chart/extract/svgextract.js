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

    if(options['padding.left']) {
      ensure('padding', o).left = options['padding.left'];
    }

    if(options['padding.right']) {
      ensure('padding', o).right = options['padding.right'];
    }

    if(options['padding.top']) {
      ensure('padding', o).top = options['padding.top'];
    }

    if(options['padding.bottom']) {
      ensure('padding', o).bottom = options['padding.bottom'];
    }

    if(options['width'] && options['width'] !== 500) {
      o.width = options['width'];
    }

    if(options['height'] && options['height'] !== 250) {
      o.height = options['height'];
    }
  };
});