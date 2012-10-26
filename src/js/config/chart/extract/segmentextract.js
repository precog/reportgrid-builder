define([
  "config/chart/extract/ensure"
],

function(ensure) {

  return function(o, dimensions, options) {
    if(dimensions.segment) {
      var segment = o.segment || (o.segment = {});
      segment.on = dimensions.segment[0].name;
    }
  }
});