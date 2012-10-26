define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options['label.arrow']) {
      if(false === options['label.arrow']) {
        ensure('label',o).arrow = function() {return null;};
      } else if("string" === typeof options['label.arrow']) {
        ensure('label',o).arrow = options['label.arrow'];
      }
    }
  }
});