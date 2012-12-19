define([
    "config/chart/linechartextractor"
  , "config/chart/linechartoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "linechart"
    , method : "lineChart"
    , label : "Line Chart"
    , extractOptions : extractor()
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
      max  : 1,
      accept : ["category"]
    }],
    options : []
  };
  applyOptions(chart.options);
  return chart;
});