define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if(dimensions['columns'].length > 1)
      o.columnaxes = dimensions['columns'].length;
  }
});