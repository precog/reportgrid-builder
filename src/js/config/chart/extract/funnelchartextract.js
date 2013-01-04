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

    if("undefined" !== typeof options['funnelchart.segmentpadding'] && options['funnelchart.segmentpadding'] != 2.5)
      o.segmentpadding = options['funnelchart.segmentpadding'];

    if("undefined" !== typeof options['funnelchart.flatness'] && options['funnelchart.flatness'] != 1)
      o.flatness = options['funnelchart.flatness'];

    if("undefined" !== typeof options['funnelchart.arrowsize'] && options['funnelchart.arrowsize'] != 30)
      o.arrowsize = options['funnelchart.arrowsize'];

    if("undefined" !== typeof options["funnelchart.effect"] && options["funnelchart.effect"] !== "gradient")
      o.effect = options["funnelchart.effect"];

    if("undefined" !== typeof options["funnelchart.sort"] && options["funnelchart.sort"])
      o.sort = options["funnelchart.sort"];
  };
});