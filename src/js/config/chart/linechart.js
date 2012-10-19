define([
    "config/chart/extract/extractsegment"
  , "config/chart/options/svgoptions"
],

function(esegment, osvg) {
  var chart = {
      type  : "linechart"
    , label : "Line Chart"
    , extractOptions : function(o, dimensions) {
      esegment(o, dimensions);
    }
    , dimensions : [{
      name : "x",
      isaxis : true,
      min  : 1,
      max  : 1
    }, {
      name : "y",
      isaxis : true,
      min  : 1,
      max  : null
    }, {
      name : "segment",
      min  : 0,
      max  : 1
    }],
    options : []
  };

  osvg(chart.options);

  return chart;
});