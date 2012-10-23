define([
    "config/chart/piechartextractor"
  , "config/chart/piechartoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "piechart"
    , label : "Pie Chart"
    , extractOptions : extractor()
    , dimensions : [{
      name : "label",
      isaxis : true,
      min  : 1,
      max  : 1
    }, {
      name : "measure",
      isaxis : true,
      min  : 1,
      max  : 1
    }],
    options : []
  };
  applyOptions(chart.options);
  return chart;
});