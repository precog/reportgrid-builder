define([
    "config/chart/piechartextractor"
  , "config/chart/piechartoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "piechart"
    , method : "pieChart"
    , label : "Pie Chart"
    , extractOptions : extractor()
    , dimensions : [{
      name : "label",
      isaxis : true,
      min  : 1,
      max  : 1,
      accept : ["category"]
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